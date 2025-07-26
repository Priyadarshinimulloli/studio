'use server';

/**
 * @fileOverview A trust score generation AI agent.
 *
 * - generateTrustScore - A function that handles the trust score generation process.
 * - GenerateTrustScoreInput - The input type for the generateTrustScore function.
 * - GenerateTrustScoreOutput - The return type for the generateTrustScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTrustScoreInputSchema = z.object({
  fulfillmentRate: z
    .number()
    .describe('The supplier fulfillment rate (0 to 1).'),
  deliveryFeedback: z
    .string()
    .describe('Customer feedback from delivery reviews.'),
  pricingStability: z
    .number()
    .describe('The pricing stability of the supplier (0 to 1).'),
});
export type GenerateTrustScoreInput = z.infer<typeof GenerateTrustScoreInputSchema>;

const GenerateTrustScoreOutputSchema = z.object({
  trustScore: z
    .number()
    .describe('The generated trust score for the supplier (0 to 100).'),
  justification: z
    .string()
    .describe('The justification for the generated trust score.'),
});
export type GenerateTrustScoreOutput = z.infer<typeof GenerateTrustScoreOutputSchema>;

export async function generateTrustScore(input: GenerateTrustScoreInput): Promise<GenerateTrustScoreOutput> {
  return generateTrustScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTrustScorePrompt',
  input: {schema: GenerateTrustScoreInputSchema},
  output: {schema: GenerateTrustScoreOutputSchema},
  prompt: `You are an AI assistant that generates a trust score for suppliers.

  Given the following information about a supplier, generate a trust score between 0 and 100, and provide a justification for the score.

  Fulfillment Rate: {{fulfillmentRate}}
  Delivery Feedback: {{deliveryFeedback}}
  Pricing Stability: {{pricingStability}}

  Trust Score (0-100): 
  Justification: `,
});

const generateTrustScoreFlow = ai.defineFlow(
  {
    name: 'generateTrustScoreFlow',
    inputSchema: GenerateTrustScoreInputSchema,
    outputSchema: GenerateTrustScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
