import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    priceRange: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('shortDescription', formData.shortDescription);
        data.append('priceRange', formData.priceRange);
        if (imageFile) {
            data.append('image', imageFile);
        }

        await axios.post('http://localhost:8000/api/v1/products/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        navigate('/dashboard/products');
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to add product');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/products')}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
      </div>

      <Card className="max-w-2xl border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" placeholder="e.g. Wedding Photography Package" required onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange">Price Range</Label>
              <Input id="priceRange" name="priceRange" placeholder="e.g. $1000 - $2000" required onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Description</Label>
               <textarea
                id="shortDescription"
                name="shortDescription"
                className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-100 transition-colors"
                placeholder="Describe your product..."
                required
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <Input id="image" name="image" type="file" onChange={handleFileChange} />
                <p className="text-xs text-muted-foreground">Upload a clear image of your product.</p>
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

            <div className="flex justify-end gap-4 pt-4">
                 <Button type="button" variant="outline" onClick={() => navigate('/dashboard/products')}>Cancel</Button>
                 <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Product
                 </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
