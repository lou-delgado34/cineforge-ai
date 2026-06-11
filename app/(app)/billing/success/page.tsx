import { Suspense } from "react";
import BillingSuccessClient from "./success-client";

export default function BillingSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center p-6 text-white">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">
            Loading subscription...
          </div>
        </main>
      }
    >
      <BillingSuccessClient />
    </Suspense>
  );
}