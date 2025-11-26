/**
 * Polling utility function
 * Runs a callback function at specified intervals
 */

export interface PollingOptions {
  interval: number; // in milliseconds
  immediate?: boolean; // run immediately on start
  maxRuns?: number; // maximum number of runs, undefined for infinite
}

export class Poller {
  private intervalId: NodeJS.Timeout | null = null;
  private runCount = 0;

  constructor(
    private callback: () => void | Promise<void>,
    private options: PollingOptions
  ) {}

  start(): void {
    if (this.intervalId) {
      console.warn('Poller is already running');
      return;
    }

    const run = async () => {
      try {
        await this.callback();
        this.runCount++;

        if (this.options.maxRuns && this.runCount >= this.options.maxRuns) {
          this.stop();
        }
      } catch (error) {
        console.error('Polling callback error:', error);
      }
    };

    if (this.options.immediate) {
      run();
    }

    this.intervalId = setInterval(run, this.options.interval);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Polling stopped');
    }
  }

  isRunning(): boolean {
    return this.intervalId !== null;
  }

  getRunCount(): number {
    return this.runCount;
  }
}

/**
 * Convenience function to create and start a poller
 */
export function startPolling(
  callback: () => void | Promise<void>,
  options: PollingOptions
): Poller {
  const poller = new Poller(callback, options);
  poller.start();
  return poller;
}