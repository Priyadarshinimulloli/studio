"use client";
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";

const steps = [
  { label: "Ordered", icon: "🛒" },
  { label: "Packed", icon: "📦" },
  { label: "Shipped", icon: "🚚" },
  { label: "Delivered", icon: "🏠" },
];

export default function OrderStatusTracker() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep(currentStep + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <Card className="mb-4 p-6 shadow-lg rounded-xl bg-gradient-to-br from-white to-green-50">
      <h2 className="text-xl font-extrabold mb-4 text-green-900 flex items-center gap-2">
        <span>Order Status Tracker</span>
      </h2>
      <ol className="flex flex-col gap-4">
        {steps.map((step, idx) => (
          <li key={step.label} className="flex items-center gap-3">
            <span className={`text-2xl ${idx <= currentStep ? "" : "opacity-30"}`}>{step.icon}</span>
            <span className={`font-bold ${idx === currentStep ? "text-green-700" : "text-gray-400"}`}>{step.label}</span>
            {idx === currentStep && <span className="ml-2 text-xs text-green-600">(current)</span>}
          </li>
        ))}
      </ol>
    </Card>
  );
}
