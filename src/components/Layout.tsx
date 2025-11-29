import { Package, ShoppingCart, LayoutDashboard, Users } from "lucide-react";
import { NavLink } from "./NavLink";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-sidebar-foreground flex items-center gap-2">
            <Package className="h-7 w-7 text-sidebar-primary" />
            SupplyChainPro
          </h1>
        </div>
        <nav className="px-4 space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </NavLink>
          <NavLink
            to="/inventory"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <Package className="h-5 w-5" />
            Inventory
          </NavLink>
          <NavLink
            to="/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </NavLink>
          <NavLink
            to="/customers"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <Users className="h-5 w-5" />
            Customers
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
