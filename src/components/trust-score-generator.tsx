'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  generateTrustScore,
  type GenerateTrustScoreOutput,
} from '@/app/actions';

const formSchema = z.object({
  fulfillmentRate: z.coerce.number().min(0).max(1),
  pricingStability: z.coerce.number().min(0).max(1),
  deliveryFeedback: z.string().min(1, 'Feedback is required.'),
});

export function TrustScoreGenerator() {
  const [result, setResult] = useState<GenerateTrustScoreOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fulfillmentRate: 0.9,
      pricingStability: 0.75,
      deliveryFeedback: 'Supplier is mostly on time, occasional delays during peak season. Packaging is good.',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);
    try {
      const scoreData = await generateTrustScore(values);
      setResult(scoreData);
    } catch (error) {
      console.error('Failed to generate trust score:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate trust score. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 80) return 'text-green-600';
    if (score > 60) return 'text-yellow-600';
    return 'text-red-600';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <ShieldCheck className="h-5 w-5" />
          AI Trust Score Generator
        </CardTitle>
        <CardDescription>
          Calculate a supplier's trust score based on performance metrics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fulfillmentRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fulfillment Rate: {Math.round(field.value * 100)}%</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricingStability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing Stability: {Math.round(field.value * 100)}%</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryFeedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery & Quality Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Always on time, great quality..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Score
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 text-center">
             <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
             <p className="mt-2 text-muted-foreground">Analyzing data...</p>
           </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h3 className="font-bold mb-2 font-headline">Generated Score</h3>
            <div className="flex items-center justify-center text-center flex-col gap-2">
                <p className={`text-5xl font-bold ${getScoreColor(result.trustScore)}`}>{Math.round(result.trustScore)}</p>
                <p className="text-sm text-muted-foreground">out of 100</p>
            </div>
            <div className="mt-4">
                <h4 className="font-semibold text-sm flex items-center gap-2"><Sparkles className='h-4 w-4 text-primary' />Justification</h4>
                <p className="text-sm text-muted-foreground mt-1">{result.justification}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
