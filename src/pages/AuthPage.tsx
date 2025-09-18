/**
 * Authentication page with login and register forms
 * Handles user authentication with role selection
 */

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { useAuth } from '@/hooks/useAuth';
import type { LoginRequest, RegisterRequest, UserRole } from '@/types';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isLoading, error, clearError } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState<RegisterRequest>({
    email: '',
    password: '',
    name: '',
    role: 'CLIENT',
    phone: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  // Get redirect path from location state
  const from = (location.state as any)?.from?.pathname || '/home';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData);
      navigate(from, { replace: true });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== confirmPassword) {
      return; // This should be handled by form validation
    }

    try {
      await register(registerData);
      navigate(from, { replace: true });
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/5" />
      
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/home')}
        className="absolute top-8 left-8 z-10 flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Torna alla home
      </Button>

      {/* Auth Card */}
      <Card className="w-full max-w-md relative z-10 glass-card">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">Zafaf</span>
          </div>
          
          <div>
            <CardTitle className="text-2xl">Benvenuto</CardTitle>
            <p className="text-muted-foreground">Accedi o registrati per continuare</p>
          </div>
        </CardHeader>

        <CardContent>
          {/* Error Message */}
          {error && (
            <ErrorMessage 
              message={error} 
              onDismiss={clearError}
              className="mb-6"
            />
          )}

          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Accedi</TabsTrigger>
              <TabsTrigger value="register">Registrati</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tua@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="glass-input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="glass-input pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="btn-primary w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner size="sm" /> : 'Accedi'}
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nome completo</Label>
                  <Input
                    id="register-name"
                    placeholder="Il tuo nome"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                    className="glass-input"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="tua@email.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                    className="glass-input"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-phone">Telefono (opzionale)</Label>
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="+39 123 456 7890"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                    className="glass-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-role">Tipo account</Label>
                  <Select 
                    value={registerData.role} 
                    onValueChange={(value: UserRole) => setRegisterData(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger className="glass-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLIENT">Cliente - Cerco location</SelectItem>
                      <SelectItem value="PROVIDER">Provider - Offro location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      className="glass-input pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Conferma password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="glass-input pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && registerData.password !== confirmPassword && (
                    <p className="text-sm text-destructive">Le password non coincidono</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="btn-primary w-full" 
                  disabled={isLoading || registerData.password !== confirmPassword}
                >
                  {isLoading ? <LoadingSpinner size="sm" /> : 'Registrati'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;