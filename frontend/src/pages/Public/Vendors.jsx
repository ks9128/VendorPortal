import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/vendors/');
        setVendors(response.data.data);
      } catch (error) {
        console.error("Failed to fetch vendors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? vendor.businessCategory === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(vendors.map(v => v.businessCategory))];

  return (
    <div className="container mx-auto px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Find Vendors</h1>
        <div className="flex gap-4 w-full md:w-auto">
             <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <select 
             className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
             value={categoryFilter}
             onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="">All Categories</option>
                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card key={vendor._id} className="hover:shadow-lg transition-shadow border-slate-200">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-500">
                    {vendor.vendorName[0]}
                </div>
                <div>
                    <CardTitle className="text-lg">{vendor.vendorName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{vendor.businessCategory}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 line-clamp-2">{vendor.description || "No description provided."}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                    <span className="font-medium text-slate-900">{vendor.city}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/vendors/${vendor._id}`} className="w-full">
                    <Button className="w-full">View Profile</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
          {filteredVendors.length === 0 && (
             <p className="col-span-full text-center text-muted-foreground py-12">No vendors found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Vendors;
