import { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'document' | 'banner';
  category: string;
  description: string;
  youtube_url?: string;
  duration?: string;
  is_featured?: boolean;
  is_new?: boolean;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your actual sheet ID
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1`;

export const useContentData = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: "all", name: "All Categories", count: 0 },
    { id: "ads", name: "Ads", count: 0 },
    { id: "listings", name: "Listings", count: 0 },
    { id: "onboarding", name: "Onboarding", count: 0 },
    { id: "growth", name: "Business Growth", count: 0 },
    { id: "disputes", name: "Disputes/Claims", count: 0 },
    { id: "packaging", name: "Packaging Guidelines", count: 0 },
    { id: "updates", name: "Updates/Policies", count: 0 }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = (csv: string): ContentItem[] => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(',').map(v => v.replace(/"/g, '').trim());
      const item: any = { id: `item-${index + 1}` };
      
      headers.forEach((header, i) => {
        const value = values[i] || '';
        if (header === 'is_featured' || header === 'is_new') {
          item[header] = value.toLowerCase() === 'true';
        } else {
          item[header] = value;
        }
      });
      
      return item as ContentItem;
    }).filter(item => item.title); // Filter out empty rows
  };

  const updateCategoryCounts = (contentData: ContentItem[]) => {
    const counts: { [key: string]: number } = {};
    
    contentData.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    setCategories(prevCategories => 
      prevCategories.map(cat => ({
        ...cat,
        count: cat.id === 'all' ? contentData.length : (counts[cat.id] || 0)
      }))
    );
  };

  const fetchContent = async () => {
    if (!SHEET_ID || SHEET_ID === 'YOUR_GOOGLE_SHEET_ID') {
      setError('Please configure your Google Sheet ID in useContentData.ts');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(SHEET_URL);
      const csvText = await response.text();
      const parsedContent = parseCSV(csvText);
      
      setContent(parsedContent);
      updateCategoryCounts(parsedContent);
      setError(null);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Failed to fetch content from Google Sheets');
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedContent = () => {
    return content.filter(item => item.is_featured).slice(0, 6);
  };

  const getContentByCategory = (categoryId: string) => {
    if (categoryId === 'all') return content;
    return content.filter(item => item.category === categoryId);
  };

  const openYouTubeVideo = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    fetchContent();
    // Refresh content every 5 minutes
    const interval = setInterval(fetchContent, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    content,
    categories,
    loading,
    error,
    getFeaturedContent,
    getContentByCategory,
    openYouTubeVideo,
    refreshContent: fetchContent
  };
};