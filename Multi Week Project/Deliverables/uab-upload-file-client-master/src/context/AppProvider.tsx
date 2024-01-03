"use client";

import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import AlertProvider from "./AlertProvider";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AlertProvider>{children}</AlertProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
