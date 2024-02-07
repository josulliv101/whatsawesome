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
  oinks: z.coerce.number().min(0).multipleOf(1),

  tags: z.array(z.string()),

  hubFilterTags: z
    .object({
      person: z.record(z.string(), z.number().nullable()),
      place: z.record(z.string(), z.number().nullable()),
    })
    .optional(),
  hubFilterId: z.string().optional(),

  isHub: z.boolean().optional(),
  rating: z.number().optional(),

  reasons: z.array(
    z.object({
      id: z.string().optional(),
      reason: z.string(),
      votes: z.number(),
      rating: z.number(),
    })
  ),
});

export type Profile = z.infer<typeof profileSchema>;
