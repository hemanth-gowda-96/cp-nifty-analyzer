// lib/startup/backgroundTasks.ts
import { getOptionChainIndicesService } from "@/app/api/get-nse-option-chain-live/service";

let intervalId: NodeJS.Timeout | null = null;

export function startOptionChainBackgroundTask() {
  if (intervalId) return; // Prevent multiple intervals
  intervalId = setInterval(async () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    // Only run between 10:00am and 4:00pm (16:00)
    // if ((hour > 10 || (hour === 10 && minute >= 0)) && hour < 16) {
    //   try {
    //     await getOptionChainIndicesService();
    //     console.log("[Background] Option chain data fetched and saved.");
    //   } catch (err) {
    //     console.error("[Background] Error fetching option chain data:", err);
    //   }
    // } else {
    //   console.log("[Background] Skipped fetch: outside 10:00-16:00");
    // }
    
    await getOptionChainIndicesService();

  }, 60000); // 60 seconds
  console.log("[Background] Started option chain fetch task (every 60s)");
}

export function stopOptionChainBackgroundTask() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("[Background] Stopped option chain fetch task");
  }
}
