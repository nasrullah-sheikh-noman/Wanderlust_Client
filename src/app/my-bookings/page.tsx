import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const instant = false

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  // console.log("session", session);
  const user = session?.user
  // console.log("user", user);
  const res = await fetch(`http://localhost:8000/bookings/${user?.id}`);
  const data = await res.json()
  // console.log("data", data);
  return (
    <div className='mx-auto max-w-7xl'>
      <h2 className='text-2xl font-bold'>My bookings</h2>
      <div>

      </div>
    </div>
  );
};

export default MyBookingsPage;