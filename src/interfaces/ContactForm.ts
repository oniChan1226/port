import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;