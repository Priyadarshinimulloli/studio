'use server';
/**
 * @fileOverview An AI agent that recommends suppliers to vendors based on
 * location, price, trust score, and historical quality.
 *
 * - recommendSuppliers - A function that handles the supplier recommendation process.
 * - RecommendSuppliersInput - The input type for the recommendSuppliers function.
 * - RecommendSuppliersOutput - The return type for the recommendSuppliers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSuppliersInputSchema = z.object({
  vendorLocation: z
    .string()
    .describe('The location of the vendor.'),
  preferredPriceRange: z
    .string()
    .describe('The preferred price range of the vendor.'),
  historicalQualityRatings: z
    .string()
    .describe('The historical quality ratings preferred by the vendor.'),
  dailyMenu: z
    .string()
    .describe('The vendor\'s daily menu to determine raw material needs.'),
});
export type RecommendSuppliersInput = z.infer<typeof RecommendSuppliersInputSchema>;

const RecommendSuppliersOutputSchema = z.object({
  supplierRecommendations: z.array(
    z.object({
      supplierName: z.string().describe('The name of the supplier.'),
      location: z.string().describe('The location of the supplier.'),
      price: z.string().describe('The price of the supplier\'s products.'),
      trustScore: z.number().describe('The trust score of the supplier.'),
      qualityRating: z.string().describe('The quality rating of the supplier.'),
      suitabilityScore: z
        .number()
        .describe('A score indicating how suitable the supplier is for the vendor based on the daily menu.'),
    })
  ).
    describe('A list of recommended suppliers.'),
});
export type RecommendSuppliersOutput = z.infer<typeof RecommendSuppliersOutputSchema>;

export async function recommendSuppliers(input: RecommendSuppliersInput): Promise<RecommendSuppliersOutput> {
  return recommendSuppliersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSuppliersPrompt',
  input: {schema: RecommendSuppliersInputSchema},
  output: {schema: RecommendSuppliersOutputSchema},
  prompt: `You are an AI assistant helping vendors find the best suppliers for their raw materials.

  Based on the vendor's location, preferred price range, historical quality ratings, and daily menu, recommend a list of suppliers.

  Vendor Location: {{{vendorLocation}}}
  Preferred Price Range: {{{preferredPriceRange}}}
  Historical Quality Ratings: {{{historicalQualityRatings}}}
  Daily Menu: {{{dailyMenu}}}

  Return a list of suppliers with their name, location, price, trust score, quality rating, and suitability score based on the daily menu.
  Ensure the output is a valid JSON.
  `,
});

const recommendSuppliersFlow = ai.defineFlow(
  {
    name: 'recommendSuppliersFlow',
    inputSchema: RecommendSuppliersInputSchema,
    outputSchema: RecommendSuppliersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
