"use client";
import React from "react";
import { Campaign } from "@prisma/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";

interface AnalyticsClientProps {
  campaigns: Campaign[];
  platformData: { name: string; budget: number; spent: number }[];
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

export function AnalyticsClient({ campaigns, platformData }: AnalyticsClientProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-white mb-8">التحليلات الذكية</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>أداء الحملات</CardTitle>
            <CardDescription>مقارنة بين الميزانية والمصروف لكل حملة</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaigns}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f1e25",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="budget" fill="#8884d8" name="الميزانية" />
                <Bar dataKey="spent" fill="#82ca9d" name="المصروف" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزيع الميزانية على المنصات</CardTitle>
            <CardDescription>عرض نسبة الميزانية المخصصة لكل منصة</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="budget"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f1e25",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>.
        </Card>
      </div>
    </div>
  );
}

