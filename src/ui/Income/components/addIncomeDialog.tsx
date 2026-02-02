"use client";

import React, { useState, useTransition } from "react"; // Added useTransition
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/ui/ui/dialog";
import { Button } from "@/src/ui/ui/button";
import { Input } from "@/src/ui/ui/input";
import { Label } from "@/src/ui/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/ui/ui/select";
import { Textarea } from "@/src/ui/ui/textarea";
import localization from "@/src/lib/localization.json";
import { Loader2 } from "lucide-react";
import { addIncomeAction } from "@/src/actions/income/incomeActions";
import {
  transactionSchema,
  TTransactionSchemaValues,
} from "@/src/schemas/transactionSchema";

interface IAddIncomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddIncomeDialog({ open, onOpenChange }: IAddIncomeDialogProps) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof TTransactionSchemaValues, string>>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setFieldErrors({});

    const result = transactionSchema.safeParse({
      category,
      amount: parseFloat(amount),
      date,
      description,
    });

    if (!result.success) {
      const formattedErrors: Partial<
        Record<keyof TTransactionSchemaValues, string>
      > = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof TTransactionSchemaValues;
        formattedErrors[path] = issue.message;
      });
      setFieldErrors(formattedErrors);
      return;
    }

    startTransition(async () => {
      const response = await addIncomeAction({
        category: result.data.category,
        amount: result.data.amount.toString(),
        date: result.data.date,
        description: result.data.description || "",
      });

      if (response.error) {
        setServerError(response.error);
      } else {
        onOpenChange(false);
        setCategory("");
        setAmount("");
        setDescription("");
        setDate(new Date().toISOString().split("T")[0]);
      }
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{localization.income.addIncome}</DialogTitle>
            <DialogDescription>{localization.app.tagline}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {serverError && (
              <div className="text-sm text-red-500 font-medium">
                {serverError}
              </div>
            )}

            <div className="grid gap-2">
              <Label
                htmlFor="category"
                className={fieldErrors.category ? "text-red-500" : ""}
              >
                {localization.income.category}
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  id="category"
                  className={fieldErrors.category ? "border-red-500" : ""}
                >
                  <SelectValue
                    placeholder={localization.common.selectCategory}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">
                    {localization.income.categories.salary}
                  </SelectItem>
                  <SelectItem value="freelance">
                    {localization.income.categories.freelance}
                  </SelectItem>
                  <SelectItem value="investment">
                    {localization.income.categories.investment}
                  </SelectItem>
                  <SelectItem value="business">
                    {localization.income.categories.business}
                  </SelectItem>
                  <SelectItem value="rental">
                    {localization.income.categories.rental}
                  </SelectItem>
                  <SelectItem value="gift">
                    {localization.income.categories.gift}
                  </SelectItem>
                  <SelectItem value="other">
                    {localization.income.categories.other}
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldErrors.category && (
                <span className="text-xs text-red-500">
                  {fieldErrors.category}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="amount"
                className={fieldErrors.amount ? "text-red-500" : ""}
              >
                {localization.income.amount}
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder={localization.common.enterAmount}
                value={amount}
                onChange={handleAmountChange}
                className={fieldErrors.amount ? "border-red-500" : ""}
              />
              {fieldErrors.amount && (
                <span className="text-xs text-red-500">
                  {fieldErrors.amount}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="date"
                className={fieldErrors.date ? "text-red-500" : ""}
              >
                {localization.income.date}
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={fieldErrors.date ? "border-red-500" : ""}
              />
              {fieldErrors.date && (
                <span className="text-xs text-red-500">{fieldErrors.date}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">
                {localization.income.description}
              </Label>
              <Textarea
                id="description"
                placeholder={localization.common.enterDescription}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {localization.common.cancel}
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {localization.common.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
