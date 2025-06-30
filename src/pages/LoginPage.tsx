import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  LogIn,
  Github,
  Chrome,
  Loader2,
  Shield,
  Sparkles,
} from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<"login" | "register">("login");
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (loginType === "register") {
      if (!formData.name) {
        newErrors.name = "Nome é obrigatório";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Senhas não coincidem";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulação de chamada API
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form submitted:", { ...formData, rememberMe });
      // Aqui você faria a integração real com sua API
    }, 2000);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implementar integração com provedores sociais
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/3 blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="border-0 bg-white/95 shadow-2xl backdrop-blur-xl">
          <CardHeader className="pb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="mb-2 text-2xl font-bold text-gray-800">
              {loginType === "login" ? "Bem-vindo de volta!" : "Criar conta"}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {loginType === "login"
                ? "Entre com suas credenciais para continuar"
                : "Preencha os dados para criar sua conta"}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome (apenas no registro) */}
              {loginType === "register" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nome completo
                  </Label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`h-12 border-2 pl-10 transition-all duration-200 focus:border-violet-500 ${
                        errors.name
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`h-12 border-2 pl-10 transition-all duration-200 focus:border-violet-500 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`h-12 border-2 pr-10 pl-10 transition-all duration-200 focus:border-violet-500 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 transform p-0 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirmar Senha (apenas no registro) */}
              {loginType === "register" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirmar senha
                  </Label>
                  <div className="relative">
                    <Shield className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className={`h-12 border-2 pl-10 transition-all duration-200 focus:border-violet-500 ${
                        errors.confirmPassword
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Lembrar-me e Esqueci senha (apenas no login) */}
              {loginType === "login" && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="remember"
                      className="cursor-pointer text-sm text-gray-600"
                    >
                      Lembrar-me
                    </Label>
                  </div>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-violet-600 hover:text-violet-800"
                  >
                    Esqueci minha senha
                  </Button>
                </div>
              )}

              {/* Botão de Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full transform bg-gradient-to-r from-violet-500 to-purple-600 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-violet-600 hover:to-purple-700 hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {loginType === "login" ? "Entrando..." : "Criando conta..."}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    {loginType === "login" ? "Entrar" : "Criar conta"}
                  </div>
                )}
              </Button>
            </form>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">
                  ou continue com
                </span>
              </div>
            </div>

            {/* Login Social */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 border-2 transition-colors hover:bg-gray-50"
                onClick={() => handleSocialLogin("google")}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 border-2 transition-colors hover:bg-gray-50"
                onClick={() => handleSocialLogin("github")}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>

            {/* Toggle Login/Register */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {loginType === "login"
                  ? "Não tem uma conta?"
                  : "Já tem uma conta?"}
                <Button
                  type="button"
                  variant="link"
                  className="ml-1 h-auto p-0 font-semibold text-violet-600 hover:text-violet-800"
                  onClick={() => {
                    setLoginType(loginType === "login" ? "register" : "login");
                    setErrors({});
                    setFormData({
                      email: "",
                      password: "",
                      name: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  {loginType === "login" ? "Cadastre-se" : "Faça login"}
                </Button>
              </p>
            </div>

            {/* Security Notice */}
            <Alert className="mt-4 border-blue-200 bg-blue-50">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-xs text-blue-800">
                Seus dados estão protegidos com criptografia de ponta a ponta
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-white/70">
            Ao continuar, você concorda com nossos{" "}
            <Button
              variant="link"
              className="h-auto p-0 text-xs text-white/90 underline hover:text-white"
            >
              Termos de Uso
            </Button>{" "}
            e{" "}
            <Button
              variant="link"
              className="h-auto p-0 text-xs text-white/90 underline hover:text-white"
            >
              Política de Privacidade
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
