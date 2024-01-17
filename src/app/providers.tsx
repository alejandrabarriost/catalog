// app/providers.jsx
"use client";

import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export default function QueryClientProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
}
