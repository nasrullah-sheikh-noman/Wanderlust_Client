"use client";

import { authClient } from "@/lib/auth-client";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

type lonInFormData = {
  email: string;
  password: string;
  name: string;
  image: string;
};

const LogInPage = () => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const user = Object.fromEntries(formData.entries())
    const user: lonInFormData = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      name: String(formData.get("name") ?? ""),
      image: String(formData.get("image") ?? ""),
    };
    // console.log("user", user);
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    if (data) {
      toast.success(`Log in user`);
      redirect("/");
    }
    if (error) {
      toast.error("Login failed");
    }
    console.log({ data, error });
  };
  const handleGoogleSignIn = async() => {
    await authClient.signIn.social({
      provider: "google",
    })
  }
  return (
    <div className="flex flex-col mx-auto max-w-7xl my-12 space-y-7.5">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Log in your Account</h1>
      </div>
      <Card className="border-2  p-5">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
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
              Log in
            </Button>
          </div>
        </Form>
        <div className="flex mx-auto justify-center items-center gap-2">
          <Separator />
          <div className="whitespace-nowrap">Or Sign up with</div>
          <Separator />
        </div>
        <div>
          <Button
            onClick={handleGoogleSignIn}
            variant="secondary"
            type="submit"
            className={"w-full "}
          >
            <FcGoogle />
            <h2 className="text-black"> Sign in with Google</h2>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LogInPage;
