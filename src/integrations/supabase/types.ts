export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      animals: {
        Row: {
          age_months: number | null
          breed_name: string | null
          breed_type: Database["public"]["Enums"]["breed_type"]
          breeding_records: Json | null
          color: string | null
          created_at: string | null
          current_value: number | null
          gender: string | null
          health_status: string | null
          id: string
          image_url: string | null
          name: string
          owner_id: string
          purchase_date: string | null
          purchase_price: number | null
          unique_id: string | null
          updated_at: string | null
          vaccination_records: Json | null
          weight_kg: number | null
        }
        Insert: {
          age_months?: number | null
          breed_name?: string | null
          breed_type: Database["public"]["Enums"]["breed_type"]
          breeding_records?: Json | null
          color?: string | null
          created_at?: string | null
          current_value?: number | null
          gender?: string | null
          health_status?: string | null
          id?: string
          image_url?: string | null
          name: string
          owner_id: string
          purchase_date?: string | null
          purchase_price?: number | null
          unique_id?: string | null
          updated_at?: string | null
          vaccination_records?: Json | null
          weight_kg?: number | null
        }
        Update: {
          age_months?: number | null
          breed_name?: string | null
          breed_type?: Database["public"]["Enums"]["breed_type"]
          breeding_records?: Json | null
          color?: string | null
          created_at?: string | null
          current_value?: number | null
          gender?: string | null
          health_status?: string | null
          id?: string
          image_url?: string | null
          name?: string
          owner_id?: string
          purchase_date?: string | null
          purchase_price?: number | null
          unique_id?: string | null
          updated_at?: string | null
          vaccination_records?: Json | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          animal_id: string | null
          appointment_date: string
          consultation_notes: string | null
          created_at: string | null
          farmer_id: string
          fee_paid: number | null
          hospital_id: string
          id: string
          is_online: boolean | null
          prescription: Json | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          symptoms: string | null
          updated_at: string | null
        }
        Insert: {
          animal_id?: string | null
          appointment_date: string
          consultation_notes?: string | null
          created_at?: string | null
          farmer_id: string
          fee_paid?: number | null
          hospital_id: string
          id?: string
          is_online?: boolean | null
          prescription?: Json | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          symptoms?: string | null
          updated_at?: string | null
        }
        Update: {
          animal_id?: string | null
          appointment_date?: string
          consultation_notes?: string | null
          created_at?: string | null
          farmer_id?: string
          fee_paid?: number | null
          hospital_id?: string
          id?: string
          is_online?: boolean | null
          prescription?: Json | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          symptoms?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      breed_recognition_logs: {
        Row: {
          ai_model_version: string | null
          animal_id: string | null
          confidence_score: number | null
          created_at: string | null
          id: string
          image_url: string
          is_real_animal: boolean | null
          is_replay_video: boolean | null
          predicted_breed: string | null
          processing_time_ms: number | null
          user_id: string
        }
        Insert: {
          ai_model_version?: string | null
          animal_id?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          image_url: string
          is_real_animal?: boolean | null
          is_replay_video?: boolean | null
          predicted_breed?: string | null
          processing_time_ms?: number | null
          user_id: string
        }
        Update: {
          ai_model_version?: string | null
          animal_id?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          image_url?: string
          is_real_animal?: boolean | null
          is_replay_video?: boolean | null
          predicted_breed?: string | null
          processing_time_ms?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "breed_recognition_logs_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
        ]
      }
      disease_alerts: {
        Row: {
          active: boolean | null
          affected_area: string | null
          created_at: string | null
          description: string
          disease_name: string
          expires_at: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          prevention_measures: Json | null
          radius_km: number | null
          severity: Database["public"]["Enums"]["disease_severity"]
          source: string | null
          symptoms: Json | null
          treatment_info: string | null
        }
        Insert: {
          active?: boolean | null
          affected_area?: string | null
          created_at?: string | null
          description: string
          disease_name: string
          expires_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          prevention_measures?: Json | null
          radius_km?: number | null
          severity: Database["public"]["Enums"]["disease_severity"]
          source?: string | null
          symptoms?: Json | null
          treatment_info?: string | null
        }
        Update: {
          active?: boolean | null
          affected_area?: string | null
          created_at?: string | null
          description?: string
          disease_name?: string
          expires_at?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          prevention_measures?: Json | null
          radius_km?: number | null
          severity?: Database["public"]["Enums"]["disease_severity"]
          source?: string | null
          symptoms?: Json | null
          treatment_info?: string | null
        }
        Relationships: []
      }
      government_schemes: {
        Row: {
          active: boolean | null
          application_process: string | null
          benefits: string | null
          contact_info: Json | null
          created_at: string | null
          description: string
          district: string | null
          documents_required: Json | null
          eligibility_criteria: Json | null
          id: string
          name: string
          state: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          application_process?: string | null
          benefits?: string | null
          contact_info?: Json | null
          created_at?: string | null
          description: string
          district?: string | null
          documents_required?: Json | null
          eligibility_criteria?: Json | null
          id?: string
          name: string
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          application_process?: string | null
          benefits?: string | null
          contact_info?: Json | null
          created_at?: string | null
          description?: string
          district?: string | null
          documents_required?: Json | null
          eligibility_criteria?: Json | null
          id?: string
          name?: string
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      hospitals: {
        Row: {
          address: string
          admin_id: string
          consultation_fee: number | null
          created_at: string | null
          doctor_name: string
          education: string | null
          email: string | null
          id: string
          location_lat: number
          location_lng: number
          name: string
          online_consultation_available: boolean | null
          phone: string
          rating: number | null
          services: Json | null
          specialization: string | null
          total_reviews: number | null
          updated_at: string | null
          verified: boolean | null
          working_hours: Json | null
        }
        Insert: {
          address: string
          admin_id: string
          consultation_fee?: number | null
          created_at?: string | null
          doctor_name: string
          education?: string | null
          email?: string | null
          id?: string
          location_lat: number
          location_lng: number
          name: string
          online_consultation_available?: boolean | null
          phone: string
          rating?: number | null
          services?: Json | null
          specialization?: string | null
          total_reviews?: number | null
          updated_at?: string | null
          verified?: boolean | null
          working_hours?: Json | null
        }
        Update: {
          address?: string
          admin_id?: string
          consultation_fee?: number | null
          created_at?: string | null
          doctor_name?: string
          education?: string | null
          email?: string | null
          id?: string
          location_lat?: number
          location_lng?: number
          name?: string
          online_consultation_available?: boolean | null
          phone?: string
          rating?: number | null
          services?: Json | null
          specialization?: string | null
          total_reviews?: number | null
          updated_at?: string | null
          verified?: boolean | null
          working_hours?: Json | null
        }
        Relationships: []
      }
      insurance_claims: {
        Row: {
          animal_id: string
          claim_amount: number
          claim_type: string
          description: string | null
          documents: Json | null
          farmer_id: string
          id: string
          policy_number: string
          processed_at: string | null
          status: string | null
          submitted_at: string | null
        }
        Insert: {
          animal_id: string
          claim_amount: number
          claim_type: string
          description?: string | null
          documents?: Json | null
          farmer_id: string
          id?: string
          policy_number: string
          processed_at?: string | null
          status?: string | null
          submitted_at?: string | null
        }
        Update: {
          animal_id?: string
          claim_amount?: number
          claim_type?: string
          description?: string | null
          documents?: Json | null
          farmer_id?: string
          id?: string
          policy_number?: string
          processed_at?: string | null
          status?: string | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_claims_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_items: {
        Row: {
          animal_id: string | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          images: Json | null
          location: string | null
          negotiable: boolean | null
          price: number
          seller_id: string
          status: Database["public"]["Enums"]["item_status"] | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          animal_id?: string | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          location?: string | null
          negotiable?: boolean | null
          price: number
          seller_id: string
          status?: Database["public"]["Enums"]["item_status"] | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          animal_id?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          location?: string | null
          negotiable?: boolean | null
          price?: number
          seller_id?: string
          status?: Database["public"]["Enums"]["item_status"] | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_items_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          district: string | null
          full_name: string
          id: string
          language_preference: string | null
          location_lat: number | null
          location_lng: number | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          state: string | null
          updated_at: string | null
          village: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          district?: string | null
          full_name: string
          id: string
          language_preference?: string | null
          location_lat?: number | null
          location_lng?: number | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          state?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          district?: string | null
          full_name?: string
          id?: string
          language_preference?: string | null
          location_lat?: number | null
          location_lng?: number | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          state?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      appointment_status: "pending" | "confirmed" | "completed" | "cancelled"
      breed_type: "cattle" | "buffalo"
      disease_severity: "low" | "medium" | "high" | "critical"
      item_status: "active" | "sold" | "inactive"
      user_role: "farmer" | "flw" | "hospital_admin" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      appointment_status: ["pending", "confirmed", "completed", "cancelled"],
      breed_type: ["cattle", "buffalo"],
      disease_severity: ["low", "medium", "high", "critical"],
      item_status: ["active", "sold", "inactive"],
      user_role: ["farmer", "flw", "hospital_admin", "super_admin"],
    },
  },
} as const
