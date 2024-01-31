import * as z from "zod";

export const profileSchema = z.object({
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
  /*
    tags: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .transform((val, ctx) => {
        console.log("transform", val, ctx);
        const map = {} as Record<TagName, boolean> | Record<TagName, never>;
  
        !!val.length &&
          val.forEach((option) => (map[option.value as TagName] = true));
        return map;
      }),
    oinks: z.coerce.number().min(0).multipleOf(1),
    reasons: z.array(
      z.object({
        id: z.string().optional(),
        reason: z.string(),
        votes: z.number(),
      })
    ),
    */
});

export type Profile = z.infer<typeof profileSchema>;
