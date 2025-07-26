'use server';

/**
 * @fileOverview An AI agent that generates a wishlist of raw materials
 * based on a vendor's daily menu.
 *
 * - generateWishlist - A function that handles the wishlist generation process.
 * - GenerateWishlistInput - The input type for the generateWishlist function.
 * - GenerateWishlistOutput - The return type for the generateWishlist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWishlistInputSchema = z.object({
    dailyMenu: z.string().describe("The vendor's daily menu."),
});
export type GenerateWishlistInput = z.infer<typeof GenerateWishlistInputSchema>;

const GenerateWishlistOutputSchema = z.object({
    wishlist: z.array(z.string()).describe('A list of raw materials with quantities needed for the menu.'),
});
export type GenerateWishlistOutput = z.infer<typeof GenerateWishlistOutputSchema>;

export async function generateWishlist(input: GenerateWishlistInput): Promise<GenerateWishlistOutput> {
    return generateWishlistFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateWishlistPrompt',
    input: {schema: GenerateWishlistInputSchema},
    output: {schema: GenerateWishlistOutputSchema},
    prompt: `You are an AI assistant that helps street food vendors create a shopping list. Given the vendor's daily menu, generate a wishlist of raw materials with estimated quantities.

    Daily Menu: {{{dailyMenu}}}
    
    Generate a wishlist of items. For example: "Potatoes (10kg)", "Gram Flour (Besan) (5kg)".
    `,
});

const generateWishlistFlow = ai.defineFlow(
    {
        name: 'generateWishlistFlow',
        inputSchema: GenerateWishlistInputSchema,
        outputSchema: GenerateWishlistOutputSchema,
    },
    async (input) => {
        const {output} = await prompt(input);
        return output!;
    }
);
