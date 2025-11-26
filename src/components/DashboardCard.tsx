import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  type?: "default" | "income" | "expense";
}

export const DashboardCard = ({ title, amount, icon: Icon, type = "default" }: DashboardCardProps) => {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(Math.abs(amount));

  const getColorClass = () => {
    if (type === "income") return "text-success";
    if (type === "expense") return "text-destructive";
    return "text-primary";
  };

  return (
    <Card className="transition-all hover:shadow-lg border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className={`text-3xl font-bold ${getColorClass()}`}>
              {formattedAmount}
            </p>
          </div>
          <div className={`p-3 rounded-xl ${
            type === "income" ? "bg-success/10" :
            type === "expense" ? "bg-destructive/10" :
            "bg-primary/10"
          }`}>
            <Icon className={`h-6 w-6 ${getColorClass()}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
