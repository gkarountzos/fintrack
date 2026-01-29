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

interface AddIncomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddIncomeDialog({ open, onOpenChange }: AddIncomeDialogProps) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    startTransition(async () => {
      const result = await addIncomeAction({
        category,
        amount,
        date,
        description,
      });

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        onOpenChange(false);
        setCategory("");
        setAmount("");
        setDescription("");
        setDate(new Date().toISOString().split("T")[0]);
      }
    });
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
            {errorMessage && (
              <div className="text-sm text-red-500 font-medium">
                {errorMessage}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="category">{localization.income.category}</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
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
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">{localization.income.amount}</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder={localization.common.enterAmount}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">{localization.income.date}</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
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
