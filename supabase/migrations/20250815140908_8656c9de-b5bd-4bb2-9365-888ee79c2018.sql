-- Add password field to admin_users table
ALTER TABLE public.admin_users 
ADD COLUMN password TEXT NOT NULL DEFAULT '';