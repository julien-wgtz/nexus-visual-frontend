"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { signupSchema } from "./schema";
import { fetchData } from "@/lib/fetch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAppStore } from "@/store/appStore";

const SignUpForm = () => {
  const router = useRouter();
  const t = useTranslations("sign-up.form");
  const formSchema = signupSchema(t);

  const appStore: any = useAppStore();

  const [loading, setLoading] = useState(false);

  const form = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const createUser = async (values: any) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const response = await fetchData(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/signup`,
        {
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.status == 409) {
        return {
          status: response.status,
          message: t("error-user-already-exist"),
        };
      }

      return response;
    } catch (error: any) {
      if (error?.cause?.code) {
        return {
          status: 503,
          message: t("error-server-unavailable"),
        };
      }
    }
  };

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    const response = await createUser(values);
    if (response?.status == 201) {
      setLoading(false);
      const { data } = await response.json();
      const { user } = data;
      appStore.setUser(user);
      appStore.setAccount(user.accountUser[0].account);

      router.push(`dashboard`);
    } else if (
      response?.status == 409 ||
      response?.status == 503
    ) {
      setLoading(false);
      form.setError("root", {
        type: "manual",
        message: response.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mt-4 space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("password")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("confirm-password")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p className="mb-4 text-xs text-destructive">
            {form.formState.errors.root?.message}
          </p>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : null}
            {t("create-account")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
