import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  loadAdminConfig, 
  saveAdminConfig, 
  verifyPassword, 
  changePassword,
  type AdminConfig 
} from "@/utils/adminConfig";
import { Lock, Calendar, BarChart3, Save, Eye, EyeOff } from "lucide-react";
import LightRays from "@/components/LightRays";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Verificar se já está autenticado
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      const savedConfig = loadAdminConfig();
      setConfig(savedConfig);
    }
  }, []);

  const handleLogin = () => {
    if (verifyPassword(password)) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      const savedConfig = loadAdminConfig();
      setConfig(savedConfig);
      toast({
        title: "Acesso autorizado",
        description: "Bem-vindo à área administrativa",
      });
    } else {
      toast({
        title: "Senha incorreta",
        description: "Por favor, tente novamente",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setPassword("");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado",
    });
  };

  const handleSaveConfig = () => {
    if (!config) return;
    
    try {
      saveAdminConfig(config);
      toast({
        title: "Configurações salvas",
        description: "As alterações foram salvas com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas devem ser iguais",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    if (changePassword(oldPassword, newPassword)) {
      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast({
        title: "Senha atual incorreta",
        description: "Verifique a senha atual",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary-light p-4 relative overflow-hidden">
        <LightRays 
          raysOrigin="top-center"
          raysColor="#61dca3"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={2.5}
          pulsating={true}
          fadeDistance={1.5}
          saturation={0.9}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.05}
          distortion={0.1}
        />
        <Card className="w-full max-w-md relative z-10">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Área Administrativa</CardTitle>
            <CardDescription>
              Digite sua senha para acessar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Digite sua senha"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full" size="lg">
              Entrar
            </Button>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline" 
              className="w-full"
            >
              Voltar para o site
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!config) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 relative overflow-hidden">
      <LightRays 
        raysOrigin="top-center"
        raysColor="#61dca3"
        raysSpeed={0.8}
        lightSpread={1.2}
        rayLength={2.5}
        pulsating={true}
        fadeDistance={1.5}
        saturation={0.9}
        followMouse={true}
        mouseInfluence={0.15}
        noiseAmount={0.05}
        distortion={0.1}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Área Administrativa</h1>
            <p className="text-muted-foreground">Gerencie as configurações do webinar e tracking</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="webinar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Webinar
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Tracking
            </TabsTrigger>
          </TabsList>

          {/* Tab: Analytics */}
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          {/* Tab: Configurações do Webinar */}
          <TabsContent value="webinar">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Webinar</CardTitle>
                <CardDescription>
                  Defina a data e horário do próximo webinar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ano">Ano</Label>
                    <Input
                      id="ano"
                      type="number"
                      value={config.webinar.ano}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          webinar: { ...config.webinar, ano: parseInt(e.target.value) || 2025 },
                        })
                      }
                      min="2024"
                      max="2030"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mes">Mês</Label>
                    <Input
                      id="mes"
                      type="number"
                      value={config.webinar.mes}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          webinar: { ...config.webinar, mes: parseInt(e.target.value) || 1 },
                        })
                      }
                      min="1"
                      max="12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dia">Dia</Label>
                    <Input
                      id="dia"
                      type="number"
                      value={config.webinar.dia}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          webinar: { ...config.webinar, dia: parseInt(e.target.value) || 1 },
                        })
                      }
                      min="1"
                      max="31"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora">Hora (0-23)</Label>
                    <Input
                      id="hora"
                      type="number"
                      value={config.webinar.hora}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          webinar: { ...config.webinar, hora: parseInt(e.target.value) || 0 },
                        })
                      }
                      min="0"
                      max="23"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minuto">Minuto (0-59)</Label>
                    <Input
                      id="minuto"
                      type="number"
                      value={config.webinar.minuto}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          webinar: { ...config.webinar, minuto: parseInt(e.target.value) || 0 },
                        })
                      }
                      min="0"
                      max="59"
                    />
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Data configurada:</p>
                  <p className="text-lg">
                    {new Date(
                      config.webinar.ano,
                      config.webinar.mes - 1,
                      config.webinar.dia,
                      config.webinar.hora,
                      config.webinar.minuto
                    ).toLocaleString("pt-BR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <Button onClick={handleSaveConfig} className="w-full sm:w-auto" size="lg">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: IDs de Tracking */}
          <TabsContent value="tracking">
            <Card>
              <CardHeader>
                <CardTitle>IDs de Tracking</CardTitle>
                <CardDescription>
                  Configure os IDs das ferramentas de tracking e analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaAdsPixelId">Meta Ads Pixel ID</Label>
                    <Input
                      id="metaAdsPixelId"
                      type="text"
                      value={config.tracking.metaAdsPixelId}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          tracking: { ...config.tracking, metaAdsPixelId: e.target.value },
                        })
                      }
                      placeholder="Ex: 123456789012345"
                    />
                    <p className="text-xs text-muted-foreground">
                      Encontre no Events Manager do Facebook
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="googleAdsConversionId">Google Ads Conversion ID</Label>
                    <Input
                      id="googleAdsConversionId"
                      type="text"
                      value={config.tracking.googleAdsConversionId}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          tracking: { ...config.tracking, googleAdsConversionId: e.target.value },
                        })
                      }
                      placeholder="Ex: AW-123456789"
                    />
                    <p className="text-xs text-muted-foreground">
                      Encontre no Google Ads em Ferramentas → Conversões
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                    <Input
                      id="googleAnalyticsId"
                      type="text"
                      value={config.tracking.googleAnalyticsId}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          tracking: { ...config.tracking, googleAnalyticsId: e.target.value },
                        })
                      }
                      placeholder="Ex: G-XXXXXXXXXX"
                    />
                    <p className="text-xs text-muted-foreground">
                      Encontre no Google Analytics em Administrador → Propriedades
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
                    <Input
                      id="googleTagManagerId"
                      type="text"
                      value={config.tracking.googleTagManagerId}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          tracking: { ...config.tracking, googleTagManagerId: e.target.value },
                        })
                      }
                      placeholder="Ex: GTM-XXXXXXX"
                    />
                    <p className="text-xs text-muted-foreground">
                      Encontre no Google Tag Manager no topo da página
                    </p>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Nota:</p>
                  <p className="text-xs text-muted-foreground">
                    Os scripts de tracking serão carregados automaticamente após salvar. 
                    Se você usar Google Tag Manager, não é necessário configurar Google Analytics separadamente.
                  </p>
                </div>

                <Button onClick={handleSaveConfig} className="w-full sm:w-auto" size="lg">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>

            {/* Alterar Senha */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <CardDescription>
                  Altere a senha de acesso à área administrativa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Senha Atual</Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Digite sua senha atual"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite a nova senha (mínimo 6 caracteres)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a nova senha"
                  />
                </div>
                <Button onClick={handleChangePassword} variant="outline" className="w-full sm:w-auto">
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

