import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Client from "./client";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.createAI.queryOptions({
      text: "Samarth Kamble",
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="font-extrabold flex items-center justify-center h-screen text-2xl">
          <Client />
        </div>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
