import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Phone } from 'lucide-react';

interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  seller_id: string;
  created_at: string;
  profiles: {
    full_name: string;
    phone: string;
  };
}

export default function MarketplaceNew() {
  const { user } = useAuth();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: null as File | null
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`
          id, title, price, description, images, seller_id, created_at,
          profiles!inner(full_name, phone)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.image) return;

    try {
      const imageUrl = await uploadImage(formData.image);
      
      const { error } = await supabase
        .from('marketplace_items')
        .insert({
          title: formData.title,
          price: parseFloat(formData.price),
          description: formData.description,
          images: [imageUrl],
          seller_id: user.id,
          category: 'cattle',
          status: 'active'
        });

      if (error) throw error;

      setFormData({ title: '', price: '', description: '', image: null });
      setShowCreateForm(false);
      fetchItems();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (loading) return <div className="p-4">Loading marketplace...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cattle Marketplace</h1>
        {user && (
          <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Create Post</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Breed Name</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Cattle Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Create Post</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">{item.title}</CardTitle>
              <p className="text-2xl font-bold text-green-600 mb-2">₹{item.price.toLocaleString()}</p>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  <p><strong>Seller:</strong> {item.profiles.full_name}</p>
                  <p><strong>Phone:</strong> {item.profiles.phone}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => window.open(`tel:${item.profiles.phone}`, '_self')}
                  className="w-full"
                >
                  <Phone className="w-4 h-4 mr-1" />Call Seller
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No cattle listings available</p>
        </div>
      )}
    </div>
  );
}