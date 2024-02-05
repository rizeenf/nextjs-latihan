"use client";
import {
  AuthLoginSchema,
  AuthSchema,
  TAuthLoginSchema,
  TAuthSchema,
} from "@/lib/validators/usersSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAuthLoginSchema>({
    resolver: zodResolver(AuthLoginSchema),
  });

  const onSubmit = async (datas: TAuthLoginSchema) => {
    // const { email, password } = datas;
    // const data = JSON.stringify({
    //   email,
    //   password,
    // });
    setIsLoading(true);
    try {
      // const res = await fetch(
      //   `https://65bb679052189914b5bc0331.mockapi.io/api/auth?email=${email}&password=${password}`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // const resData = await res.json();

      // if (res.status === 200) {
      //   router.push("/users");
      //   toast.success("Login successfull", { closeButton: true });
      // } else {
      //   toast.error("Wrong email or password", { closeButton: true });
      // }

      const result = await signIn("credentials", {
        redirect: false,
        email: datas.email,
        password: datas.password,
      });

      if (result?.ok) {
        toast.success("Login successfull", { closeButton: true });
        router.push("/users");
      } else {
        toast.error("Wrong email or password", { closeButton: true });
      }
    } catch (error) {
      console.error("Error while logging in", error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const onErr = () => {
    console.log("Form error");
  };

  return (
    <div className="max-w-md w-full">
      <div className="py-12 w-full">
        <h2 className=" self-center text-3xl mb-5 font-semibold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit, onErr)}>
          <div className="grid gap-1 py-1">
            <label htmlFor="datas.email">Email</label>
            <input
              className="rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-opacity-40"
              placeholder="Enter Email"
              {...register("email")}
            />
            {errors?.email && (
              <span className="text-xs text-gray-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-1 py-1">
            <label htmlFor="datas.password">Password</label>
            <input
              className="rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-opacity-40 "
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            {errors?.password && (
              <span className="text-xs text-gray-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="grid gap-1 py-1">
            <button
              disabled={isLoading}
              type="submit"
              className="text-base items-center justify-center font-bold p-3 rounded-lg shadow-md shadow-gray-600 flex gap-1 py-4 hover:opacity-70 disabled:text-gray-500"
            >
              {isLoading ? (
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
              ) : null}
              Login
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center mt-10">
          <span className="text-sm">
            Dont have an account?{" "}
            <Link
              href={"/register"}
              className="!underline decoration-inherit underline-offset-[3px]"
            >
              <span>Register here</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
