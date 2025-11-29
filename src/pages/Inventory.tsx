import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AddProductDialog } from "@/components/AddProductDialog";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    { id: 1, name: "Wireless Mouse", sku: "WM-001", category: "Electronics", stock: 145, price: 29.99, status: "In Stock" },
    { id: 2, name: "USB Cable", sku: "UC-002", category: "Accessories", stock: 8, price: 9.99, status: "Low Stock" },
    { id: 3, name: "Laptop Stand", sku: "LS-003", category: "Furniture", stock: 0, price: 49.99, status: "Out of Stock" },
    { id: 4, name: "Keyboard", sku: "KB-004", category: "Electronics", stock: 67, price: 79.99, status: "In Stock" },
    { id: 5, name: "Monitor", sku: "MN-005", category: "Electronics", stock: 23, price: 299.99, status: "In Stock" },
    { id: 6, name: "Desk Lamp", sku: "DL-006", category: "Furniture", stock: 5, price: 39.99, status: "Low Stock" },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "In Stock") return <Badge className="bg-success">{status}</Badge>;
    if (status === "Low Stock") return <Badge className="bg-warning">{status}</Badge>;
    return <Badge variant="destructive">{status}</Badge>;
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
            <p className="text-muted-foreground mt-2">Manage your products and stock levels</p>
          </div>
          <AddProductDialog />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Products</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Inventory;
