import { DeleteDialog } from "@/components/DeleteDialog";
import { EditModal } from "@/components/EditModal";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarDays } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { MdArrowOutward } from "react-icons/md";

export const instant = false;

type destinationDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const DestinationDetailsPage = async ({
  params,
}: destinationDetailsPageProps) => {
  const { id } = await params;
  // console.log(id);
  const res = await fetch(`http://localhost:8000/destinations/${id}`);
  const destinationData = await res.json();
  // console.log(destinationData);
  const {
    destination,
    country,
    price,
    duration,
    imageUrl,
    description,
  } = destinationData;
  return (
    <div className="mx-auto p-6 m-6">
      <h2>Destination details page</h2>
      <div className="flex justify-end gap-2">
        <EditModal destinationData={destinationData} />
        <DeleteDialog destinationData={destinationData}/>
      </div>
      <div className="mx-auto max-w-7xl p-10 m-6 border-2 rounded-2xl">
        <div className="w-full mx-auto">
          <Image
            alt={description}
            src={imageUrl}
            height={500}
            width={1200}
            // fill
            // className="object-cover"
          />
        </div>
        <div className="space-y-3.5 mt-6">
          <div className="flex gap-2 items-center">
            <LuMapPin />
            <span>{country}</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="text-4xl font-bold ">{destination}</div>
              <div className="flex items-center gap-2">
                <FaRegCalendarDays />
                {duration}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">${price}</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            <h2 className="text-2xl font-bold">Overview</h2>
            <div>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
