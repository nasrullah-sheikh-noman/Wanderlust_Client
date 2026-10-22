"use client";

import { authClient } from "@/lib/auth-client";
import { DestinationType } from "@/types/destination";
import { Button, Card, DateValue } from "@heroui/react";
import { DateField, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from "sonner";

type DestinationCardProps = {
  destinationData: DestinationType;
};

const BookingCard = ({ destinationData }: DestinationCardProps) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log("user", user);
  const { price, _id, destination, imageUrl, country } = destinationData;
  const [departureDate, setDepartureDate] = useState<DateValue | null>(null);
  if (departureDate) {
    // console.log("departure date", departureDate.toDate("UTC"));
  }
  const handleBooking = async () => {
    if (!departureDate) {
      toast.warning("Please fill date feild!");
    } else {
      const bookingData = {
        userId: user?.id,
        userName: user?.name,
        userImage: user?.image,
        destinationId: _id,
        destinationName: destination,
        price,
        imageUrl,
        country,
        departureDate: departureDate?.toDate("UTC"),
      };
      // console.log("Booking data", bookingData);
      try {
        const { data: tokenData, error } = await authClient.token()
        if (error || !tokenData?.token) {
          toast.error("Unable to get authentication token")
          return;
        }
        const token = tokenData.token
        // console.log("token", token);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}//booking`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        });
        const data = await res.json();
        console.log("data", data);
        toast.success("Booked successfully")
        router.push('/my-bookings');
      } catch (error) {
        console.log("booking error", error);
      }
      
    }
  };
  return (
    <Card className="mt-10 border-2 p-5 space-y-3">
      <div>
        <p className="text-sm text-muted">Starting from</p>
        <h2 className="text-3xl font-extrabold text-cyan-600">${price}</h2>
        <h2 className="text-sm text-muted">Per person</h2>
      </div>
      <div>
        <DateField
          onChange={setDepartureDate}
          className="w-[256px]"
          name="date"
        >
          <Label>Departure Date</Label>
          <DateField.Group>
            <DateField.Prefix>
              <FaCalendarAlt className="size-4 text-muted" />
            </DateField.Prefix>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
        </DateField>
      </div>
      <div>
        <Button onClick={handleBooking} className={"w-full  bg-cyan-600"}>
          Book Now
        </Button>
      </div>
    </Card>
  );
};

export default BookingCard;
