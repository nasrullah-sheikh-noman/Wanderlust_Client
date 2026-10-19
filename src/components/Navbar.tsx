"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  // console.log("Session", session);
  const user = session?.user;
  // console.log("User", user);
  const handleSignOut = async() => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  }
  return (
    <nav className="flex justify-between gap-6 p-3 bg-white">
      <ul className="flex gap-4">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/my_booking"}>My Booking</Link>
        </li>
        <li>
          <Link href={"/destinations"}>Destinations</Link>
        </li>
        <li>
          <Link href={"/add-destination"}>Add Destination</Link>
        </li>
      </ul>
      <div>
        <h4 className="text-2xl font-bold text-cyan-500">Wanderlust</h4>
      </div>
      <ul className="flex items-center gap-4">
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
        {user ? (
          <>
            <li>
              <Avatar>
                <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image ?? undefined} />
                <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
              </Avatar>
            </li>
            <Button onClick={handleSignOut} className="rounded-none" variant="danger">
              Logout
            </Button>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/signup"}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
