'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ShoppingCart } from 'lucide-react';

const chartData = [
  { month: 'Jan', cost: 1860 },
  { month: 'Feb', cost: 2050 },
  { month: 'Mar', cost: 2370 },
  { month: 'Apr', cost: 1980 },
  { month: 'May', cost: 2540 },
  { month: 'Jun', cost: 2900 },
];

const chartConfig = {
  cost: {
    label: 'Cost (₹)',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig

export function OrderHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <ShoppingCart className="h-5 w-5" />
          Order History & Cost
        </CardTitle>
        <CardDescription>Your spending over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={chartData} accessibilityLayer margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="cost" fill="var(--color-cost)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
