import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/reviews/${user._id}`);
        setReviews(response.data.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchReviews();
    }
  }, [user]);

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Client Reviews ({reviews.length})</h2>

      {reviews.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
          <p>No reviews yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review._id} className="border-slate-100 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{review.clientName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{review.projectName}</p>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-yellow-700 font-medium text-sm">
                    <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                    {review.rating}.0
                  </div>
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
  );
};

export default Reviews;
