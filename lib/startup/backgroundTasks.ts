// lib/startup/backgroundTasks.ts
import { getOptionChainIndicesService } from "@/app/api/get-nse-option-chain-live/service";

let intervalId: NodeJS.Timeout | null = null;

export function startOptionChainBackgroundTask() {
  if (intervalId) return; // Prevent multiple intervals
  intervalId = setInterval(async () => {
    try {
      await getOptionChainIndicesService();
      console.log("[Background] Option chain data fetched and saved.");
    } catch (err) {
      console.error("[Background] Error fetching option chain data:", err);
    }
  }, 120000); // 120 seconds
  console.log("[Background] Started option chain fetch task (every 120s)");
}

export function stopOptionChainBackgroundTask() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("[Background] Stopped option chain fetch task");
  }
}
