import * as z from "zod";

const reasonSchema = z.object({
  id: z.string().optional(),
  reason: z.string(),
  votes: z.number(),
  rating: z.number(),
  totalRespondants: z.coerce.number().min(0).multipleOf(1).optional(),
  photoUrl: z.string().optional(),
  ratings: z.record(z.string(), z.number()).optional(),
  isUserSubmission: z.boolean().optional(),
  userId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  parentId: z.string().optional(),
  latlng: z.object({ lat: z.number(), lng: z.number() }).optional(),
});

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

  reasons: z.array(reasonSchema),
  reasonsUser: z.array(reasonSchema).optional(),
  primaryColor: z.string().optional(),
  primaryColorForeground: z.string().optional(),
});

export type Profile = z.infer<typeof profileSchema>;

export type Reason = Profile["reasons"][number];
