import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader2, MapPin, Mail, Phone, MessageSquare, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge"; // Ensure Badge component exists or use simple span
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vendorRes, productRes, reviewRes] = await Promise.all([
          axios.get(`/vendors/profile/${vendorId}`),
          axios.get(`/products/vendor/${vendorId}`),
          axios.get(`/reviews/${vendorId}`)
        ]);
        setVendor(vendorRes.data.data);
        setProducts(productRes.data.data);
        setReviews(reviewRes.data.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [vendorId]);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;
  }

  if (!vendor) {
    return <div className="text-center py-20 text-muted-foreground">Vendor not found.</div>;
  }

  // Calculate average rating from fetched reviews if not available in vendor object
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : (vendor.averageRating || 0).toFixed(1);

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Vendor Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-12">
        <div className="h-48 bg-slate-900/5 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="h-24 w-24 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-slate-500">
              {vendor.vendorName ? vendor.vendorName[0] : 'V'}
            </div>
          </div>
        </div>
        <div className="pt-16 pb-8 px-8">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">{vendor.vendorName}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{vendor.businessCategory}</span>
                <div className="flex items-center text-muted-foreground text-sm gap-1">
                  <MapPin className="h-4 w-4" /> {vendor.city}
                </div>
                {reviews.length > 0 && (
                  <div className="flex items-center text-yellow-600 font-medium text-sm gap-1 ml-2">
                    <Star className="h-4 w-4 fill-current" /> {averageRating} ({reviews.length} reviews)
                  </div>
                )}
              </div>
              <p className="mt-4 text-slate-600 max-w-2xl">{vendor.description}</p>
            </div>
            <div className="flex gap-4">
              <Link to={`/vendors/${vendorId}/feedback`}>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-6 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="h-4 w-4" />
              <span>{vendor.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="h-4 w-4" />
              <span>{vendor.contactNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Offered Products</h2>
        {products.length === 0 ? (
          <p className="text-muted-foreground">This vendor hasn't added any products yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Card key={product._id} className="overflow-hidden border-slate-200">
                <div className="aspect-square bg-slate-100 relative">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">No Image</div>
                  )}
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.shortDescription}</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0 font-medium text-primary">
                  {product.priceRange}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Client Reviews</h2>
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed text-muted-foreground">
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map(review => (
              <Card key={review._id} className="border-slate-100">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div>
                    <CardTitle className="text-base font-semibold">{review.clientName}</CardTitle>
                    <p className="text-sm text-slate-500">{review.projectName}</p>
                  </div>
                  <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-sm font-medium">
                    <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                    {review.rating}.0
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProfile;
