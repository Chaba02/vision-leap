-- Temporarily remove the foreign key constraint to allow standalone admin records
ALTER TABLE public.admin_users DROP CONSTRAINT IF EXISTS admin_users_user_id_fkey;

-- Insert admin user with temporary UUID
INSERT INTO public.admin_users (user_id, email, password, role) 
VALUES ('00000000-0000-0000-0000-000000000001', 'omarchaabani22@gmail.com', 'assalam', 'admin');