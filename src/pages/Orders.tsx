import { Layout } from "@/components/Layout";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddOrderDialog } from "@/components/AddOrderDialog";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const orders = [
    { id: 1001, customer: "John Doe", date: "2024-01-15", items: 3, total: 249.99, status: "Delivered" },
    { id: 1002, customer: "Jane Smith", date: "2024-01-16", items: 2, total: 159.99, status: "Pending" },
    { id: 1003, customer: "Bob Johnson", date: "2024-01-16", items: 5, total: 399.99, status: "Processing" },
    { id: 1004, customer: "Alice Brown", date: "2024-01-17", items: 1, total: 79.99, status: "Pending" },
    { id: 1005, customer: "Charlie Wilson", date: "2024-01-17", items: 4, total: 329.99, status: "Delivered" },
    { id: 1006, customer: "Diana Davis", date: "2024-01-18", items: 2, total: 189.99, status: "Processing" },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "Delivered") return <Badge className="bg-success">{status}</Badge>;
    if (status === "Processing") return <Badge className="bg-warning">{status}</Badge>;
    return <Badge variant="secondary">{status}</Badge>;
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
            <p className="text-muted-foreground mt-2">Track and manage all customer orders</p>
          </div>
          <AddOrderDialog />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>All Orders</CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="font-medium">${order.total}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Select defaultValue={order.status.toLowerCase()}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
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

export default Orders;
