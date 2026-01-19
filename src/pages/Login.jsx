import AuthLayout from "../layout/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validators/auth.schema";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data); // IMPORTANT: use AuthProvider
      navigate("/"); // redirect after login
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your workspace">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          register={register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          register={register("password")}
          error={errors.password?.message}
        />

        <Button type="submit">Sign in</Button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
