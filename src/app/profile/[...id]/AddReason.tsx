"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PropsWithChildren } from "react";
import { addReasonToProfile } from "@/lib/firebase";

const FormSchema = z.object({
  reason: z
    .string()
    .min(10, {
      message: "Must be at least 10 characters.",
    })
    .max(150, {
      message: "Must not be longer than 150 characters.",
    }),
});

export function AddReason({
  name,
  profileId,
  userId,
  onSubmit,
}: PropsWithChildren<{
  name: string;
  profileId: string;
  userId: string;
  onSubmit: any;
}>) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  async function onFoobar(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    // "use server";
    // await addReasonToProfile(profileId, userId, data.reason);
    // toast("Submit New Reason.", {
    //   description: JSON.stringify(data, null, 2),
    // });

    try {
      await onSubmit(data);
    } catch (e: unknown) {
      toast("Error adding item.", {
        description: (e as Error).message,
      });
    }
  }

  return (
    <div className="flex justify-center  w-full min-h-[220px] bg-muted text-muted-foreground px-8 py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFoobar)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Add something awesome about {name}</FormLabel> */}
                <FormControl>
                  <Textarea
                    placeholder={`Add something awesome about ${name}.`}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Maximum characters 150.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size={"sm"} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
