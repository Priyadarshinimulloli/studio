'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { List, Loader2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateWishlist } from '@/app/actions';

export function Wishlist() {
    const [menu, setMenu] = useState('Vada Pav, Samosa, Bhaji');
    const [wishlistItems, setWishlistItems] = useState([
        { id: 1, name: 'Potatoes (5kg)', checked: false },
        { id: 2, name: 'Onions (2kg)', checked: false },
        { id: 3, name: 'Gram Flour (Besan) (1kg)', checked: true },
        { id: 4, name: 'Cooking Oil (5L)', checked: false },
        { id: 5, name: 'Green Chillies (250g)', checked: true },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleAutoGenerate = async () => {
        setIsLoading(true);
        setWishlistItems([]);
        try {
            const result = await generateWishlist({ dailyMenu: menu });
            setWishlistItems(result.wishlist.map((name, index) => ({ id: index + 1, name, checked: false })));
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to auto-generate wishlist. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCheckChange = (id: number) => {
        setWishlistItems(items => items.map(item => item.id === id ? {...item, checked: !item.checked} : item));
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5" />
          Raw Material Wishlist
        </CardTitle>
        <CardDescription>Auto-generate a wishlist based on your daily menu.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            <div>
                <Textarea 
                    placeholder="Enter your daily menu..."
                    value={menu}
                    onChange={(e) => setMenu(e.target.value)}
                    className="mb-2"
                />
                <Button onClick={handleAutoGenerate} disabled={isLoading || !menu} size="sm" variant="outline">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Auto-Generate
                </Button>
            </div>
            <div className="space-y-3 pt-4 border-t">
                {isLoading && wishlistItems.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                        <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                        <p>Generating...</p>
                    </div>
                ) : wishlistItems.length === 0 && !isLoading ? (
                    <p className="text-center text-muted-foreground">Your wishlist is empty. Generate one from your menu!</p>
                ) : (
                    wishlistItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                        <Checkbox id={`wishlist-${item.id}`} checked={item.checked} onCheckedChange={() => handleCheckChange(item.id)}/>
                        <label
                            htmlFor={`wishlist-${item.id}`}
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                        >
                            {item.name}
                        </label>
                        </div>
                    ))
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
