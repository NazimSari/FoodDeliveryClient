import styles from "@/src/utils/style";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters!!"),
});
const FixedGoogle = FcGoogle as any;
const FixedGithub = AiFillGithub as any;
const FixedAiOutlineEyeInvisible = AiOutlineEyeInvisible as any;
const FixedAiOutlineEye = AiOutlineEye as any;

type LoginSchema = z.infer<typeof formSchema>;
const Login = ({ setActiveState }: { setActiveState: (e: string) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Login DigitalistWay</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={`${styles.label}`}>Enter your Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="loginmail@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-500 block mt-1">{`${errors.email.message}`}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            {...register("password")}
            type={!showPassword ? "password" : "text"}
            placeholder="********"
            className={`${styles.input}`}
          />

          {!showPassword ? (
            <FixedAiOutlineEyeInvisible
              size={20}
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <FixedAiOutlineEye
              size={20}
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-red-500">{`${errors.password.message}`}</span>
        )}
        <div className="w-full mt-5">
          <span
            className={`${styles.label}  text-blue-500 block text-right cursor-pointer`}
          >
            Forgot your password?
          </span>
          <input
            type="submit"
            value="Login"
            className={`${styles.button} mt-3`}
            disabled={isSubmitting}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 text-base text-white">Or join with</h5>
        <div className="flex items-center justify-center my-3">
          <FixedGoogle size={30} className="cursor-pointer mr-2" />
          <FixedGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 text-base">
          Not have any account?{" "}
          <span
            className="text-blue-500 pl-1 cursor-pointer"
            onClick={() => setActiveState("Signup")}
          >
            Sign Up
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Login;
