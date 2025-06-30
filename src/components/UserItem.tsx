import { UserProps } from "@/types/user";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, User, ExternalLink, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

function UserItem({ user }: UserProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(user.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar email:", err);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(user.phone);
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar telefone:", err);
    }
  };

  const formatPhone = (phone: string) => {
    // Formato brasileiro: (XX) XXXXX-XXXX
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="group bg-gradient-to-br from-white to-gray-50/50 transition-all duration-300 hover:border-blue-200 hover:shadow-lg">
      <CardContent className="p-6">
        {/* Header com Avatar e Nome */}
        <div className="mb-5 flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-md">
              {getInitials(user.name)}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="mb-1 truncate text-lg font-bold text-gray-900">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500">ID: {user.id}</p>
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="mb-6 space-y-3">
          {/* Email */}
          <div className="group/item flex items-center justify-between rounded-lg bg-gray-50/70 p-3 transition-colors hover:bg-gray-100/70">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex-shrink-0">
                <Mail className="h-4 w-4 text-blue-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {user.email}
                </p>
                <p className="text-xs text-gray-500">Email</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover/item:opacity-100"
              onClick={handleCopyEmail}
              title="Copiar email"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>

          {/* Telefone */}
          <div className="group/item flex items-center justify-between rounded-lg bg-gray-50/70 p-3 transition-colors hover:bg-gray-100/70">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex-shrink-0">
                <Phone className="h-4 w-4 text-green-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {formatPhone(user.phone)}
                </p>
                <p className="text-xs text-gray-500">Telefone</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover/item:opacity-100"
              onClick={handleCopyPhone}
              title="Copiar telefone"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <Button
            asChild
            className="flex-1 bg-blue-600 text-white shadow-sm transition-all group-hover:shadow-lg hover:bg-blue-700 hover:shadow-md"
          >
            <Link
              to={`/${user.id}`}
              className="flex items-center justify-center gap-2"
            >
              <User className="h-4 w-4" />
              Ver Detalhes
              <ExternalLink className="h-3 w-3 opacity-70" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="px-3 transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-700"
            onClick={() => window.open(`tel:${user.phone}`, "_self")}
            title="Ligar"
          >
            <Phone className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="px-3 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            onClick={() => window.open(`mailto:${user.email}`, "_self")}
            title="Enviar email"
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>

        {/* Feedback de Cópia */}
        {(emailCopied || phoneCopied) && (
          <div className="mt-3 rounded-md border border-green-200 bg-green-50 p-2">
            <p className="text-center text-xs text-green-700">
              {emailCopied ? "Email copiado!" : "Telefone copiado!"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default UserItem;
