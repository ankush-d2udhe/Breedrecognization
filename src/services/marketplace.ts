import { supabase } from '@/integrations/supabase/client';

export interface CreatePostData {
  title: string;
  price: number;
  description: string;
  imageFile: File;
  contactNumber: string;
}

export interface MarketplacePost {
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

class MarketplaceService {
  async createPost(data: CreatePostData, userId: string): Promise<void> {
    // Upload image
    const imageUrl = await this.uploadImage(data.imageFile);
    
    // Create post
    const { error } = await supabase
      .from('marketplace_items')
      .insert({
        title: data.title,
        price: data.price,
        description: data.description,
        images: [imageUrl],
        seller_id: userId,
        category: 'cattle',
        status: 'active'
      });

    if (error) throw error;
  }

  async getPosts(): Promise<MarketplacePost[]> {
    const { data, error } = await supabase
      .from('marketplace_items')
      .select(`
        *,
        profiles!marketplace_items_seller_id_fkey(full_name, phone)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async updatePost(postId: string, updates: Partial<CreatePostData>): Promise<void> {
    const { error } = await supabase
      .from('marketplace_items')
      .update(updates)
      .eq('id', postId);

    if (error) throw error;
  }

  async deletePost(postId: string): Promise<void> {
    const { error } = await supabase
      .from('marketplace_items')
      .update({ status: 'inactive' })
      .eq('id', postId);

    if (error) throw error;
  }

  private async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `marketplace/${fileName}`;

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
}

export default new MarketplaceService();