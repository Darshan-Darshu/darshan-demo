"use client";

import {
  getRevalidate,
  getRevalidateReset,
} from "@/action/action";
import { useOptimistic, useTransition } from "react";

type Props = {
  counter: {
    _id: string;
    count: string;
  };
};

function OptimisticCounter({ counter }: Props) {
  const virCount = Number(counter.count);
  const [isPending, startTransition] = useTransition();
  const [optimistic, addOptimistic] = useOptimistic(
    virCount,
    (state, amount: number) => (state += amount),
  );
  const id = counter._id;
  const handleCounter = async (count: number) => {
    addOptimistic(count);
    startTransition(() => getRevalidate(id, count));
  };

  const handleReset = async () => {
    addOptimistic(-optimistic);
    startTransition(() => getRevalidateReset(id));
  };
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <h1 className='text-2xl text-gray-600 my-4'>
        New Optimistic Appoarch
      </h1>
      <div className='flex items-center space-x-4'>
        <button
          className='p-1 text-[50px]'
          onClick={() => handleCounter(-1)}
        >
          -
        </button>
        <p className='text-2xl'>{optimistic}</p>
        <button
          className='p-1 text-[50px]'
          onClick={() => handleCounter(1)}
        >
          +
        </button>
      </div>

      <button
        onClick={handleReset}
        className='border border-gray-600 px-5 py-2 text-[20px]'
      >
        Reset
      </button>
    </div>
  );
}

export default OptimisticCounter;
