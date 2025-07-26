'use server';

import {
  generateTrustScore as generateTrustScoreFlow,
  type GenerateTrustScoreInput,
  type GenerateTrustScoreOutput,
} from '@/ai/flows/generate-trust-score';
import {
  recommendSuppliers as recommendSuppliersFlow,
  type RecommendSuppliersInput,
  type RecommendSuppliersOutput,
} from '@/ai/flows/recommend-suppliers';
import {
  generateWishlist as generateWishlistFlow,
  type GenerateWishlistInput,
  type GenerateWishlistOutput,
} from '@/ai/flows/generate-wishlist';

export async function recommendSuppliers(
  input: RecommendSuppliersInput
): Promise<RecommendSuppliersOutput> {
  return await recommendSuppliersFlow(input);
}

export async function generateTrustScore(
  input: GenerateTrustScoreInput
): Promise<GenerateTrustScoreOutput> {
  return await generateTrustScoreFlow(input);
}

export async function generateWishlist(
    input: GenerateWishlistInput
): Promise<GenerateWishlistOutput> {
    return await generateWishlistFlow(input);
}

export type {
  RecommendSuppliersInput,
  RecommendSuppliersOutput,
  GenerateTrustScoreInput,
  GenerateTrustScoreOutput,
  GenerateWishlistInput,
  GenerateWishlistOutput,
};
