import { DestinationType } from "@/types/destination";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarDays } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { MdArrowOutward } from "react-icons/md";

type DestinationCardProps = {
  destinationInfo: DestinationType
}

const DestinationCard = ({ destinationInfo } : DestinationCardProps) => {
  const { _id, destination, country, category, price, duration, imageUrl, description} = destinationInfo;
  return (
    <div className=" p-5 rounded-2xl border-2 space-y-3">
      <div className="relative w-full h-64">
        <Image
          alt={destination}
          src={imageUrl}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-1.5">
        <div className="flex gap-2 items-center">
          <LuMapPin />
          <span>{country}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className=" font-bold">
              {destination}
            </div>
            <div className="flex items-center gap-2">
              <FaRegCalendarDays />
              {duration}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold">${price}</h3>
          </div>
        </div>
      </div>
      <Link href={`/destinations/${_id}`} className="flex items-center gap-2 border-2 w-fit rounded-2xl px-3 py-2 text-gray-500 underline">
        <span>Book now</span>
        <MdArrowOutward />
      </Link>
    </div>
  );
};

export default DestinationCard;