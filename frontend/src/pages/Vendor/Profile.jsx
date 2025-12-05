import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import { Loader2, Save } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  // Initialize with user data or empty strings to avoid uncontrolled input warnings
  const [formData, setFormData] = useState({
    vendorName: user?.vendorName || '',
    ownerName: user?.ownerName || '',
    contactNumber: user?.contactNumber || '',
    city: user?.city || '',
    description: user?.description || '',
    businessCategory: user?.businessCategory || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    try {
      // Assuming endpoint is PATCH /vendors/update-account
      const response = await axios.patch('/vendors/update-account', formData);
      // Update local user state
      // setUser(response.data.data); // Need to expose setUser from context if we want to update it
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      // set error state if needed
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>

      <Card className="max-w-2xl border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle>Vendor Information</CardTitle>
          <CardDescription>Update your business details and public profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                <Label htmlFor="vendorName">Business Name</Label>
                <Input id="vendorName" name="vendorName" value={formData.vendorName} onChange={handleChange} />
                </div>
                
                <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea 
                        className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-100 transition-colors"
                        id="description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                    />
                </div>
            </div>

            {success && <p className="text-sm text-green-600 font-medium">{success}</p>}

            <div className="flex justify-end pt-4">
                 <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                 </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card className="max-w-2xl border-slate-100 shadow-sm">
        <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your password and account security.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Password change functionality coming soon.</p>
                <Button variant="outline" disabled>Change Password</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
