import { NextResponse } from 'next/server';
import { vendorCount, orderTotal } from '../status/route';
import { vendors } from '../status/route';

// Example AI logic for recommendations (replace with real model/service)
interface Recommendations {
  recommendedSuppliers: string[];
  recommendedGroupSize: number;
  priceDropPrediction: number;
}

function getSupplierRecommendations(vendorCount: number, orderTotal: number): Recommendations {
  // Use current vendors as recommendations
  const recommendedSuppliers = vendors;
  const recommendedGroupSize = vendorCount < 10 ? vendorCount + 3 : vendorCount;
  const priceDropPrediction = vendorCount < 10 ? 20 : 0;
  return {
    recommendedSuppliers,
    recommendedGroupSize,
    priceDropPrediction,
  };
}

export async function GET(): Promise<NextResponse> {
  // Use live state from status/route.ts
  const recommendations = getSupplierRecommendations(vendorCount, orderTotal);
  return NextResponse.json(recommendations);
}
