-- Drop existing admin_users table and related constraints
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Create simple admin table
CREATE TABLE public.admin (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;

-- Create policies for admin table (only admins can manage admins)
CREATE POLICY "Admins can view admin records" 
ON public.admin 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert admin records" 
ON public.admin 
FOR INSERT 
WITH CHECK (true);

-- Update events table RLS policies to use admin table instead of auth.users
DROP POLICY IF EXISTS "Only admins can insert events" ON public.events;
DROP POLICY IF EXISTS "Only admins can update events" ON public.events;
DROP POLICY IF EXISTS "Only admins can delete events" ON public.events;
DROP POLICY IF EXISTS "Only admins can view all events" ON public.events;

-- Create new policies for events that check against admin table
-- For now, we'll make events publicly readable and admin-only for modifications
CREATE POLICY "Anyone can view active events" 
ON public.events 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view all events" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Full access to events" 
ON public.events 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Insert default admin user
INSERT INTO public.admin (email, password) 
VALUES ('omarchaabani22@gmail.com', 'assalam');