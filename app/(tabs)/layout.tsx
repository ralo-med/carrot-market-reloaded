import TabBar from "@/components/tab-bar";
import { Suspense } from "react";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Suspense
        fallback={
          <div className="fixed bottom-0 w-full max-w-screen-sm mx-auto grid grid-cols-5 bg-neutral-800 border-neutral-600 border-t px-5 py-3 *:text-white h-16"></div>
        }
      >
        <TabBar />
      </Suspense>
    </div>
  );
}
