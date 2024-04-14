import { z } from "zod";

export const signinSchema = (t: any) =>
  z.object({
    email: z.string().email({
      message: t("error-invalide-adresse"),
    }),
    password: z.string().min(8, {
      message: t("error-invalide-password"),
    }),
  });
