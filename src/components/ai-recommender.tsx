'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lightbulb, Loader2, Star } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  recommendSuppliers,
  type RecommendSuppliersOutput,
} from '@/app/actions';
import { Badge } from './ui/badge';

const formSchema = z.object({
  vendorLocation: z.string().min(1, 'Location is required.'),
  preferredPriceRange: z.string().min(1, 'Price range is required.'),
  historicalQualityRatings: z
    .string()
    .min(1, 'Quality rating preference is required.'),
  dailyMenu: z.string().min(1, 'Daily menu is required.'),
});

export function AiRecommender() {
  const [recommendations, setRecommendations] =
    useState<RecommendSuppliersOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorLocation: 'Pune, MH',
      preferredPriceRange: 'Affordable to Mid-range',
      historicalQualityRatings: '4 stars and above',
      dailyMenu: 'Vada Pav, Samosa, Bhaji, Chai',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await recommendSuppliers(values);
      setRecommendations(result);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get recommendations. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Lightbulb className="h-5 w-5 text-accent" />
          AI Supplier Recommendations
        </CardTitle>
        <CardDescription>
          Get intelligent supplier suggestions based on your specific needs and
          daily menu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="vendorLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Pune, MH" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredPriceRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Affordable" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="historicalQualityRatings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Quality</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 4 stars and above" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dailyMenu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Today's Menu</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List items you are selling today..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Recommendations
            </Button>
          </form>
        </Form>

        {isLoading && (
          <div className="mt-6 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Finding best suppliers...</p>
          </div>
        )}

        {recommendations && recommendations.supplierRecommendations.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <h3 className="font-bold mb-2 font-headline">Top Recommendations</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Suitability</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recommendations.supplierRecommendations.map((rec, index) => (
                  <TableRow key={index}>
                    <TableCell className='font-medium'>{rec.supplierName}</TableCell>
                    <TableCell>
                      <Badge variant={rec.suitabilityScore > 8 ? "default" : "secondary"} className={rec.suitabilityScore > 8 ? 'bg-primary text-primary-foreground' : ''}>
                        {rec.suitabilityScore}/10
                      </Badge>
                    </TableCell>
                    <TableCell>{Math.round(rec.trustScore)}/100</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {rec.qualityRating}
                      </div>
                    </TableCell>
                    <TableCell>{rec.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
