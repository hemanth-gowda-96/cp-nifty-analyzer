// components/swagger-wrapper.tsx
'use client';

import { StrictMode } from 'react';
import SwaggerUI from 'swagger-ui-react';

interface SwaggerWrapperProps {
  spec: any;
  docExpansion?: "list" | "none" | "full";
  deepLinking?: boolean;
  displayRequestDuration?: boolean;
  tryItOutEnabled?: boolean;
}

// Wrapper component that disables StrictMode for SwaggerUI to avoid lifecycle warnings
export default function SwaggerWrapper(props: SwaggerWrapperProps) {
  return (
    <div suppressHydrationWarning>
      <SwaggerUI {...props} />
    </div>
  );
}