import { useParams, useNavigate } from "react-router-dom";
import { Search, Play, FileText, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContentData } from "@/hooks/useContentData";
import { useToast } from "@/hooks/use-toast";
import SidebarLayout from "@/components/SidebarLayout";
import { useState } from "react";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { 
    categories, 
    loading, 
    error, 
    getContentByCategory,
    openYouTubeVideo,
    refreshContent 
  } = useContentData();
  
  const { toast } = useToast();

  const category = categories.find(cat => cat.id === categoryId);
  const categoryContent = categoryId ? getContentByCategory(categoryId) : [];

  const filteredContent = categoryContent.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = async () => {
    await refreshContent();
    toast({
      title: "Content Updated",
      description: "Latest content has been loaded from Google Sheets",
    });
  };

  const handleContentClick = (item: any) => {
    if (item.type === 'video' && item.youtube_url) {
      openYouTubeVideo(item.youtube_url);
    } else if (item.type === 'document') {
      toast({
        title: "Document Access",
        description: "Document opening feature will be implemented soon",
      });
    }
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  if (error || !category) {
    return (
      <SidebarLayout>
        <div className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-4">{error || "Category not found"}</p>
            <Button onClick={() => navigate("/supplier-academy")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Academy
            </Button>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="bg-background min-h-screen">
        {/* Header */}
        <header className="bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/supplier-academy")}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
                <p className="text-sm text-muted-foreground">{category.count} items available</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search in this category..."
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
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Card 
                key={item.id} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 border border-border bg-background" 
                onClick={() => handleContentClick(item)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {item.type === 'video' && <Play className="w-6 h-6 text-primary" />}
                      {item.type === 'document' && <FileText className="w-6 h-6 text-primary" />}
                    </div>
                    <Badge variant="outline" className="capitalize border-primary/20 text-primary">
                      {item.type}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  {item.duration && (
                    <p className="text-xs text-primary font-medium mb-4">{item.duration}</p>
                  )}
                  <div className="flex items-center text-primary font-medium text-sm">
                    {item.type === 'video' ? 'Watch Now' : 'Read More'} 
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? "No content found matching your search." : "No content available for this category yet."}
              </p>
              {searchQuery && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery("")}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default CategoryPage;