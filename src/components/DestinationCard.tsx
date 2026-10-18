import { DestinationType } from "@/types/destination";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";

type DestinationCardProps = {
  destinationInfo: DestinationType
}

const DestinationCard = ({ destinationInfo } : DestinationCardProps) => {
  const {destination, country, category, price, duration, imageUrl, description} = destinationInfo;
  return (
    <div className=" p-5 rounded-2xl border-2 ">
      <div className="relative w-full h-64">
        <Image
          alt={destination}
          src={imageUrl}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <LuMapPin />
          <span>{country}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
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
    </div>
  );
};

export default DestinationCard;