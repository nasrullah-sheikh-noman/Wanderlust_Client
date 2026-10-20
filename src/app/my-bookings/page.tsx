import { BookingCancleAlert } from "@/components/BookingCancleAlert";
import { auth } from "@/lib/auth";
import { BookingType } from "@/types/booking";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { IoIosPin } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";

export const instant = false;


const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // console.log("session", session);
  const user = session?.user;
  // console.log("user", user);
  const res = await fetch(`http://localhost:8000/bookings/${user?.id}`);
  const bookings: BookingType[] = await res.json();
  // console.log("data", bookings);
  return (
    <div className="mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold">My bookings</h2>
      <div className="min-w-4xl space-y-5.5 mb-16 mt-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex items-center justify-between border-2 rounded-2xl gap-5 p-6 transition-all duration-600 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex gap-8 items-center ">
              <Image
                src={booking.imageUrl}
                alt={booking.destinationName}
                height={200}
                width={260}
                className="rounded-xl transition-all duration-300 hover:scale-105 "
              ></Image>
              <div className="space-y-1">
                <div className="flex items-center text-xl">
                  <IoIosPin />
                  <h2>{booking.country}</h2>
                </div>
                <div className="flex items-center gap-1 ">
                  <FaRegCalendarDays />
                  <h2 className="text-base">Departure:</h2>
                  <h2 className="text-balance font-bold">
                    {new Date(booking.departureDate).toLocaleDateString()}
                  </h2>
                </div>
                <h2 className="text-2xl font-bold">${booking.price}</h2>
                <div className="flex items-center gap-1">
                  <GiConfirmed />
                  <h2 className="text-mediam">Booking Id: {booking._id}</h2>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-auto justify-items-center">
              <BookingCancleAlert Booking={booking} />
              <Button><IoEyeSharp /> View</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
