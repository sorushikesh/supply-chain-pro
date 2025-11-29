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
import { AddCustomerDialog } from "@/components/AddCustomerDialog";

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 555-0101", company: "Tech Corp", orders: 12, total: 3249.99, status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 555-0102", company: "Design Studio", orders: 8, total: 2159.99, status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "+1 555-0103", company: "Marketing Plus", orders: 15, total: 4399.99, status: "Active" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", phone: "+1 555-0104", company: "Startup Inc", orders: 3, total: 879.99, status: "Inactive" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", phone: "+1 555-0105", company: "Consulting LLC", orders: 20, total: 6329.99, status: "Active" },
    { id: 6, name: "Diana Davis", email: "diana@example.com", phone: "+1 555-0106", company: "Retail Group", orders: 10, total: 2789.99, status: "Active" },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "Active") return <Badge className="bg-success">{status}</Badge>;
    return <Badge variant="secondary">{status}</Badge>;
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
            <p className="text-muted-foreground mt-2">Manage your customer database and relationships</p>
          </div>
          <AddCustomerDialog />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Customers</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
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
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.company}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell className="font-medium">${customer.total.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
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

export default Customers;
