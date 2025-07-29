import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Package, 
  ShoppingCart, 
  BarChart3, 
  FileText, 
  Edit3, 
  MessageSquare, 
  Store, 
  Bell, 
  Download,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const location = useLocation();
  
  const navigation = [
    {
      title: "Order Processing",
      items: [
        { name: "Orders", href: "/orders", icon: Package },
        { name: "Sales", href: "/sales", icon: BarChart3 },
      ]
    },
    {
      title: "Product Management", 
      items: [
        { name: "Products", href: "/products", icon: Package },
        { name: "Listings", href: "/listings", icon: Edit3 },
      ]
    },
    {
      title: "Customer Feedback",
      items: [
        { name: "Reviews", href: "/reviews", icon: MessageSquare },
      ]
    },
    {
      title: "Other",
      items: [
        { name: "Manage Shop", href: "/manage-shop", icon: Store },
        { name: "Notifications", href: "/notifications", icon: Bell, badge: "99+" },
        { name: "Source Now", href: "/source-now", icon: Download },
        { name: "Supplier Academy", href: "/supplier-academy", icon: GraduationCap },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#4338ca] text-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">✓</span>
            </div>
            <h1 className="text-lg font-semibold">Supplier Portal</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium text-white/70 mb-3">{section.title}</h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-white/20 text-white"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Markaz Supplier Portal</h1>
                <p className="text-sm text-muted-foreground">Your gateway to success</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;