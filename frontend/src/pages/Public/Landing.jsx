import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Store, TrendingUp, Star, ArrowRight } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Your Business,
              <span className="block text-primary mt-2">Supercharged</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find trusted vendors, contractors, and suppliers. Browse verified businesses ready to serve you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/vendors">
                <Button size="lg" className="px-12 h-16 text-xl shadow-lg hover:shadow-xl w-full sm:w-auto">
                  Browse All Vendors
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {user ? (
              <div className="flex items-center gap-4 justify-center pt-6 text-sm text-muted-foreground">
                <Link to="/dashboard">
                  <Button variant="default" size="lg">Go to Dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 justify-center pt-6 text-sm text-muted-foreground">
                <span>Are you a vendor?</span>
                <Link to="/auth/register">
                  <Button variant="link" className="px-0">Register</Button>
                </Link>
                <span>·</span>
                <Link to="/auth/login">
                  <Button variant="link" className="px-0">Sign In</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-muted-foreground text-lg">Powerful tools designed for modern vendors</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Product Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Easily manage your inventory with our intuitive dashboard and real-time updates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sales Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track your performance with detailed insights and analytics to grow your business.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Reviews</h3>
              <p className="text-muted-foreground leading-relaxed">
                Build trust and credibility with authentic customer reviews and ratings.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
