'use client';

// Pages
import Home from "@/pages/Home";

// Providers
import ReduxProvider from "@/components/providers/ReduxProvider";


export default function App() {
  return (
    <ReduxProvider>
      <Home />
    </ReduxProvider>
  );
}
