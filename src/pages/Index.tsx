import { useState } from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { TransactionForm, Transaction } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { BudgetTracker } from "@/components/BudgetTracker";
import { CategoryChart } from "@/components/CategoryChart";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleAddTransaction = (transaction: Omit<Transaction, "id" | "date">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date(),
    };

    setTransactions([newTransaction, ...transactions]);
    
    toast({
      title: "Transaction added",
      description: `${transaction.type === "income" ? "Income" : "Expense"} of ₹${transaction.amount.toFixed(2)} recorded successfully.`,
    });
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Smart Finance Tracker
          </h1>
          <p className="text-muted-foreground">
            Take control of your personal finances with intelligent budget planning
          </p>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Total Balance"
            amount={balance}
            icon={Wallet}
            type="default"
          />
          <DashboardCard
            title="Total Income"
            amount={totalIncome}
            icon={TrendingUp}
            type="income"
          />
          <DashboardCard
            title="Total Expenses"
            amount={totalExpenses}
            icon={TrendingDown}
            type="expense"
          />
        </div>

        {/* Transaction Form */}
        <div className="mb-8">
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </div>

        {/* Budget Tracker and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BudgetTracker totalExpenses={totalExpenses} />
          <CategoryChart transactions={transactions} />
        </div>

        {/* Transaction List */}
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </div>
  );
};

export default Index;
