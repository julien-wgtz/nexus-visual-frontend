"use client";
import {
  Form,
  FormControl,
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
import { fetchData } from "@/lib/fetch";
import { useTranslations } from "use-intl";
import { signinSchema } from "./schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAppStore } from "@/store/appStore";
import useDashboardStore from "@/store/dashboardStore";
import { Languages } from "lucide-react";
import { useLocale } from "next-intl";

const SignInForm = () => {
  const router = useRouter();
  const t = useTranslations("sign-in.form");
  const schema = signinSchema(t);

  const appStore: any = useAppStore();
  const restoreData = useDashboardStore((state: any) => state.restoreData);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const connectUser = async (values: any) => {
    setLoading(true);

    const { email, password } = values;
    try {
      const response = await fetchData(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/signin`,
        {
          body: JSON.stringify({
            email,
            password
          }),
        }
      );

      if (!response.ok) {
        if (response.status == 401) {
          return {
            status: response.status,
            message: t("error-invalide-id"),
          };
        }
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
    values: z.infer<typeof schema>
  ) => {
    const response = await connectUser(values);
    if (response?.status == 200) {
      setLoading(false);
        const { data } = await (response as Response).json();
        const { user, account } = data;
        appStore.setUser(user);
        appStore.setAccount(account);
        restoreData();
        router.push(`dashboard`);
    } else if (
      response?.status == 401 ||
      response?.status == 503
    ) {
      setLoading(false);
      form.setError("root", {
        type: "manual",
        message: "Some thinks wrong",
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
        <div className="space-y-2">
          <p className="text-xs text-destructive">
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
            {t("sign-in-title")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
