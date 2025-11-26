// lib/database/health.ts
import prisma from "../prisma";

export class DatabaseHealth {
  private static isConnected: boolean = false;
  private static lastChecked: Date | null = null;
  private static readonly HEALTH_CHECK_INTERVAL = 30000; // 30 seconds

  /**
   * Check database connection health
   */
  static async checkConnection(): Promise<{
    isHealthy: boolean;
    error?: string;
    lastChecked: Date;
  }> {
    const now = new Date();

    try {
      // Simple query to check database connectivity
      await prisma.$queryRaw`SELECT 1`;

      this.isConnected = true;
      this.lastChecked = now;

      console.log("✅ Database connection healthy");
      return { isHealthy: true, lastChecked: now };
    } catch (error) {
      this.isConnected = false;
      this.lastChecked = now;

      const errorMessage =
        error instanceof Error ? error.message : "Unknown database error";
      console.error("❌ Database connection failed:", errorMessage);

      return {
        isHealthy: false,
        error: errorMessage,
        lastChecked: now,
      };
    }
  }

  /**
   * Get current connection status without checking
   */
  static getStatus(): { isConnected: boolean; lastChecked: Date | null } {
    return {
      isConnected: this.isConnected,
      lastChecked: this.lastChecked,
    };
  }

  /**
   * Start periodic health checks
   */
  static startPeriodicChecks(): void {
    // Initial check
    this.checkConnection();

    // Periodic checks
    setInterval(() => {
      this.checkConnection();
    }, this.HEALTH_CHECK_INTERVAL);

    console.log(
      `🔄 Database health checks started (every ${
        this.HEALTH_CHECK_INTERVAL / 1000
      }s)`
    );
  }

  /**
   * Wait for database to be ready with retries
   */
  static async waitForDatabase(
    maxRetries: number = 10,
    retryDelay: number = 2000
  ): Promise<boolean> {
    console.log("🔍 Waiting for database to be ready...");

    for (let i = 1; i <= maxRetries; i++) {
      const result = await this.checkConnection();

      if (result.isHealthy) {
        console.log("✅ Database is ready!");
        return true;
      }

      if (i < maxRetries) {
        console.log(
          `⏳ Attempt ${i}/${maxRetries} failed. Retrying in ${
            retryDelay / 1000
          }s...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    console.warn(
      "⚠️  Database connection failed after all retries. App will continue without database."
    );
    return false;
  }
}
