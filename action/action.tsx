"use server";

import { revalidateTag } from "next/cache";
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success");
  }, 3000);
});
export const getRevalidate = async (
  id: string,
  count: number,
) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/counter/${id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ count }),
    },
  );
  await promise;
  revalidateTag("counter");
};

export const getRevalidateReset = async (id: string) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/counter/reset/${id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
    },
  );
  await promise;
  revalidateTag("counter");
};
