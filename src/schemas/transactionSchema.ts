import * as z from "zod";

export const transactionSchema = z.object({
  amount: z.number().min(0, "Amount must be at least 0"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  category: z.string().min(1, "Category is required"),
});

export type TTransactionSchemaValues = z.infer<typeof transactionSchema>;
