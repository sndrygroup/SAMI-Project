"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Transaction } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { PlusCircle, Loader2 } from "lucide-react";

interface BillingClientProps {
  user: User;
  transactions: Transaction[];
}

export function BillingClient({ user, transactions }: BillingClientProps) {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/billing/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: depositAmount }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to deposit funds");
      }
      
      setIsDepositModalOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">المحفظة والفواتير</h1>
        <Button onClick={() => setIsDepositModalOpen(true)}>
          <PlusCircle size={20} className="ml-2" />
          إضافة رصيد
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>الرصيد الحالي</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-green-400">${user.adWalletBalance.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>سجل المعاملات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <p className="text-gray-400">لا توجد معاملات لعرضها.</p>
                ) : (
                  transactions.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className={`font-bold ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                          {tx.amount > 0 ? "+" : ""}${tx.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">{tx.type}</p>
                      </div>
                      <p className="text-sm text-gray-400">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isDepositModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>إضافة رصيد للمحفظة</CardTitle>
              <CardDescription>أدخل المبلغ الذي ترغب بإيداعه.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDeposit} className="space-y-4">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <Input
                  type="number"
                  placeholder="المبلغ"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  required
                  min="1"
                />
                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="secondary" type="button" onClick={() => setIsDepositModalOpen(false)} disabled={isLoading}>
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    إيداع
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

