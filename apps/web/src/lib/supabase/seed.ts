import { createClient } from '@supabase/supabase-js';
import { 
  mockUserProfiles, 
  generateMockConversations, 
  generateMessagesForConversation
} from './mockData';

// Function to seed the database with mock data
export async function seedCommunicationsData() {
  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key is missing');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // 1. Insert mock user profiles
    const { error: profilesError } = await supabase
      .from('user_profiles')
      .upsert(mockUserProfiles, { onConflict: 'id' });
    
    if (profilesError) {
      throw profilesError;
    }
    
    console.log('✅ Seeded user profiles');
    
    // 2. Generate mock conversations
    const mockConversations = generateMockConversations();
    
    // 3. Insert conversations
    for (const conversation of mockConversations) {
      // Insert conversation
      const { data: conversationData, error: conversationError } = await supabase
        .from('conversations')
        .upsert({
          id: conversation.id,
          created_at: conversation.created_at,
          updated_at: conversation.updated_at,
          last_message: conversation.last_message
        }, { onConflict: 'id' })
        .select('id');
      
      if (conversationError) {
        throw conversationError;
      }
      
      // Insert participants
      const participantsToInsert = conversation.participants.map(participant => ({
        conversation_id: conversation.id,
        user_id: participant.id,
        joined_at: new Date().toISOString()
      }));
      
      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .upsert(participantsToInsert, { onConflict: 'conversation_id, user_id' });
      
      if (participantsError) {
        throw participantsError;
      }
      
      // Generate and insert messages
      const messages = generateMessagesForConversation(conversation.id, conversation.participants);
      
      const { error: messagesError } = await supabase
        .from('messages')
        .upsert(messages, { onConflict: 'id' });
      
      if (messagesError) {
        throw messagesError;
      }
    }
    
    console.log('✅ Seeded conversations, participants, and messages');
    
    return {
      success: true,
      message: 'Database successfully seeded with mock communications data'
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    return {
      success: false,
      message: `Error seeding database: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

// Export a function to remove all seeded data (for cleanup)
export async function cleanupSeedData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key is missing');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Delete in reverse order to respect foreign key constraints
    await supabase.from('messages').delete().filter('id', 'like', 'mock-%');
    await supabase.from('conversation_participants').delete().filter('conversation_id', 'like', 'mock-%');
    await supabase.from('conversations').delete().filter('id', 'like', 'mock-%');
    await supabase.from('user_profiles').delete().filter('id', 'like', 'user-%');
    
    return {
      success: true,
      message: 'Mock data successfully cleaned up'
    };
  } catch (error) {
    console.error('Error cleaning up seed data:', error);
    return {
      success: false,
      message: `Error cleaning up seed data: ${error instanceof Error ? error.message : String(error)}`
    };
  }
} 