import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Video, FileText, Bell } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'banner';
  category: string;
  url?: string;
  duration?: string;
  isActive: boolean;
  createdAt: Date;
}

const ContentManager = () => {
  const [content, setContent] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Creating High-Converting Product Ads",
      description: "Learn the secrets of creating ads that actually convert customers",
      type: "video",
      category: "ads",
      url: "https://www.youtube.com/watch?v=example",
      duration: "12 mins",
      isActive: true,
      createdAt: new Date()
    },
    {
      id: "2",
      title: "Product Listing Optimization Guide",
      description: "Complete guide to optimize your product listings for maximum visibility",
      type: "document",
      category: "listings",
      isActive: true,
      createdAt: new Date()
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const contentTypes = [
    { value: 'video', label: 'Video', icon: Video },
    { value: 'document', label: 'Document', icon: FileText },
    { value: 'banner', label: 'Banner', icon: Bell }
  ];

  const categories = [
    { value: 'ads', label: 'Ads' },
    { value: 'listings', label: 'Listings' },
    { value: 'onboarding', label: 'Onboarding' },
    { value: 'growth', label: 'Business Growth' },
    { value: 'optimization', label: 'Optimization' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-muted-foreground">Manage educational content for Supplier Academy</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-primary hover:bg-primary-dark">
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {isAdding ? 'Add New Content' : 'Edit Content'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input placeholder="Content title" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="w-full p-2 border rounded-md">
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select className="w-full p-2 border rounded-md">
                {contentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL (for videos/documents)</label>
              <Input placeholder="https://youtube.com/watch?v=..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea placeholder="Content description" rows={3} />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button className="bg-primary hover:bg-primary-dark">
              {isAdding ? 'Add Content' : 'Update Content'}
            </Button>
            <Button variant="outline" onClick={() => {
              setIsAdding(false);
              setEditingId(null);
            }}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Content List */}
      <div className="grid gap-4">
        {content.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {item.type === 'video' && <Video className="w-4 h-4 text-primary" />}
                    {item.type === 'document' && <FileText className="w-4 h-4 text-primary" />}
                    {item.type === 'banner' && <Bell className="w-4 h-4 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="capitalize">{item.category}</Badge>
                  <Badge variant="outline" className="capitalize">{item.type}</Badge>
                  {item.duration && <Badge variant="secondary">{item.duration}</Badge>}
                  <Badge className={item.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditingId(item.id)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Management Options */}
      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold mb-4">Real-time Content Update Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Google Sheets Integration</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Connect a Google Sheet to manage content directly from spreadsheets
            </p>
            <Button variant="outline" size="sm">Setup Integration</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">YouTube Playlist Sync</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Automatically sync videos from specific YouTube playlists
            </p>
            <Button variant="outline" size="sm">Connect YouTube</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">CMS Integration</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Connect with headless CMS like Strapi or Contentful
            </p>
            <Button variant="outline" size="sm">Setup CMS</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContentManager;