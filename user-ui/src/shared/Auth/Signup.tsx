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
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/src/graphql/actions/register.action";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters!!"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters!!"),
  phone_number: z.number().min(10, "Phone number must be at least 10 digits!!"),
});

const FixedGoogle = FcGoogle as any;
const FixedGithub = AiFillGithub as any;
const FixedAiOutlineEyeInvisible = AiOutlineEyeInvisible as any;
const FixedAiOutlineEye = AiOutlineEye as any;

type SignUpSchema = z.infer<typeof formSchema>;

const Signup = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [registerUserMutation, { loading }] = useMutation(REGISTER_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await registerUserMutation({
        variables: data,
      });
      localStorage.setItem(
        "activation_token",
        response.data.register.activation_token
      );
      toast.success("Please check your email to activate your account");
      reset();
      setActiveState("Verification");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>SignUp DigitalistWay</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-2 relative mb-3">
          <label className={`${styles.label}`}>Enter your name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="John Doe"
            className={`${styles.input}`}
          />
        </div>

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
        <div className="w-full mt-2 relative mb-3">
          <label className={`${styles.label}`}>Enter your phone number</label>
          <input
            {...register("phone_number", { valueAsNumber: true })}
            type="number"
            placeholder="0(000)000-0000"
            className={`${styles.input}`}
          />
        </div>
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
          {errors.password && (
            <span className="text-red-500">{`${errors.password.message}`}</span>
          )}
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
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Sign Up"
            className={`${styles.button} mt-3`}
            disabled={isSubmitting || loading}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 text-base text-white">Or join with</h5>
        <div className="flex items-center justify-center my-3">
          <FixedGoogle size={30} className="cursor-pointer mr-2" />
          <FixedGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 text-base">
          Already have an account?{" "}
          <span
            className="text-blue-500 pl-1 cursor-pointer"
            onClick={() => setActiveState("Login")}
          >
            Login
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Signup;
