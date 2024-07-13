"use client";

import {
  getRevalidate,
  getRevalidateReset,
} from "@/action/action";
import { useState } from "react";

type Props = {
  counter: {
    _id: string;
    count: string;
  };
};

function AsyncCounter({ counter }: Props) {
  const [isPending, setisPending] = useState(false);
  const id = counter._id;
  const handleCounter = async (count: number) => {
    setisPending(true);

    await getRevalidate(id, count);
    setisPending(false);
  };

  const handleReset = async () => {
    setisPending(true);

    await getRevalidateReset(id);
    setisPending(false);
  };
  return (
    <div className='flex flex-col justify-center items-center h-full border'>
      <h1 className='text-2xl text-gray-600 my-4'>
        Normal Appoarch which we are using now
      </h1>
      {isPending && <p>Loading....</p>}
      <div className='flex items-center space-x-4'>
        <button
          className='p-1 text-[50px]'
          onClick={() => handleCounter(-1)}
        >
          -
        </button>
        <p className='text-2xl'>{counter?.count}</p>
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

export default AsyncCounter;
