import React, { useState } from "react";

import logo from "@/assets/logo.svg";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionDivisor } from "@/components/SectionDivisor";
import { Label } from "@/components/ui/label";
import { LogInIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export function Singup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signup = useAuthStore((state) => state.signup)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!name || !email || !password) {
        toast.error("Por favor, preencha todos os campos.")
        setLoading(false)
        return
      }

      if (password.length < 8) {
        toast.error("A senha deve ter no mínimo 8 caracteres.")
        setLoading(false)
        return
      }

      const signupMutate = await signup({ name, email, password })

      if (signupMutate) {
        toast.success("Cadastro realizado com sucesso!")
      }
    } catch (error) {
      toast.error("Erro ao realizar cadastro. Tente novamente.")
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
            Criar conta
          </CardTitle>
          <CardDescription>
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-700">Nome completo</Label>
              <Input
                id="name"
                type="text"
                value={name}
                placeholder="Seu nome completo"
                onChange={(e) => setName(e.target.value)}
                iconName="UserRoundIcon"
              />
            </div>

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
            <span className="text-xs text-gray-500">A senha deve ter no mínimo 8 caracteres</span>

            <Button type="submit" className="w-full bg-brand-base" disabled={loading}>Cadastrar</Button>

            <SectionDivisor content="ou" />

            <div className="flex flex-col justify-center items-center gap-4">
              <span className="text-gray-600 font-normal text-sm">Já tem uma conta?</span>
              <Link
                to="/login"
                className="w-full bg-gray-100 flex justify-center items-center gap-2 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-200 transition-colors border-gray-200 border-2"
              >
                <LogInIcon />
                <span>
                  Fazer login
                </span>
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}