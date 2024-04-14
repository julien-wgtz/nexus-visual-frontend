import { z } from "zod";

export const signupSchema = (t: any) =>
  z
    .object({
      email: z.string().email({
        message: t("error-invalide-adresse"),
      }),
      password: z.string().min(8, {
        message: t("error-invalide-password"),
      }),
      passwordConfirmation: z.string(),
    })
    .refine(
      (data) =>
        data.password ===
        data.passwordConfirmation,
      {
        message: t("error-dont-match-password"),
        path: ["passwordConfirmation"],
      }
    );
