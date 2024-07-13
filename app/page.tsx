import AsyncCounter from "@/components/AsyncCounter";
import OptimisticCounter from "@/components/OptimisticCounter";

export default async function Home() {
  const res = await fetch(
    `${process.env.SERVER_URL}/counter`,
    {
      cache: "no-cache",
      next: {
        tags: ["counter"],
      },
    },
  );

  const data = await res.json();
  return (
    <main className='flex flex-col h-screen'>
      <AsyncCounter counter={data?.[0]} />
      <OptimisticCounter counter={data?.[0]} />
    </main>
  );
}
