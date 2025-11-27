// lib/startup/init.ts
import { DatabaseHealth } from "../database/health";
import { startOptionChainBackgroundTask } from "./backgroundTasks";

/**
 * Initialize application startup checks and services
 */
export async function initializeApp(): Promise<void> {
  console.log("🚀 Initializing CP Nifty Analyzer...");

  try {
    // Check database connection
    await DatabaseHealth.waitForDatabase(5, 2000);

    // Start periodic health checks
    DatabaseHealth.startPeriodicChecks();

    // Start background task for option chain fetch
    startOptionChainBackgroundTask();

    console.log("✅ Application initialization completed");
  } catch (error) {
    console.error("❌ Application initialization failed:", error);
    // Don't throw - let app continue even if some services fail
  }
}

/**
 * Get application health status
 */
export function getAppHealth(): {
  database: { isConnected: boolean; lastChecked: Date | null };
  timestamp: Date;
} {
  return {
    database: DatabaseHealth.getStatus(),
    timestamp: new Date(),
  };
}
