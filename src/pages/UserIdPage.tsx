import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Building2,
  ExternalLink,
  Copy,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserItemProps } from "@/types/user";

function UserIdPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserItemProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError("ID do usuário não fornecido");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Usuário não encontrado"
              : "Erro ao carregar usuário",
          );
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatAddress = (address: UserItemProps["address"]) => {
    return `${address.street}, ${address.suite}, ${address.city} - ${address.zipcode}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600">
                Carregando informações do usuário...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="mx-auto max-w-4xl">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-white/50"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error || "Usuário não encontrado"}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            className="hover:bg-white/50"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            ID: {user.id}
          </Badge>
        </div>

        {/* Profile Header */}
        <Card className="mb-8 border-0 bg-white/80 shadow-xl backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col items-start gap-6 md:flex-row">
              <div className="flex-shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-2xl font-bold text-white shadow-lg">
                  {getInitials(user.name)}
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-lg font-medium text-blue-600">
                  @{user.username}
                </p>
                <p className="text-gray-600">{user.company.catchPhrase}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`mailto:${user.email}`)}
                  className="hover:bg-blue-50"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${user.phone}`)}
                  className="hover:bg-green-50"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Ligar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <User className="h-5 w-5 text-blue-600" />
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="group flex items-center justify-between rounded-lg bg-gray-50/80 p-3 transition-colors hover:bg-gray-100/80">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">{user.email}</p>
                    <p className="text-xs text-gray-500">Email</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => handleCopy(user.email, "email")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>

              <div className="group flex items-center justify-between rounded-lg bg-gray-50/80 p-3 transition-colors hover:bg-gray-100/80">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                    <p className="text-xs text-gray-500">Telefone</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => handleCopy(user.phone, "phone")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>

              <div className="group flex items-center justify-between rounded-lg bg-gray-50/80 p-3 transition-colors hover:bg-gray-100/80">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-900">{user.website}</p>
                    <p className="text-xs text-gray-500">Website</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() =>
                    window.open(`https://${user.website}`, "_blank")
                  }
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <MapPin className="h-5 w-5 text-red-600" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-lg bg-gray-50/80 p-4">
                  <p className="mb-2 font-medium text-gray-900">
                    {formatAddress(user.address)}
                  </p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Latitude: {user.address.geo.lat}</p>
                    <p>Longitude: {user.address.geo.lng}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full hover:bg-red-50"
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`,
                      "_blank",
                    )
                  }
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Ver no Google Maps
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Company */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Building2 className="h-5 w-5 text-orange-600" />
                Empresa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Nome da Empresa
                  </h3>
                  <p className="text-gray-700">{user.company.name}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Slogan</h3>
                  <p className="text-gray-700 italic">
                    "{user.company.catchPhrase}"
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Área de Atuação
                  </h3>
                  <p className="text-gray-700">{user.company.bs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback de Cópia */}
        {copiedField && (
          <div className="fixed right-4 bottom-4 rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg">
            <p className="text-sm">
              {copiedField === "email" ? "Email copiado!" : "Telefone copiado!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserIdPage;
