import { useState } from "react";
import { Search, Play, FileText, Bell, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'document' | 'banner';
  category: string;
  description: string;
  url?: string;
  duration?: string;
  isNew?: boolean;
}

const SupplierAcademy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", count: 65 },
    { id: "ads", name: "Ads", count: 32 },
    { id: "listings", name: "Listings", count: 28 },
    { id: "onboarding", name: "Onboarding", count: 15 },
    { id: "growth", name: "Business Growth", count: 12 },
    { id: "optimization", name: "Optimization", count: 18 }
  ];

  const featuredContent: ContentItem[] = [
    {
      id: "1",
      title: "Creating High-Converting Product Ads",
      type: "video",
      category: "ads",
      description: "Learn the secrets of creating ads that actually convert customers",
      duration: "12 mins",
      isNew: true
    },
    {
      id: "2", 
      title: "Product Listing Optimization Guide",
      type: "document",
      category: "listings",
      description: "Complete guide to optimize your product listings for maximum visibility"
    },
    {
      id: "3",
      title: "Supplier Onboarding Checklist",
      type: "document", 
      category: "onboarding",
      description: "Step-by-step checklist to get started as a successful supplier"
    }
  ];

  const bannerUpdate = {
    title: "Latest Update",
    message: "New ad optimization guidelines and listing best practices added. Check updates section for details.",
    isNew: true
  };

  const filteredCategories = categories.filter(cat => 
    selectedCategory === "all" || cat.id === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Supplier Academy</h1>
                  <p className="text-sm text-muted-foreground">Ab har supplier banega khud mukhtar!</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary-dark">
                <Home className="w-4 h-4 mr-2" />
                Back to Main Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Welcome to Markaz Supplier Academy</h2>
            <p className="text-lg mb-6 opacity-90">
              Ab har supplier banega khud mukhtar! Access our comprehensive educational 
              content designed to help you master ads, listings, onboarding, and business 
              growth on the Markaz platform.
            </p>
            <div className="flex gap-4">
              <Button variant="secondary" size="lg">
                Browse Content
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Play className="w-4 h-4 mr-2" />
                Watch Introduction
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Update Banner */}
        {bannerUpdate.isNew && (
          <section className="mb-8">
            <Card className="border-primary/20 bg-primary/5">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{bannerUpdate.title}</h3>
                    <p className="text-muted-foreground">{bannerUpdate.message}</p>
                  </div>
                  {bannerUpdate.isNew && (
                    <Badge className="bg-primary text-primary-foreground">New</Badge>
                  )}
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Browse by Category */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(1).map((category) => (
              <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      {category.id === 'ads' && <Play className="w-6 h-6 text-primary" />}
                      {category.id === 'listings' && <FileText className="w-6 h-6 text-primary" />}
                      {category.id === 'onboarding' && <Home className="w-6 h-6 text-primary" />}
                      {category.id === 'growth' && <ChevronRight className="w-6 h-6 text-primary" />}
                      {category.id === 'optimization' && <Search className="w-6 h-6 text-primary" />}
                    </div>
                    <Badge variant="secondary">{category.count} items</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{category.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.id === 'ads' && "Learn how to create effective ads and marketing strategies."}
                    {category.id === 'listings' && "Master product listing optimization and visibility techniques."}
                    {category.id === 'onboarding' && "Get started with step-by-step onboarding guides."}
                    {category.id === 'growth' && "Strategies to grow your business on the platform."}
                    {category.id === 'optimization' && "Optimize your presence for better performance."}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    Explore <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Content */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredContent.map((item) => (
              <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {item.type === 'video' && <Play className="w-6 h-6 text-primary" />}
                      {item.type === 'document' && <FileText className="w-6 h-6 text-primary" />}
                    </div>
                    <div className="flex gap-2">
                      {item.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                      <Badge variant="outline" className="capitalize">{item.category}</Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  {item.duration && (
                    <p className="text-xs text-primary font-medium mb-4">{item.duration}</p>
                  )}
                  <div className="flex items-center text-primary font-medium text-sm">
                    {item.type === 'video' ? 'Watch Now' : 'Read More'} 
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupplierAcademy;