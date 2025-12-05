import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
        fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
        const response = await axios.get(`/products/vendor/${user._id}`);
        setProducts(response.data.data);
    } catch (error) {
        console.error("Failed to fetch products", error);
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
        await axios.delete(`/products/${productId}`);
        setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
        console.error("Failed to delete product", error);
    }
  };

  if (loading) {
     return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Link to="/dashboard/products/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      <Card className="border-slate-100 shadow-sm">
        <CardHeader>
           <CardTitle>Manage Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
             <div className="text-center py-8 text-muted-foreground">
                No products found. Start by adding one!
             </div>
          ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                     {product.image ? (
                        <img src={product.image} alt={product.name} className="h-10 w-10 rounded object-cover" />
                     ) : (
                        <div className="h-10 w-10 rounded bg-slate-200" />
                     )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{product.shortDescription}</TableCell>
                  <TableCell>{product.priceRange}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Link to={`/dashboard/products/edit/${product._id}`}>
                            <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(product._id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
