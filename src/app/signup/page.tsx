"use client";

import { authClient } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

type signUpFormData = {
  name: string,
  email: string,
  password: string,
  image: string,
}

const SignUpPage = () => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    // const user = Object.fromEntries(formData.entries())
    const user: signUpFormData = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      image: String(formData.get("image") ?? ""),
      password: String(formData.get("password") ?? "")
    }
    // console.log("user", user);
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    })
    if (data) {
      toast.success("Sign up successfully completed")
      redirect('/login')
    } 
    if (error) {
      toast.error("Sign up failed")
    }
    // console.log({data, error});
  }
  return (
    <div className="flex flex-col mx-auto max-w-7xl my-12 space-y-7.5">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <h4 className="text-xl">Start your adventure with Wanderlust</h4>
      </div>
      <Card className="border-2  p-5">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4" >
          <TextField
            isRequired
            name="name"
            type="text"
          >
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>
          <TextField
            name="image"
            type="url"
          >
            <Label>Image URL</Label>
            <Input placeholder="Enter image url" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex justify-center gap-2">
            <Button type="submit" className={"w-full"}>
              Create Account
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
