"use client";
import {
  AuthLoginSchema,
  AuthSchema,
  TAuthLoginSchema,
  TAuthSchema,
} from "@/utils/usersSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<TAuthLoginSchema>({
    resolver: zodResolver(AuthLoginSchema),
  });

  const onSubmit = async (datas: TAuthLoginSchema) => {
    const { email, password } = datas;
    const data = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await fetch(
        `https://65bb679052189914b5bc0331.mockapi.io/api/auth?email=${email}&password=${password}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await res.json();

      if (res.status === 200) {
        router.push("/users");
        toast.success("Login successfull", { closeButton: true });
      } else {
        toast.error("Wrong email or password", { closeButton: true });
      }
    } catch (error) {
      console.error("Error while logging in", error);
    }
    reset();
  };

  const onErr = () => {
    console.log("Form error");
  };

  return (
    <div className="max-w-md w-full">
      <div className="py-12 w-full">
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
              className="text-base items-center justify-center font-bold p-3 rounded-lg shadow-md shadow-gray-600 grid gap-1 py-4 hover:opacity-70 "
              onClick={() => console.log("Clicked")}
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
