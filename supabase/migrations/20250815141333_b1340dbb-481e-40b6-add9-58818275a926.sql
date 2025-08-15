-- Create the auth user using Supabase's auth admin function
-- This creates the user in the auth.users table
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  aud,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'omarchaabani22@gmail.com',
  crypt('assalam', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated'
);

-- Get the newly created user ID and update admin_users
UPDATE public.admin_users 
SET user_id = (
  SELECT id FROM auth.users WHERE email = 'omarchaabani22@gmail.com' LIMIT 1
)
WHERE email = 'omarchaabani22@gmail.com';

-- Re-add the foreign key constraint
ALTER TABLE public.admin_users 
ADD CONSTRAINT admin_users_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;