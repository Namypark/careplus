import { z } from "zod";

const UserValidationForm = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
  email: z.string().email("Invalid Email Address"),
  phone: z
    .string()
    .refine(
      (phone: string) => /^\+?[1-9]\d{1-14}$/.test(phone),
      "INVALID PHONE NUMBER"
    ),
});

export { UserValidationForm };
