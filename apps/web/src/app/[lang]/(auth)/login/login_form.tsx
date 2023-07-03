"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "ui";
import { z } from "zod";

import { client } from "@/services/client";
import { useSearchQuery } from "@/utils/use_search_query";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
});
type Schema = z.infer<typeof Schema>;

export const LoginForm: React.FC<React.Translations<"login">> = ({
  translations,
}) => {
  const router = useRouter();
  const { searchQuery } = useSearchQuery();
  const redirectTo = searchQuery["redirectTo"];

  const form = useForm<Schema>({
    defaultValues: {
      email: "admin@email.com",
      password: "Passwor6",
    },
    resolver: zodResolver(Schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    try {
      setIsLoading(true);
      const { body, status } = await client.auth.login({
        body: data,
      });
      switch (status) {
        case 200:
          router.push(typeof redirectTo === "string" ? redirectTo : "/");
          break;
        // case 401:
        //   const apiError = body.errors.find(Boolean);
        //   if (apiError) {
        //     setApiError(apiError);
        //   }
        //   break;
        default:
          setApiError("Unknown Error");
      }
    } catch (error) {
      console.log(error);
      setApiError(`${JSON.stringify(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-md border bg-white px-4 py-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.login.email}</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder={translations.login.email}
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
              <FormLabel>{translations.login.password}</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder={translations.login.password}
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {apiError && <FormMessage className="mt-5">{apiError}</FormMessage>}
        <Button className="mt-5" disabled={isLoading}>
          {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          {translations.login.login}
        </Button>
      </form>
    </Form>
  );
};
