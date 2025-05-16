import { supabase } from './supabase';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

// Table name in Supabase
const CONTACT_TABLE = 'contact_messages';

// Submit a contact message to Supabase
export const submitContactMessage = async (message: ContactMessage): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from(CONTACT_TABLE)
      .insert([
        {
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error submitting contact message:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Exception submitting contact message:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};
