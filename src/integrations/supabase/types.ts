export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      business_validations: {
        Row: {
          business_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_validations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          created_at: string
          current_funding: number | null
          description: string | null
          employees: string | null
          funding_goal: number | null
          id: string
          industry: string | null
          location: string | null
          monthly_expenses: number | null
          monthly_revenue: number | null
          name: string
          stage: string | null
          use_of_funds: string | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string
          current_funding?: number | null
          description?: string | null
          employees?: string | null
          funding_goal?: number | null
          id?: string
          industry?: string | null
          location?: string | null
          monthly_expenses?: number | null
          monthly_revenue?: number | null
          name: string
          stage?: string | null
          use_of_funds?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          current_funding?: number | null
          description?: string | null
          employees?: string | null
          funding_goal?: number | null
          id?: string
          industry?: string | null
          location?: string | null
          monthly_expenses?: number | null
          monthly_revenue?: number | null
          name?: string
          stage?: string | null
          use_of_funds?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          business_description: string | null
          business_name: string | null
          business_verified: boolean
          default_contribution_mode: Database["public"]["Enums"]["contribution_mode"]
          email_verified: boolean
          full_name: string | null
          id: string
          identity_verified: boolean
          industry_preferences: string[] | null
          investment_motivation:
            | Database["public"]["Enums"]["investor_motivation"]
            | null
          location: string | null
          organization_type:
            | Database["public"]["Enums"]["investor_org_type"]
            | null
          phone_number: string | null
          phone_verified: boolean
          profile_image_url: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          trust_score: number
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          business_description?: string | null
          business_name?: string | null
          business_verified?: boolean
          default_contribution_mode?: Database["public"]["Enums"]["contribution_mode"]
          email_verified?: boolean
          full_name?: string | null
          id: string
          identity_verified?: boolean
          industry_preferences?: string[] | null
          investment_motivation?:
            | Database["public"]["Enums"]["investor_motivation"]
            | null
          location?: string | null
          organization_type?:
            | Database["public"]["Enums"]["investor_org_type"]
            | null
          phone_number?: string | null
          phone_verified?: boolean
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          trust_score?: number
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          business_description?: string | null
          business_name?: string | null
          business_verified?: boolean
          default_contribution_mode?: Database["public"]["Enums"]["contribution_mode"]
          email_verified?: boolean
          full_name?: string | null
          id?: string
          identity_verified?: boolean
          industry_preferences?: string[] | null
          investment_motivation?:
            | Database["public"]["Enums"]["investor_motivation"]
            | null
          location?: string | null
          organization_type?:
            | Database["public"]["Enums"]["investor_org_type"]
            | null
          phone_number?: string | null
          phone_verified?: boolean
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          trust_score?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          created_at: string
          document_type: Database["public"]["Enums"]["verification_document_type"]
          file_url: string
          id: string
          rejection_reason: string | null
          status: Database["public"]["Enums"]["verification_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type: Database["public"]["Enums"]["verification_document_type"]
          file_url: string
          id?: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: Database["public"]["Enums"]["verification_document_type"]
          file_url?: string
          id?: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contribution_mode: "investing" | "donating" | "supporting"
      investor_motivation: "ROI-focused" | "Impact-focused" | "Mixed"
      investor_org_type: "Individual" | "NGO" | "Charity" | "Investment Firm"
      user_role: "entrepreneur" | "investor"
      verification_document_type:
        | "identity_card"
        | "passport"
        | "drivers_license"
        | "business_registration"
        | "proof_of_address"
      verification_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contribution_mode: ["investing", "donating", "supporting"],
      investor_motivation: ["ROI-focused", "Impact-focused", "Mixed"],
      investor_org_type: ["Individual", "NGO", "Charity", "Investment Firm"],
      user_role: ["entrepreneur", "investor"],
      verification_document_type: [
        "identity_card",
        "passport",
        "drivers_license",
        "business_registration",
        "proof_of_address",
      ],
      verification_status: ["pending", "approved", "rejected"],
    },
  },
} as const
