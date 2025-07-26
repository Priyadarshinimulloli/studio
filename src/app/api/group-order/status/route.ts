import { NextResponse } from 'next/server';

// In-memory state (reset on server restart)
let vendorCount = 7;
let orderTotal = 12000;
let timeRemaining = "01:23:45";
let vendors = ["Vendor A", "Vendor B", "Vendor C", "Vendor D", "Vendor E", "Vendor F", "Vendor G"];

function getPriceDrop(count: number) {
  if (count >= 10) return 20;
  if (count >= 5) return 10;
  return 0;
}

function getNextMilestone(count: number) {
  if (count < 5) return { vendorsNeeded: 5 - count, discount: 10 };
  if (count < 10) return { vendorsNeeded: 10 - count, discount: 20 };
  return null;
}

export async function GET() {
  const priceDrop = getPriceDrop(vendorCount);
  const nextMilestone = getNextMilestone(vendorCount);
  return NextResponse.json({
    vendorCount,
    priceDrop,
    nextMilestone,
    orderTotal,
    timeRemaining,
    vendors,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (typeof body.vendorCount === 'number') vendorCount = body.vendorCount;
  if (typeof body.orderTotal === 'number') orderTotal = body.orderTotal;
  if (typeof body.timeRemaining === 'string') timeRemaining = body.timeRemaining;
  if (Array.isArray(body.vendors)) vendors = body.vendors;
  return NextResponse.json({
    success: true,
    vendorCount,
    orderTotal,
    timeRemaining,
    vendors,
  });
}
