-- Drop existing admin_users table and related constraints
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Drop all existing policies for events table
DROP POLICY IF EXISTS "Anyone can view active events" ON public.events;
DROP POLICY IF EXISTS "Only admins can insert events" ON public.events;
DROP POLICY IF EXISTS "Only admins can update events" ON public.events;
DROP POLICY IF EXISTS "Only admins can delete events" ON public.events;
DROP POLICY IF EXISTS "Only admins can view all events" ON public.events;

-- Create simple admin table
CREATE TABLE public.admin (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;

-- Create policies for admin table
CREATE POLICY "Public access to admin records" 
ON public.admin 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create new simplified policies for events
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