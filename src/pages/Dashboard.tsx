import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: "1,234",
      icon: Package,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Pending Orders",
      value: "45",
      icon: ShoppingCart,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Low Stock Items",
      value: "23",
      icon: AlertCircle,
      trend: "-5%",
      trendUp: false,
    },
    {
      title: "Revenue",
      value: "$45,231",
      icon: TrendingUp,
      trend: "+23%",
      trendUp: true,
    },
  ];

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's your business overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-sm mt-2 ${stat.trendUp ? 'text-success' : 'text-destructive'}`}>
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Order #{1000 + i}</p>
                      <p className="text-sm text-muted-foreground">Customer Name {i}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">${(Math.random() * 500 + 100).toFixed(2)}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
                        Pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Product Name {i}</p>
                      <p className="text-sm text-muted-foreground">SKU: PRD-{1000 + i}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-destructive">{Math.floor(Math.random() * 10)} units</p>
                      <p className="text-xs text-muted-foreground">Low stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
