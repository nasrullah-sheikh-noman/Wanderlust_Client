"use client";

import { DestinationType } from "@/types/destination";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextField,
  Select,
  TextArea,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { toast } from "sonner";

type DestinationDataType = {
  destinationData: DestinationType
}

export function EditModal({ destinationData }: DestinationDataType) {
  const router = useRouter();
  
  const {
    _id,
    destination,
    country,
    category,
    price,
    duration,
    imageUrl,
    description,
    departureDate
  } = destinationData;
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destinationData = Object.fromEntries(formData.entries());
    // console.log("destination data", destinationData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}//destinations/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(destinationData),
    });
    if (!res.ok) {
      const errortext = await res.text();
      console.error("Server error", res.status, errortext);
      return;
    } else {
      toast.success("Destination Updated successfully");
      router.refresh();
    }

    await res.json();
    // console.log("data", data);
  };
  return (
    <Modal>
      <div>
        <Button variant="outline" className={'rounded-xl px-6 py-5 border-2 underline'}>Edit <BiSolidEdit /></Button>
      </div>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-4xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="font-bold text-2xl my-3.5">Edit Destinations Details</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="mx-auto p-10 space-y-8 w-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={destination} name="destinationName" isRequired>
                        <Label>Destination Name</Label>
                        <Input
                          
                          name="destination"
                          placeholder="Bali Paradise"
                          className="rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Country */}
                    <TextField defaultValue={country} name="country" isRequired>
                      <Label>Country</Label>
                      <Input
                        
                        name="country"
                        placeholder="Indonesia"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Category - Updated Select Component */}
                    <div>
                      <Select
                        defaultValue={category}
                        name="category"
                        isRequired
                        className="w-full"
                        placeholder="Select category"
                      >
                        <Label>Category</Label>
                        <Select.Trigger className="rounded-2xl">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="Beach" textValue="Beach">
                              Beach
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Mountain" textValue="Mountain">
                              Mountain
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="City" textValue="City">
                              City
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Adventure" textValue="Adventure">
                              Adventure
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Cultural" textValue="Cultural">
                              Cultural
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Luxury" textValue="Luxury">
                              Luxury
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Price */}
                    <TextField defaultValue={price} name="price" type="number" isRequired>
                      <Label>Price (USD)</Label>
                      <Input
                        name="price"
                        type="number"
                        placeholder="1299"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Duration */}
                    <TextField defaultValue={duration} name="duration" isRequired>
                      <Label>Duration</Label>
                      <Input
                        name="duration"
                        placeholder="7 Days / 6 Nights"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Departure Date */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={departureDate} name="departureDate" type="date" isRequired>
                        <Label>Departure Date</Label>
                        <Input
                          name="departureDate"
                          type="date"
                          className="rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Image URL - Removed preview */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={imageUrl} name="imageUrl" isRequired>
                        <Label>Image URL</Label>
                        <Input
                          name="imageUrl"
                          type="url"
                          placeholder="https://example.com/bali-paradise.jpg"
                          className="rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={description} name="description" isRequired>
                        <Label>Description</Label>
                        <TextArea
                          name="description"
                          placeholder="Describe the travel experience..."
                          className="rounded-3xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end">
                    <Button type="submit" slot="close">Save</Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
