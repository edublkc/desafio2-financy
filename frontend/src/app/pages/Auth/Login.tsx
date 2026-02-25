import React, { useState } from "react";

import logo from "@/assets/logo.svg";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SectionDivisor } from "@/components/SectionDivisor";
import { Label } from "@/components/ui/label";
import { UserRoundPlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const loginMutate = await login({ email, password })

      if (loginMutate) {
        toast.success("Login realizado com sucesso!")
      }
    } catch (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
      <img src={logo} className="w-36 h-8" />
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader className="items-center">
          <CardTitle className="text-xl font-bold">
            Fazer Login
          </CardTitle>
          <CardDescription>
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="mail@example.com"
                onChange={(e) => setEmail(e.target.value)}
                iconName="MailIcon"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
                iconName="LockIcon"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="ml-2 text-gray-700">Lembrar-me</Label>
              </div>
              <a href="#" className="text-sm text-brand-base font-medium hover:underline">Recuperar Senha</a>
            </div>

            <Button type="submit" className="w-full bg-brand-base" disabled={loading}>Entrar</Button>

            <SectionDivisor content="ou" />

            <div className="flex flex-col justify-center items-center gap-4">
              <span className="text-gray-600 font-normal text-sm">Ainda não tem uma conta?</span>
              <Link
                to="/singup"
                className="w-full bg-gray-100 flex justify-center items-center gap-2 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-200 transition-colors border-gray-200 border-2">
                <UserRoundPlusIcon />
                <span>
                  Criar conta
                </span>
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}