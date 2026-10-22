import { Button } from "@heroui/react";
import Link from "next/link";
import DestinationCard from "./DestinationCard";
import { DestinationType } from "@/types/destination";


const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`)
  const destionations: DestinationType[] = await res.json()
  // console.log("destionations", destionations);
  return (
    <div className="flex flex-col mx-auto max-w-7xl p-6 my-18">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-bold text-3xl">Featured Destinations</h1>
        <Link href={'/destinations'}>
          <Button variant="tertiary" className=" text-xl rounded-none border-2 border-cyan-500 text-cyan-500 p-5">All Destinations</Button>
        </Link>
      </div>
      <div className="grid my-9 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          destionations.map(destination => <DestinationCard key={destination._id} destinationInfo ={destination}/>)
        }
      </div>
    </div>
  );
};

export default Featured;