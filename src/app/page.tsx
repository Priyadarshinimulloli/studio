
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-6">
          <div className="mr-4 flex">
            <a href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">BhojanConnect</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <Button asChild variant="ghost">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    A Trusted Raw Material Marketplace for Street Food Vendors
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    BhojanConnect helps you discover reliable suppliers, get fair prices, and manage your inventory with ease.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/dashboard">Explore the Dashboard</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                data-ai-hint="indian street food"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From AI-powered recommendations to transparent trust scores, we've got you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-card transition-all">
                <h3 className="text-xl font-bold">AI Recommendations</h3>
                <p className="text-muted-foreground">Get smart suggestions for suppliers based on your menu, location, and quality needs.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-card transition-all">
                <h3 className="text-xl font-bold">Trust Score Generator</h3>
                <p className="text-muted-foreground">Make informed decisions with our AI-generated trust scores for every supplier.</p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg hover:bg-card transition-all">
                <h3 className="text-xl font-bold">Live Supplier Listings</h3>
                <p className="text-muted-foreground">Browse a real-time marketplace of raw material suppliers in your area.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 BhojanConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}
