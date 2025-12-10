import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag, MessageSquare, Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    productCount: 0,
    sales: 0,
    numberOfReviews: 0,
    averageRating: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/vendors/stats');
        setStats(response.data.data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Products", value: stats.productCount || 0, icon: Package, change: "+2 this week", color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Profile Views", value: stats.sales || 0, icon: ArrowUpRight, change: "+12%", color: "text-emerald-500", bg: "bg-emerald-50" }, // Mocked as Sales/Views
    { title: "Active Reviews", value: stats.numberOfReviews || 0, icon: MessageSquare, change: "+3 new", color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Average Rating", value: stats.averageRating?.toFixed(1) || "0.0", icon: Star, change: "+0.2", color: "text-yellow-500", bg: "bg-yellow-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
             <div className="h-[200px] flex items-center justify-center text-slate-400 bg-slate-50 rounded-md">
                Activity Chart Placeholder
             </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Manage your store efficiently.</p>
                <div className="grid grid-cols-1 gap-2">
                    <Button asChild className="w-full justify-start" variant="outline">
                        <Link to="/dashboard/products/add">
                            <Package className="mr-2 h-4 w-4" /> Add New Product
                        </Link>
                    </Button>
                    <Button asChild className="w-full justify-start" variant="outline">
                        <Link to="/dashboard/profile">
                            <ArrowUpRight className="mr-2 h-4 w-4" /> Update Profile
                        </Link>
                    </Button>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
