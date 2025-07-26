import { AiRecommender } from '@/components/ai-recommender';
import { Chat } from '@/components/chat';
import { DashboardHeader } from '@/components/dashboard-header';
import { OrderHistory } from '@/components/order-history';
import { SupplierListings } from '@/components/supplier-listings';
import { TrustScoreGenerator } from '@/components/trust-score-generator';
import { Wishlist } from '@/components/wishlist';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-8 grid-cols-1 xl:grid-cols-5">
          <div className="xl:col-span-3 space-y-8">
            <AiRecommender />
            <SupplierListings />
          </div>
          <div className="xl:col-span-2 space-y-8">
            <TrustScoreGenerator />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
              <Wishlist />
              <OrderHistory />
            </div>
            <Chat />
          </div>
        </div>
      </main>
    </div>
  );
}
