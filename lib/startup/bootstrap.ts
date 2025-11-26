// lib/startup/bootstrap.ts
import { initializeApp } from "./init";

// Run initialization when this module is imported
let isInitialized = false;

export async function bootstrap() {
  if (isInitialized) {
    return;
  }

  isInitialized = true;
  await initializeApp();
}

// Auto-run initialization in development
if (process.env.NODE_ENV === "development") {
  bootstrap().catch(console.error);
}
