"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import MultipleSelector, { Option } from "@/components/MultipleSelector";
import { tags } from "@/lib/tags";
import { addProfile, firebaseApp } from "@/lib/firebase";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import TagDialog from "./TagDialog";
import { latlngSchema } from "@/lib/profile";
import GoogleMap, { API_KEY, ClientAPIProvider } from "./GoogleMap";
import { GeoPoint, getFirestore } from "firebase/firestore";

const OPTIONS: Option[] = tags.map((tag) => ({
  label: tag,
  value: tag,
}));

export const profileFormSchema = z.object({
  id: z
    .string()
    .min(3, {
      message: "Profile Id must be at least 3 characters.",
    })
    .max(60, {
      message: "Username must not be longer than 30 characters.",
    }),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(60, {
      message: "Name must not be longer than 30 characters.",
    }),
  description: z.string().max(500).min(4),
  pic: z.string().max(200).min(0),
  tags: z.array(z.string()).transform((val, ctx) => {
    console.log("transform", val, ctx);
    const map = {} as Record<string, boolean> | Record<string, never>;

    !!val.length && val.forEach((option) => (map[option as string] = true));
    return map;
  }),
  oinks: z.coerce.number().min(0).multipleOf(1),
  rating: z.coerce.number().min(0).max(100),
  reasons: z.array(
    z.object({
      id: z.string().optional(),
      reason: z.string(),
      votes: z.number().optional(),
      tagMap: z.record(z.boolean()).optional(),
    })
  ),
  latlng: latlngSchema
    .nullable()
    .optional()
    .transform((val, ctx) => {
      console.log("ll", val, ctx);
      if (val) {
        const geo = new GeoPoint(val.lat, val.lng);

        return geo;
        // return [val.lat, val.lng];
      }
      return null;
    }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  id: "",
  description: "",
  oinks: 0,
  rating: 0,
  tags: [] as any, // Record<TagName, boolean>,
  reasons: [],
  latlng: null,
};

export function ProfileForm({ addProfile, profile }: any) {
  const [suggestions, setSuggestions] = useState([]);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: !!profile ? profile : defaultValues,
    mode: "onChange",
  });

  // const foobar = useFormState({ name: "latlng", control: form.control });
  console.log("form", form.formState.errors);
  const { fields, append, remove } = useFieldArray({
    name: "reasons",
    control: form.control,
    keyName: "reason",
  });

  const { replace } = useFieldArray({
    name: "tags" as never, // TODO fix typing
    control: form.control,
    // keyName: "value",
  });

  const handleTagEdit = (d: any) => {
    console.log("handleTagEdit", d);
  };

  async function onSubmit(data: ProfileFormValues) {
    console.log("data ...", JSON.stringify(data, null, 2));
    await addProfile(data);
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  }

  const handleSuggestions = async (open: boolean) => {
    console.log("handleSuggestions", open);
    if (open) {
      const results = await fetch(
        "/api/suggest?name=" + (profile?.name || form.getValues().name)
      ).then((resp) => resp.json());
      // setSuggestions()
      console.log("results", results);
      if (results.success) {
        setSuggestions(results.data);
      }
    }
  };

  return (
    <ClientAPIProvider apiKey={API_KEY}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Id</FormLabel>
                <FormControl>
                  <Input placeholder="profile id" {...field} />
                </FormControl>
                <FormDescription>
                  Please enter a unique profile id. This can be changed in the
                  future.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Larry Bird" {...field} />
                </FormControl>
                <FormDescription>
                  This is the public display name of the profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="latlng"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <GoogleMap
                    latlng={form.getValues().latlng || { lat: 0, lng: 0 }}
                    onChange={form.setValue}
                  />
                </FormControl>
                <FormDescription>
                  This is the public display name of the profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oinks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oinks</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>
                  This is the public display name of the profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>
                  The whats awesome rating - from 0 to 100.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input placeholder="/my-profile-pic.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  This is the url of the picture that is displayed with profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>

                <FormControl>
                  <MultipleSelector
                    onChange={(tags) => {
                      console.log(tags);

                      replace(tags.map((item) => item.value));
                    }}
                    defaultOptions={OPTIONS}
                    value={(field.value as unknown as string[]).map((tag) => ({
                      label: tag,
                      value: tag,
                    }))}
                    placeholder="Add tags..."
                    creatable
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormDescription>
                  Please select the appropriate tags.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  link to them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id || index}
                name={`reasons.${index}.reason`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      what&#39;s awesome?
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add what&#39;s awesome.
                    </FormDescription>
                    <FormControl>
                      <div className="flex w-full items-center space-x-2">
                        <Textarea {...field} className="" />
                        <Button
                          id={String(index)}
                          onClick={(ev) => {
                            ev.preventDefault();
                            remove(Number(ev.currentTarget.id));
                            console.log("args", ev.currentTarget.id);
                          }}
                        >
                          delete
                        </Button>
                        <TagDialog
                          profileId={profile.id}
                          reasonId={fields[index].id}
                          options={OPTIONS}
                          tags={Object.keys(fields[index].tagMap || {})}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ reason: "", votes: 0 })}
              >
                Add
              </Button>
              <Dialog onOpenChange={handleSuggestions}>
                <DialogTrigger asChild>
                  <Button variant="outline">Generate Suggestions</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Generate Suggestions</DialogTitle>
                    <DialogDescription>
                      Select the suggestions you want to save.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="">
                    {suggestions.map((suggestion, i) => {
                      return (
                        <div key={i}>
                          #{i}{" "}
                          <Button
                            onClick={() =>
                              append({ reason: suggestion, votes: 0 })
                            }
                            variant={"secondary"}
                          >
                            {suggestion}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button type="submit">Update profile</Button>
            {!!profile && (
              <Button asChild>
                <Link href={`/profile/${profile.id}`}>View profile</Link>
              </Button>
            )}
          </div>
        </form>
      </Form>
    </ClientAPIProvider>
  );
}
