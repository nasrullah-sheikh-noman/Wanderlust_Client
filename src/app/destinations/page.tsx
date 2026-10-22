import DestinationCard from "@/components/DestinationCard";
import { DestinationType } from "@/types/destination";

export const instant = false

const DestinatiosPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}//destinations`);
  if (!res.ok) {
    throw Error("Failed to fatch destinations");
  }
  const destinations : DestinationType[] = await res.json();
  // console.log("all destinations ", destinations);
  return (
    <div className="mb-12 p-4">
      <h1 className="text-2xl font-bold">All Destinations</h1>
      <div className="grid grid-cols-2 gap-6 max-w-7xl mx-auto justify-center p-6">
        {
          destinations.map(destination => <DestinationCard key={destination._id} destinationInfo={destination}/>)
        }
      </div>
    </div>
  );
};

export default DestinatiosPage;