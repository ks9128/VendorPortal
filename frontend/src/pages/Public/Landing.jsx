import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center px-8">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Streamline Your Vendor Management
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A powerful, modern platform for vendors to manage products, track reviews, and grow their business. 
            Join thousands of successful vendors today.
          </p>
          <div className="space-x-4">
            <Link to="/auth/register">
              <Button size="lg" className="px-8">Get Started</Button>
            </Link>
            <Link to="/vendors">
              <Button size="lg" variant="secondary" className="px-8">Browse Vendors</Button>
            </Link>
            <Link to="/auth/login">
              <Button size="lg" variant="outline" className="px-8">Login</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 px-8 rounded-3xl my-8">
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Analytics</h3>
                <p className="text-sm text-muted-foreground">Track your sales and performance with detailed charts.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Product Management</h3>
                <p className="text-sm text-muted-foreground">Easy-to-use tools for inventory and product listing.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Customer Reviews</h3>
                <p className="text-sm text-muted-foreground">Manage feedback and build trust with your customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
