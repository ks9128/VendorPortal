import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    priceRange: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // We can fetch from vendor lists or if we had a single product endpoint
        // Since we don't have a specific "get single product" endpoint exposed publicly except via vendor list,
        // we might fitler from the vendor list or we should better expose "get single product".
        // Let's quickly add "get single product" or just reuse the vendor list call and filter client-side for simplicity/speed
        // as we are pressed for time, but a dedicated endpoint is cleaner. 
        // Wait, 'getVendorProducts' gets all. Let's just fetch all and find one. 
        // Or better, assume I added getProductById? No I didn't. 
        // I will use client side filtering from the vendor's product list for now.
        const response = await axios.get(`http://localhost:8000/api/v1/products/vendor/${user._id}`);
        const product = response.data.data.find(p => p._id === productId);
        
        if (product) {
            setFormData({
                name: product.name,
                shortDescription: product.shortDescription,
                priceRange: product.priceRange
            });
        } else {
            setError("Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchProduct();
  }, [productId, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
        await axios.put(`http://localhost:8000/api/v1/products/${productId}`, formData);
        navigate('/dashboard/products');
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to update product');
    } finally {
        setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/products')}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
      </div>

      <Card className="max-w-2xl border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange">Price Range</Label>
              <Input id="priceRange" name="priceRange" value={formData.priceRange} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Description</Label>
               <textarea
                id="shortDescription"
                name="shortDescription"
                className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-100 transition-colors"
                value={formData.shortDescription}
                onChange={handleChange}
                required
              />
            </div>
            
            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

            <div className="flex justify-end gap-4 pt-4">
                 <Button type="button" variant="outline" onClick={() => navigate('/dashboard/products')}>Cancel</Button>
                 <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                 </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;
