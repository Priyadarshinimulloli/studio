'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SupplierBadges } from '@/components/verification-badges';
import { 
  Search, 
  TrendingDown, 
  TrendingUp, 
  MapPin, 
  Star,
  Filter,
  ArrowUpDown,
  MessageSquare,
  ShoppingCart
} from 'lucide-react';

interface PriceComparison {
  id: string;
  supplier: string;
  location: string;
  distance: number;
  price: number;
  unit: string;
  quality: number;
  minOrder: number;
  inStock: boolean;
  lastUpdated: string;
  priceChange: 'up' | 'down' | 'stable';
  priceChangePercent: number;
}

interface SearchFilters {
  item: string;
  location: string;
  maxDistance: string;
  sortBy: string;
  minQuality: string;
}

const samplePriceData: PriceComparison[] = [
  {
    id: '1',
    supplier: 'Fresh Farms Co.',
    location: 'Pune, MH',
    distance: 2.5,
    price: 20,
    unit: 'kg',
    quality: 4.5,
    minOrder: 25,
    inStock: true,
    lastUpdated: '2 hours ago',
    priceChange: 'down',
    priceChangePercent: 5
  },
  {
    id: '2',
    supplier: 'Green Valley Suppliers',
    location: 'Pune, MH',
    distance: 4.2,
    price: 18,
    unit: 'kg',
    quality: 4.0,
    minOrder: 50,
    inStock: true,
    lastUpdated: '1 hour ago',
    priceChange: 'stable',
    priceChangePercent: 0
  },
  {
    id: '3',
    supplier: 'Market Fresh Ltd.',
    location: 'Mumbai, MH',
    distance: 8.7,
    price: 22,
    unit: 'kg',
    quality: 4.8,
    minOrder: 20,
    inStock: false,
    lastUpdated: '4 hours ago',
    priceChange: 'up',
    priceChangePercent: 3
  },
  {
    id: '4',
    supplier: 'Daily Harvest Co.',
    location: 'Nashik, MH',
    distance: 15.3,
    price: 17,
    unit: 'kg',
    quality: 3.8,
    minOrder: 100,
    inStock: true,
    lastUpdated: '6 hours ago',
    priceChange: 'down',
    priceChangePercent: 8
  }
];

const commonItems = [
  'Potatoes', 'Onions', 'Tomatoes', 'Rice', 'Wheat Flour', 
  'Cooking Oil', 'Spices Mix', 'Green Vegetables', 'Milk', 'Eggs'
];

export function PriceComparisonTool() {
  const [filters, setFilters] = useState<SearchFilters>({
    item: '',
    location: 'Pune, MH',
    maxDistance: '10',
    sortBy: 'price',
    minQuality: '3'
  });
  
  const [searchResults, setSearchResults] = useState<PriceComparison[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!filters.item) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredResults = samplePriceData
        .filter(item => item.quality >= Number(filters.minQuality))
        .filter(item => item.distance <= Number(filters.maxDistance))
        .sort((a, b) => {
          switch (filters.sortBy) {
            case 'price':
              return a.price - b.price;
            case 'quality':
              return b.quality - a.quality;
            case 'distance':
              return a.distance - b.distance;
            default:
              return 0;
          }
        });
      
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 1500);
  };

  const getBestPrice = () => {
    return searchResults.length > 0 ? Math.min(...searchResults.map(item => item.price)) : 0;
  };

  const getAveragePrice = () => {
    if (searchResults.length === 0) return 0;
    return searchResults.reduce((sum, item) => sum + item.price, 0) / searchResults.length;
  };

  const renderPriceChange = (change: 'up' | 'down' | 'stable', percent: number) => {
    if (change === 'stable') return <span className="text-gray-500 text-xs">No change</span>;
    
    const Icon = change === 'up' ? TrendingUp : TrendingDown;
    const color = change === 'up' ? 'text-red-500' : 'text-green-500';
    
    return (
      <div className={`flex items-center gap-1 ${color} text-xs`}>
        <Icon className="h-3 w-3" />
        <span>{percent}%</span>
      </div>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5 text-blue-600" />
            Price Comparison Tool
          </CardTitle>
          <CardDescription>
            Compare prices across multiple suppliers to find the best deals in your area
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Compare Prices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Item Selection */}
            <div className="space-y-2">
              <Label htmlFor="item">Item to Compare</Label>
              <Select value={filters.item} onValueChange={(value) => setFilters({...filters, item: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an item" />
                </SelectTrigger>
                <SelectContent>
                  {commonItems.map((item) => (
                    <SelectItem key={item} value={item.toLowerCase()}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Your Location</Label>
              <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pune, MH">Pune, MH</SelectItem>
                  <SelectItem value="Mumbai, MH">Mumbai, MH</SelectItem>
                  <SelectItem value="Nashik, MH">Nashik, MH</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Max Distance */}
            <div className="space-y-2">
              <Label htmlFor="distance">Max Distance (km)</Label>
              <Select value={filters.maxDistance} onValueChange={(value) => setFilters({...filters, maxDistance: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="20">20 km</SelectItem>
                  <SelectItem value="50">50 km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <Label htmlFor="sort">Sort By</Label>
              <Select value={filters.sortBy} onValueChange={(value) => setFilters({...filters, sortBy: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Lowest Price</SelectItem>
                  <SelectItem value="quality">Highest Quality</SelectItem>
                  <SelectItem value="distance">Nearest Distance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Min Quality */}
            <div className="space-y-2">
              <Label htmlFor="quality">Min Quality Rating</Label>
              <Select value={filters.minQuality} onValueChange={(value) => setFilters({...filters, minQuality: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button 
                onClick={handleSearch} 
                disabled={!filters.item || isSearching}
                className="w-full"
              >
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? 'Searching...' : 'Compare Prices'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Summary */}
      {hasSearched && searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Best Price</p>
                <p className="text-2xl font-bold text-green-600">₹{getBestPrice()}/{searchResults[0]?.unit}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Average Price</p>
                <p className="text-2xl font-bold text-blue-600">₹{getAveragePrice().toFixed(0)}/{searchResults[0]?.unit}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Suppliers Found</p>
                <p className="text-2xl font-bold text-purple-600">{searchResults.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search Results */}
      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle>
              Price Comparison Results {filters.item && `for ${filters.item}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSearching ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Searching for best prices...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden md:table-cell">Quality</TableHead>
                      <TableHead className="hidden lg:table-cell">Distance</TableHead>
                      <TableHead className="hidden lg:table-cell">Min Order</TableHead>
                      <TableHead className="hidden sm:table-cell">Stock</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{item.supplier}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="h-3 w-3" />
                              {item.location}
                            </div>
                            <SupplierBadges supplierId={item.id} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">₹{item.price}/{item.unit}</span>
                              {index === 0 && <Badge className="bg-green-500 text-white text-xs">Best Price</Badge>}
                            </div>
                            {renderPriceChange(item.priceChange, item.priceChangePercent)}
                            <div className="text-xs text-gray-500">Updated {item.lastUpdated}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {renderStars(item.quality)}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm">{item.distance} km</span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm">{item.minOrder} {item.unit}</span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant={item.inStock ? "default" : "secondary"}>
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" disabled={!item.inStock}>
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No suppliers found matching your criteria. Try adjusting your filters.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
