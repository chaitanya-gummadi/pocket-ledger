import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Edit } from "lucide-react";

interface BudgetTrackerProps {
  totalExpenses: number;
}

export const BudgetTracker = ({ totalExpenses }: BudgetTrackerProps) => {
  const [budget, setBudget] = useState(2000);
  const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(budget.toString());

  const percentage = Math.min((totalExpenses / budget) * 100, 100);
  const remaining = Math.max(budget - totalExpenses, 0);

  const handleSaveBudget = () => {
    const newBudget = parseFloat(tempBudget);
    if (newBudget > 0) {
      setBudget(newBudget);
      setIsEditing(false);
    }
  };

  const getProgressColor = () => {
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-success";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Monthly Budget
          </span>
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsEditing(true);
                setTempBudget(budget.toString());
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="budget">Set Monthly Budget</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                value={tempBudget}
                onChange={(e) => setTempBudget(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveBudget} className="flex-1">
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spent</span>
                <span className="font-medium">
                  ${totalExpenses.toFixed(2)} / ${budget.toFixed(2)}
                </span>
              </div>
              <Progress value={percentage} className="h-3" indicatorClassName={getProgressColor()} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{percentage.toFixed(1)}% used</span>
                <span>${remaining.toFixed(2)} remaining</span>
              </div>
            </div>

            {percentage >= 90 && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive font-medium">
                  ⚠️ You've used {percentage.toFixed(0)}% of your budget!
                </p>
              </div>
            )}

            {percentage >= 70 && percentage < 90 && (
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm text-yellow-700 dark:text-yellow-500 font-medium">
                  ⚡ You've used {percentage.toFixed(0)}% of your budget
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
