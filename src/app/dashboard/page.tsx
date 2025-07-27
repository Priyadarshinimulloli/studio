import LiveMapGeoTracking from '@/components/LiveMapGeoTracking';

import { AiRecommender } from '@/components/ai-recommender';
import GroupOrderMeter from '@/components/group-order-meter';
import SupplierRecommendations from '@/components/supplier-recommendations';
import OrderStatusTracker from '@/components/order-status-tracker';
import VendorAlerts from '@/components/vendor-alerts';
import { Chat } from '@/components/chat';
import { DashboardHeader } from '@/components/dashboard-header';
import { OrderHistory } from '@/components/order-history';
import { PriceComparisonTool } from '@/components/price-comparison';
import { SupplierListings } from '@/components/supplier-listings';
import { TrustScoreGenerator } from '@/components/trust-score-generator';
import { Wishlist } from '@/components/wishlist';
import { IssueReporting } from '@/components/issue-reporting';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-8 grid-cols-1 xl:grid-cols-5">
          <div className="xl:col-span-3 space-y-8">
            <OrderStatusTracker />
            <GroupOrderMeter />
            <div className="mt-6">
              <SupplierRecommendations />
            </div>
            <VendorAlerts />
            <AiRecommender />
            <PriceComparisonTool />
            <SupplierListings />
          </div>
          <div className="xl:col-span-2 space-y-8">
            <TrustScoreGenerator />
            <IssueReporting vendorId="VENDOR-001" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
              <Wishlist />
              <OrderHistory />
            </div>
            <Chat />
          </div>
        </div>

        {/* Live Map placed at the end */}
        <div className="mt-10 h-[480px] w-full rounded-lg shadow-lg overflow-hidden">
          <LiveMapGeoTracking />
        </div>
      </main>
    </div>
  );
}
