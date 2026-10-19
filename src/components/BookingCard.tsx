"use client";

import { DestinationType } from "@/types/destination";
import { Button, Card } from "@heroui/react";
import {DateField, Label} from "@heroui/react";
import { FaCalendarAlt } from "react-icons/fa";

type DestinationCardProps = {
  destinationData: DestinationType;
};

const BookingCard = ({ destinationData }: DestinationCardProps) => {
  const { price } = destinationData;
  return (
    <Card className="mt-10 border-2 p-5 space-y-3">
      <div>
        <p className="text-sm text-muted">Starting from</p>
        <h2 className="text-3xl font-extrabold text-cyan-600">${price}</h2>
        <h2 className="text-sm text-muted">Per person</h2>
      </div>
      <div>
        <DateField className="w-[256px]" name="date">
          <Label>Departure Date</Label>
          <DateField.Group>
            <DateField.Prefix>
              <FaCalendarAlt className="size-4 text-muted"/>
            </DateField.Prefix>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
        </DateField>
      </div>
      <div>
        <Button  className={"w-full  bg-cyan-600"}>Book Now</Button>
      </div>
    </Card>
  );
};

export default BookingCard;
