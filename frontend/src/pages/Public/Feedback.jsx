import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, Star } from 'lucide-react';

const Feedback = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    rating: 5,
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
      setFormData({ ...formData, rating });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:8000/api/v1/reviews/${vendorId}`, formData);
      navigate(`/vendors/${vendorId}`); // Request said /vendor/{vendorId}
    } catch (error) {
      console.error("Failed to submit review", error);
      // Handle error display
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-8 py-12 flex justify-center">
      <Card className="w-full max-w-lg shadow-lg border-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Share Your Experience</CardTitle>
          <CardDescription>Rate your experience with this vendor.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="clientName">Your Name</Label>
              <Input id="clientName" name="clientName" required value={formData.clientName} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" name="projectName" placeholder="e.g. Wedding Catering" required value={formData.projectName} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className={`p-1 rounded-full transition-colors hover:bg-slate-100 ${star <= formData.rating ? 'text-yellow-500' : 'text-slate-300'}`}
                    >
                        <Star className="h-8 w-8 fill-current" />
                    </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Comments</Label>
               <textarea
                id="comment"
                name="comment"
                className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-100 transition-colors"
                placeholder="Tell us more about the service..."
                required
                value={formData.comment}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
