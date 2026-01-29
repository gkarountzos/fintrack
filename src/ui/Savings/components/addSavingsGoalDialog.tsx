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
import { Textarea } from "@/src/ui/ui/textarea";
import localization from "@/src/lib/localization.json";

interface AddSavingsGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSavingsGoalDialog({
  open,
  onOpenChange,
}: AddSavingsGoalDialogProps) {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Add database integration here
    onOpenChange(false);
    // Reset form
    setGoalName("");
    setTargetAmount("");
    setCurrentAmount("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{localization.savings.setGoal}</DialogTitle>
            <DialogDescription>{localization.app.tagline}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="goalName">{localization.savings.goalName}</Label>
              <Input
                id="goalName"
                type="text"
                placeholder={localization.savings.goalNamePlaceholder}
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetAmount">
                {localization.savings.targetAmount}
              </Label>
              <Input
                id="targetAmount"
                type="number"
                step="0.01"
                placeholder={localization.common.enterAmount}
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currentAmount">
                {localization.savings.currentAmount}
              </Label>
              <Input
                id="currentAmount"
                type="number"
                step="0.01"
                placeholder={localization.common.enterAmount}
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">
                {localization.savings.goalDescription}
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
