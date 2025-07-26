import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Star, StarHalf, Users } from 'lucide-react';
import { SupplierBadges } from '@/components/verification-badges';
import type { Supplier } from '@/lib/types';
import Image from 'next/image';

const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'Fresh Farms Co.',
    location: 'Pune, MH',
    priceRange: '$$',
    quality: 4.5,
    imgUrl: 'https://placehold.co/40x40.png',
    dataAiHint: 'vegetables farmer',
  },
  {
    id: '2',
    name: 'Grain Emporium',
    location: 'Mumbai, MH',
    priceRange: '$$$',
    quality: 5,
    imgUrl: 'https://placehold.co/40x40.png',
    dataAiHint: 'wheat grain',
  },
  {
    id: '3',
    name: 'Spice Route Inc.',
    location: 'Nashik, MH',
    priceRange: '$',
    quality: 4,
    imgUrl: 'https://placehold.co/40x40.png',
    dataAiHint: 'spices market',
  },
  {
    id: '4',
    name: 'Daily Dairy',
    location: 'Pune, MH',
    priceRange: '$$',
    quality: 3.5,
    imgUrl: 'https://placehold.co/40x40.png',
    dataAiHint: 'milk bottles',
  },
];

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <>
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 text-accent fill-accent" />
        ))}
      {halfStar && <StarHalf className="h-4 w-4 text-accent fill-accent" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground/50 fill-muted" />
        ))}
    </>
  );
};

export function SupplierListings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Users className="h-5 w-5" />
          Live Supplier Listings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead className="hidden sm:table-cell">Location</TableHead>
                <TableHead className="hidden lg:table-cell">Verification</TableHead>
                <TableHead className="hidden md:table-cell">Quality</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={supplier.imgUrl}
                        alt={supplier.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                        data-ai-hint={supplier.dataAiHint}
                      />
                      <span className="font-medium">{supplier.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{supplier.location}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <SupplierBadges supplierId={supplier.id} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      {renderStars(supplier.quality)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{supplier.priceRange}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Chat</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
