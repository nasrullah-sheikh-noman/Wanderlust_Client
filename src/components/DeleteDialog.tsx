"use client";

import { DestinationType } from "@/types/destination";
import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";

type destinationDataType = {
  destinationData: DestinationType
}

export function DeleteDialog({ destinationData }: destinationDataType) {
  const { _id, destination } = destinationData;
  const onClick = async() => {
    const res = await fetch(`http://localhost:8000/destinations/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
    if (res.ok) {
      redirect("/destinations")
    }
    const data = await res.json()
    console.log("data", data);
  }
  return (
    <AlertDialog>
      <div>
        <Button
          variant="danger-soft"
          className={"rounded-xl px-6 py-5 border-2 underline"}
        >
          Delete <AiOutlineDelete />
        </Button>
      </div>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete this destination permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{destination}</strong> and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={onClick} slot="close" variant="danger">
                Delete Destination
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
