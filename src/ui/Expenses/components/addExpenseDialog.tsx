"use client";

import React from "react";

import { useState } from "react";
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

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const expenseCategories = [
  { value: "food", label: localization.expenses.categoryLabels.food },
  { value: "transport", label: localization.expenses.categoryLabels.transport },
  { value: "shopping", label: localization.expenses.categoryLabels.shopping },
  {
    value: "entertainment",
    label: localization.expenses.categoryLabels.entertainment,
  },
  { value: "health", label: localization.expenses.categoryLabels.health },
  { value: "bills", label: localization.expenses.categoryLabels.bills },
  { value: "groceries", label: localization.expenses.categoryLabels.groceries },
  { value: "other", label: localization.expenses.categoryLabels.other },
];

export function AddExpenseDialog({
  open,
  onOpenChange,
}: AddExpenseDialogProps) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Add database integration here
    onOpenChange(false);
    // Reset form
    setCategory("");
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{localization.expenses.addExpense}</DialogTitle>
            <DialogDescription>{localization.app.tagline}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">{localization.expenses.category}</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue
                    placeholder={localization.common.selectCategory}
                  />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">{localization.expenses.amount}</Label>
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
              <Label htmlFor="date">{localization.expenses.date}</Label>
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
                {localization.expenses.description}
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
            >
              {localization.common.cancel}
            </Button>
            <Button type="submit">{localization.common.save}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
