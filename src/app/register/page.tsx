"use client";
import { AuthSchema, TAuthSchema } from "@/utils/usersSchema";
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
    formState: { errors, isLoading, isSubmitSuccessful },
  } = useForm<TAuthSchema>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit = async (datas: TAuthSchema) => {
    const data = JSON.stringify({
      id: uuidv4(),
      createdAt: new Date(),
      name: datas.name,
      avatar:
        "https://robohash.org/consequaturexplicabovoluptatem.png?size=50x50&set=set1",
      datas: {
        response: 200,
        email: datas.email,
        password: datas.password,
      },
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      const resData = await res.json();
      console.log(resData);

      if (res.status == 200) {
        router.push("/users");
        toast.success("Successfully register.");
      } else {
        toast.error("Register failed, please try again.");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="max-w-md w-full">
      <div className="py-12 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <label htmlFor="name">Full name</label>
            <input
              className="rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-opacity-40"
              placeholder="Your Full Name"
              {...register("name")}
            />
            {errors?.name && (
              <span className="text-xs text-gray-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="grid gap-1 py-1">
            <label htmlFor="datas.password">Password</label>
            <input
              className="rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-opacity-40 "
              placeholder="Create Password"
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
            <label htmlFor="datas.password">Confirm Password</label>
            <input
              className="rounded-lg px-4 py-3 placeholder:text-sm ring-gray-900 placeholder:text-opacity-40 "
              placeholder="Confirm Password"
              type="password"
              {...register("cPassword")}
            />
            {errors?.cPassword && (
              <span className="text-xs text-gray-500">
                {errors.cPassword.message}
              </span>
            )}
          </div>
          <div className="grid gap-1 py-1">
            <button
              disabled={isLoading}
              type="submit"
              className="text-base items-center justify-center font-bold p-3 rounded-lg shadow-md shadow-gray-600 grid gap-1 py-4 hover:opacity-70"
              onClick={() => console.log("Clicked")}
            >
              {isLoading ? (
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
              ) : null}
              Register
            </button>
          </div>

          {isSubmitSuccessful && (
            <span className="text-xs text-gray-500">Register successfully</span>
          )}
        </form>
        <div className="flex justify-center items-center mt-10">
          <span className="text-sm">
            Have an account?{" "}
            <Link
              href={"/login"}
              className="!underline decoration-inherit underline-offset-[3px]"
            >
              <span>Login here</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
