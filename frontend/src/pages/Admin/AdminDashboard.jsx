import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('/vendors/');
        setVendors(response.data.data);
      } catch (error) {
        console.error("Failed to fetch vendors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  if (loading) {
     return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="container mx-auto px-8 py-12 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Registered Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor._id}>
                  <TableCell className="font-medium">{vendor.vendorName}</TableCell>
                  <TableCell>{vendor.businessCategory}</TableCell>
                  <TableCell>{vendor.city}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>
                    <Link to={`/vendors/${vendor._id}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
