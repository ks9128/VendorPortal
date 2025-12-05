import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

const Reviews = () => {
    // Mock reviews
  const reviews = [
    { id: 1, client: "Alice Smith", project: "Wedding 2024", rating: 5, comment: "Absolutely amazing service! The flowers were stunning." },
    { id: 2, client: "John Doe", project: "Corporate Event", rating: 4, comment: "Great food, just a bit late on delivery." },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Client Reviews</h2>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-slate-100 shadow-sm">
            <CardHeader className="pb-2">
               <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{review.client}</CardTitle>
                    <p className="text-sm text-muted-foreground">{review.project}</p>
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
    </div>
  );
};

export default Reviews;
