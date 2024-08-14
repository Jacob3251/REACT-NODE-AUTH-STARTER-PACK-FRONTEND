import AuthLayout from "@/layouts/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorLabel from "@/components/ErrorLabel";
import { Link } from "react-router-dom";

function Login() {
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .max(12, "Password can't be more than 12 characters")
      .min(6, "Password can't be less than 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  type LoginData = z.infer<typeof LoginSchema>;

  const onSubmit = (data: LoginData) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] md:w-[300px] h-[80vh] md:h-auto bg-white bg-opacity-35 p-5 rounded-md border-2 border-slate-200 text-lg"
      >
        <h2 className="font-pacifico text-center text-3xl">Sign In</h2>
        <div className="mt-5">
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="bg-white bg-opacity-70 focus:border-2 focus:border-slate-300"
          />
        </div>
        {errors.email && (
          <ErrorLabel>{errors.email?.message as string}</ErrorLabel>
        )}
        <div className="mt-2">
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="bg-white bg-opacity-70 focus:border-2 focus:border-slate-300"
          />
        </div>
        {errors.password && (
          <ErrorLabel>{errors.password?.message as string}</ErrorLabel>
        )}
        <div className="mt-2">
          <Button type="submit" className="w-full capitalize">
            Sign in
          </Button>
        </div>

        <div className="mt-2 text-sm">
          Don't have an account?{" "}
          <span className="hover:underline">
            <Link to="/auth/register">Sign Up</Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
