import { useState } from "react";
import { Search, Play, FileText, Users, ChevronRight, AlertTriangle, Package, Bell, Menu, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContentData } from "@/hooks/useContentData";
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'document' | 'banner';
  category: string;
  description: string;
  youtube_url?: string;
  duration?: string;
}

const SupplierAcademy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { 
    content, 
    categories, 
    loading, 
    error, 
    getFeaturedContent, 
    getContentByCategory,
    openYouTubeVideo,
    refreshContent 
  } = useContentData();
  const { toast } = useToast();

  const handleRefresh = async () => {
    await refreshContent();
    toast({
      title: "Content Updated",
      description: "Latest content has been loaded from Google Sheets",
    });
  };

  const handleContentClick = (item: ContentItem) => {
    if (item.type === 'video' && item.youtube_url) {
      openYouTubeVideo(item.youtube_url);
    } else if (item.type === 'document') {
      // Handle document opening logic here
      toast({
        title: "Document Access",
        description: "Document opening feature will be implemented soon",
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-4" />
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const featuredContent = getFeaturedContent();

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-background border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-muted-foreground" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
                <img src="/lovable-uploads/ae12245a-263e-4f55-b3ee-c8d6dd8af564.png" alt="Markaz Logo" className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Supplier Academy</h1>
                <p className="text-sm text-primary font-medium">Ab har supplier banega khud mukhtar!</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 border-border"
              />
            </div>
            <Button onClick={handleRefresh} variant="outline" size="sm" className="border-border">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-background border border-border rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Welcome to Markaz Supplier Academy</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Jahan aap banein apne business ke real hero, aur har maslay ka hal ho aapke paas – bina kisi intezar ke!
            </p>
            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse Content
              </Button>
            </div>
          </div>
        </section>

        {/* Browse by Category */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(1).map((category) => (
              <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200 border border-border bg-background">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      {category.id === 'ads' && <Play className="w-8 h-8 text-primary" />}
                      {category.id === 'listings' && <FileText className="w-8 h-8 text-primary" />}
                      {category.id === 'onboarding' && <Home className="w-8 h-8 text-primary" />}
                      {category.id === 'growth' && <Users className="w-8 h-8 text-primary" />}
                      {category.id === 'disputes' && <AlertTriangle className="w-8 h-8 text-primary" />}
                      {category.id === 'packaging' && <Package className="w-8 h-8 text-primary" />}
                      {category.id === 'updates' && <Bell className="w-8 h-8 text-primary" />}
                    </div>
                    <Badge variant="secondary" className="text-primary bg-primary/10 border-0">
                      {category.count} items
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3 text-foreground">{category.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {category.id === 'ads' && "Learn how to create effective ads and marketing strategies."}
                    {category.id === 'listings' && "Master product listing optimization and visibility techniques."}
                    {category.id === 'onboarding' && "Get started with step-by-step onboarding guides."}
                    {category.id === 'growth' && "Strategies to grow your business on the platform."}
                    {category.id === 'disputes' && "Handle disputes and claims effectively."}
                    {category.id === 'packaging' && "Learn packaging standards and guidelines."}
                    {category.id === 'updates' && "Stay updated with latest policies and changes."}
                  </p>
                  
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    Explore <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
              <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200 border border-border bg-background" onClick={() => handleContentClick(item)}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {item.type === 'video' && <Play className="w-6 h-6 text-primary" />}
                      {item.type === 'document' && <FileText className="w-6 h-6 text-primary" />}
                    </div>
                    <Badge variant="outline" className="capitalize border-primary/20 text-primary">{item.category}</Badge>
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