import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, BarChart3, FileText, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
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
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
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

          <Card className="p-6 hover:shadow-lg transition-shadow border-primary/20 bg-primary/5">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2 text-primary">Supplier Academy</h3>
            <p className="text-muted-foreground text-sm mb-4">Learn and grow your business</p>
            <Link to="/supplier-academy">
              <Button className="w-full bg-primary hover:bg-primary-dark">
                Access Academy
              </Button>
            </Link>
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
    </div>
  );
};

export default Index;
