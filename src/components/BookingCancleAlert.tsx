"use client";

import { authClient } from "@/lib/auth-client";
import { BookingType } from "@/types/booking";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";

type bookingCancleAlertType = {
  Booking: BookingType
}

export function BookingCancleAlert({ Booking }: bookingCancleAlertType) {
  const router = useRouter();
  const { _id, country } = Booking;  

  const cancleDestinationHandle = async () => {
    try {
      const { data: tokenData, error } = await authClient.token()
      if (error || !tokenData?.token) {
        toast.error("Unable to get authentication token")
        return;
      }
      const token = tokenData.token;
      const res = await fetch(`http://localhost:8000/booking/${_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      if (res.ok) {
        toast.success(`Delete ${country} destination parmanently`);
        router.refresh();
      } else {
        toast.error("Something want wrong");
      }
      const data = await res.json();
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <AlertDialog>
      <Button variant="danger">
        <RiDeleteBin6Line /> Cancel
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-xl font-bold">
                Cancle booking permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancle your{" "}
                <strong>{country} destination</strong> in your booking list and
                all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={cancleDestinationHandle}
                slot="close"
                variant="danger"
              >
                Cancle Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
