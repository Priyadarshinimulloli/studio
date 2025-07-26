import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { List } from 'lucide-react';
import { Button } from './ui/button';

const wishlistItems = [
  { id: 1, name: 'Potatoes (5kg)' },
  { id: 2, name: 'Onions (2kg)' },
  { id: 3, name: 'Gram Flour (Besan) (1kg)' },
  { id: 4, name: 'Cooking Oil (5L)' },
  { id: 5, name: 'Green Chillies (250g)' },
];

export function Wishlist() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 font-headline">
          <List className="h-5 w-5" />
          Raw Material Wishlist
        </CardTitle>
        <Button variant="ghost" size="sm">
          Auto-Generate
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <Checkbox id={`wishlist-${item.id}`} />
              <label
                htmlFor={`wishlist-${item.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
