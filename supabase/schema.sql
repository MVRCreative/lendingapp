-- Create a profiles table with RLS enabled
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Set up storage policy for avatar images
CREATE POLICY "Avatar images are publicly accessible." 
  ON storage.objects 
  FOR SELECT
  USING (bucket_id = 'avatars');

-- Set up storage policy so users can upload their own avatars
CREATE POLICY "Users can upload avatars." 
  ON storage.objects 
  FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid() = (storage.foldername(name))[1]::uuid
  );

-- Users can only update their own avatars
CREATE POLICY "Users can update their own avatars." 
  ON storage.objects 
  FOR UPDATE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid() = (storage.foldername(name))[1]::uuid
  );

-- Users can only delete their own avatars
CREATE POLICY "Users can delete their own avatars." 
  ON storage.objects 
  FOR DELETE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid() = (storage.foldername(name))[1]::uuid
  );

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own profiles
CREATE POLICY "Users can view their own profile." 
  ON profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Create policy for users to update their own profiles
CREATE POLICY "Users can update their own profile." 
  ON profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user(); 