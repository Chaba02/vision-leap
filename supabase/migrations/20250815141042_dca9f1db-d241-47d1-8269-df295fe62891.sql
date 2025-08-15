-- Insert admin user with email, password and generated user_id
INSERT INTO public.admin_users (user_id, email, password, role) 
VALUES (gen_random_uuid(), 'omarchaabani22@gmail.com', 'assalam', 'admin');