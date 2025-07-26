'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Star, Truck, Users, Zap } from 'lucide-react';

interface VerificationBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  verified: boolean;
}

interface VerificationBadgesProps {
  supplierId?: string;
  supplierName?: string;
  badges?: VerificationBadge[];
  showDescription?: boolean;
}

const defaultBadges: VerificationBadge[] = [
  {
    id: 'quality-assured',
    name: 'Quality Assured',
    description: 'Verified quality standards and certifications',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100',
    verified: true
  },
  {
    id: 'trusted-supplier',
    name: 'Trusted Supplier',
    description: 'High trust score based on vendor ratings',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    verified: true
  },
  {
    id: 'fast-delivery',
    name: 'Fast Delivery',
    description: 'Consistent on-time delivery record',
    icon: Truck,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100',
    verified: true
  },
  {
    id: 'bulk-specialist',
    name: 'Bulk Orders',
    description: 'Specializes in bulk orders with discounts',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100',
    verified: false
  },
  {
    id: 'premium-quality',
    name: 'Premium Quality',
    description: '5-star average rating for quality',
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 hover:bg-yellow-100',
    verified: true
  },
  {
    id: 'instant-response',
    name: 'Quick Response',
    description: 'Responds to inquiries within 30 minutes',
    icon: Zap,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 hover:bg-indigo-100',
    verified: false
  }
];

export function VerificationBadges({ 
  supplierId, 
  supplierName = "Supplier", 
  badges = defaultBadges,
  showDescription = false 
}: VerificationBadgesProps) {
  const verifiedBadges = badges.filter(badge => badge.verified);

  if (showDescription) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Verification Badges for {supplierName}
          </CardTitle>
          <CardDescription>
            These badges indicate verified capabilities and quality standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    badge.verified ? badge.bgColor : 'bg-gray-50'
                  } ${badge.verified ? '' : 'opacity-60'}`}
                >
                  <IconComponent 
                    className={`h-5 w-5 mt-0.5 ${
                      badge.verified ? badge.color : 'text-gray-400'
                    }`} 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium text-sm ${
                        badge.verified ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {badge.name}
                      </span>
                      {badge.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${
                      badge.verified ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {badge.description}
                    </p>
                    {!badge.verified && (
                      <span className="inline-block mt-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        Not Verified
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Compact view for supplier listings
  return (
    <div className="flex flex-wrap gap-1">
      {verifiedBadges.slice(0, 3).map((badge) => {
        const IconComponent = badge.icon;
        return (
          <Badge 
            key={badge.id} 
            variant="secondary" 
            className={`${badge.bgColor} ${badge.color} border-0 text-xs`}
          >
            <IconComponent className="h-3 w-3 mr-1" />
            {badge.name}
          </Badge>
        );
      })}
      {verifiedBadges.length > 3 && (
        <Badge variant="outline" className="text-xs">
          +{verifiedBadges.length - 3} more
        </Badge>
      )}
    </div>
  );
}

// Component for supplier profile page
export function SupplierVerificationProfile({ supplierId, supplierName }: { supplierId: string; supplierName: string }) {
  return (
    <VerificationBadges 
      supplierId={supplierId}
      supplierName={supplierName}
      showDescription={true}
    />
  );
}

// Component for supplier listings
export function SupplierBadges({ supplierId }: { supplierId: string }) {
  return (
    <VerificationBadges 
      supplierId={supplierId}
      showDescription={false}
    />
  );
}
