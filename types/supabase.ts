export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          google_id: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          google_id?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          google_id?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      client_preferences: {
        Row: {
          id: string
          user_id: string
          current_mode: 'eval' | 'funded'
          eval_profit_target: number
          eval_session_max_drawdown: number
          eval_peak_to_trough_max: number
          eval_contracts: number
          funded_profit_target: number
          funded_session_max_drawdown: number
          funded_peak_to_trough_max: number
          funded_contracts: number
          selected_markets: string[]
          submitted_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_mode?: 'eval' | 'funded'
          eval_profit_target?: number
          eval_session_max_drawdown?: number
          eval_peak_to_trough_max?: number
          eval_contracts?: number
          funded_profit_target?: number
          funded_session_max_drawdown?: number
          funded_peak_to_trough_max?: number
          funded_contracts?: number
          selected_markets?: string[]
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_mode?: 'eval' | 'funded'
          eval_profit_target?: number
          eval_session_max_drawdown?: number
          eval_peak_to_trough_max?: number
          eval_contracts?: number
          funded_profit_target?: number
          funded_session_max_drawdown?: number
          funded_peak_to_trough_max?: number
          funded_contracts?: number
          selected_markets?: string[]
          submitted_at?: string
          updated_at?: string
        }
      }
      portfolios: {
        Row: {
          id: string
          user_id: string
          curated_by_admin: boolean
          pass_probability: number | null
          monte_carlo_high: number | null
          monte_carlo_low: number | null
          max_drawdown_per_session: number | null
          peak_to_trough_estimate: number | null
          pnl_probability: number | null
          suggested_contracts: Record<string, number>
          notes: string | null
          accepted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          curated_by_admin?: boolean
          pass_probability?: number | null
          monte_carlo_high?: number | null
          monte_carlo_low?: number | null
          max_drawdown_per_session?: number | null
          peak_to_trough_estimate?: number | null
          pnl_probability?: number | null
          suggested_contracts?: Record<string, number>
          notes?: string | null
          accepted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          curated_by_admin?: boolean
          pass_probability?: number | null
          monte_carlo_high?: number | null
          monte_carlo_low?: number | null
          max_drawdown_per_session?: number | null
          peak_to_trough_estimate?: number | null
          pnl_probability?: number | null
          suggested_contracts?: Record<string, number>
          notes?: string | null
          accepted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          consultation_paid: boolean
          consultation_paid_at: string | null
          consultation_amount: number | null
          subscription_status: string | null
          subscription_tier: 'discounted' | 'full_price' | null
          subscription_started_at: string | null
          subscription_current_period_end: string | null
          subscription_cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          consultation_paid?: boolean
          consultation_paid_at?: string | null
          consultation_amount?: number | null
          subscription_status?: string | null
          subscription_tier?: 'discounted' | 'full_price' | null
          subscription_started_at?: string | null
          subscription_current_period_end?: string | null
          subscription_cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          consultation_paid?: boolean
          consultation_paid_at?: string | null
          consultation_amount?: number | null
          subscription_status?: string | null
          subscription_tier?: 'discounted' | 'full_price' | null
          subscription_started_at?: string | null
          subscription_current_period_end?: string | null
          subscription_cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
