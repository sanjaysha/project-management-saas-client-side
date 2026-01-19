import AuthLayout from "../layout/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validators/auth.schema";
import { useAuth } from "../auth/AuthProvider";

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data); // IMPORTANT: AuthContext
      navigate("/"); // redirect after successful registration
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start managing projects with your team"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          placeholder="John Doe"
          register={register("name")}
          error={errors.name?.message}
        />

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
          placeholder="Minimum 8 characters"
          register={register("password")}
          error={errors.password?.message}
        />

        <Button type="submit">Create account</Button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
