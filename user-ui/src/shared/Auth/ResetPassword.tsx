"use client";
import styles from "@/src/utils/style";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "@/src/graphql/actions/reset-password.action";

const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters!!"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters!!"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

const FixedAiOutlineEyeInvisible = AiOutlineEyeInvisible as any;
const FixedAiOutlineEye = AiOutlineEye as any;

type ResetPasswordSchema = z.infer<typeof formSchema>;
const ResetPassword = ({
  activationToken,
}: {
  activationToken: string | string[];
}) => {
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const response = await resetPassword({
        variables: {
          password: data.password,
          activationToken: activationToken,
        },
      });
      toast.success("Password updated successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="md:w-[500px] w-full">
        <h1 className={`${styles.title}`}>Reset Password DigitalistWay</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="w-full mt-5 relative mb-1">
            <label htmlFor="password" className={`${styles.label}`}>
              Confirm your password
            </label>
            <input
              {...register("confirmPassword")}
              type={!confirmPasswordShow ? "password" : "text"}
              placeholder="********"
              className={`${styles.input}`}
            />

            {!confirmPasswordShow ? (
              <FixedAiOutlineEyeInvisible
                size={20}
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                onClick={() => setConfirmPasswordShow(true)}
              />
            ) : (
              <FixedAiOutlineEye
                size={20}
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                onClick={() => setConfirmPasswordShow(false)}
              />
            )}
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500">{`${errors.confirmPassword.message}`}</span>
          )}
          <br />
          <div className="w-full mt-5">
            <input
              type="submit"
              value="Submit"
              className={`${styles.button} mt-3`}
              disabled={isSubmitting || loading}
            />
          </div>
          <br />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
