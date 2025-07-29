import { BarChart3, FileText, Users, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SidebarLayout from "@/components/SidebarLayout";

const Index = () => {
  return (
    <SidebarLayout>
      <div className="p-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Welcome to Supplier Portal</h2>
          <p className="text-xl text-muted-foreground mb-8">Manage your business and grow with our comprehensive tools</p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="p-3 bg-blue-50 rounded-lg w-fit mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Dashboard</h3>
            <p className="text-muted-foreground text-sm">View your performance metrics</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="p-3 bg-green-50 rounded-lg w-fit mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Orders</h3>
            <p className="text-muted-foreground text-sm">Manage your orders efficiently</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="p-3 bg-purple-50 rounded-lg w-fit mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Products</h3>
            <p className="text-muted-foreground text-sm">Manage your product catalog</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="p-3 bg-orange-50 rounded-lg w-fit mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Analytics</h3>
            <p className="text-muted-foreground text-sm">View detailed analytics</p>
          </Card>
        </div>

        {/* Academy Highlight Section */}
        <section className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 text-white text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-4">New: Supplier Academy</h3>
          <p className="text-lg mb-6 opacity-90">
            Ab har supplier banega khud mukhtar! Access comprehensive educational content, 
            tutorials, and resources to master your supplier journey.
          </p>
          <Link to="/supplier-academy">
            <Button variant="secondary" size="lg">
              Explore Academy
            </Button>
          </Link>
        </section>
      </div>
    </SidebarLayout>
  );
};

export default Index;
