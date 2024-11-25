import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().max(128),
});
