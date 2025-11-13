import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  Calendar,
  Download,
  Smartphone,
  MapPin,
  Monitor,
  Tablet,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { calculateMetrics, getTimeSeriesData, formatTime, formatPercentage, type Period } from "@/utils/analyticsData";
import { exportAnalyticsData, clearAnalyticsData, getAnalyticsData } from "@/utils/analytics";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 10;

export const AnalyticsDashboard = () => {
  const [period, setPeriod] = useState<Period>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  // Obter dados de forma segura
  const analyticsData = getAnalyticsData();
  
  // Debug
  console.log('📊 Analytics Data:', {
    visits: analyticsData.visits?.length || 0,
    formCompletions: analyticsData.formCompletions?.length || 0,
    period
  });
  
  // Calcular métricas apenas se houver dados
  const metrics = calculateMetrics(period);
  const timeSeriesData = getTimeSeriesData(period);

  // Filtrar e paginar leads (com proteção)
  const genderLabels: Record<string, string> = {
    'male': 'Masculino',
    'female': 'Feminino',
    'other': 'Outro',
    'prefer-not-say': 'Não informado'
  };

  const allLeads = (analyticsData.formCompletions || []).map(completion => {
    const visit = analyticsData.visits?.find(v => v.sessionId === completion.sessionId);
    
    return {
      id: completion.id,
      timestamp: completion.timestamp,
      accessHour: completion.accessHour || new Date(completion.timestamp).toLocaleString('pt-BR'),
      location: completion.location || visit?.location,
      device: completion.device || visit?.device,
      timeToComplete: completion.timeToComplete,
      gender: completion.gender ? genderLabels[completion.gender] : undefined,
      age: completion.age,
    };
  }).sort((a, b) => b.timestamp - a.timestamp);

  const filteredLeads = allLeads.filter(lead => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      lead.location?.city.toLowerCase().includes(searchLower) ||
      lead.location?.region.toLowerCase().includes(searchLower) ||
      lead.device?.type.toLowerCase().includes(searchLower) ||
      lead.device?.browser.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleExport = () => {
    const data = exportAnalyticsData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Dados exportados",
      description: "Os dados foram baixados com sucesso",
    });
  };

  const handleClear = () => {
    if (confirm("Tem certeza que deseja limpar todos os dados de analytics? Esta ação não pode ser desfeita.")) {
      clearAnalyticsData();
      toast({
        title: "Dados limpos",
        description: "Todos os dados de analytics foram removidos",
      });
      window.location.reload();
    }
  };

  const getPeriodLabel = (p: Period): string => {
    switch (p) {
      case 'day':
        return 'Dia atual';
      case 'week':
        return 'Últimos 7 dias';
      case 'month':
        return 'Últimos 30 dias';
      default:
        return 'Últimos 7 dias';
    }
  };

  // Cores para gráficos
  const DEVICE_COLORS = {
    'Mobile': '#3b82f6',
    'Desktop': '#10b981',
    'Tablet': '#f59e0b',
  };
  
  const GENDER_COLORS = {
    'Masculino': '#3b82f6',
    'Feminino': '#ec4899',
    'Outro': '#8b5cf6',
    'Não informado': '#6b7280',
  };

  // Preparar dados para gráficos (com proteção)
  const deviceChartData = (metrics.deviceDistribution || []).map(d => ({
    name: d.device,
    value: d.count,
    percentage: d.percentage,
  }));

  const locationChartData = (metrics.locationDistribution || []).slice(0, 10).map(l => ({
    location: l.location,
    count: l.count,
  }));
  
  const genderChartData = (metrics.genderDistribution || []).map(g => ({
    name: g.gender,
    value: g.count,
    percentage: g.percentage,
  }));
  
  const ageChartData = (metrics.ageDistribution || []).map(a => ({
    ageRange: a.ageRange,
    count: a.count,
  }));

  // Ícone de dispositivo
  const getDeviceIcon = (type?: string) => {
    if (!type) return <Monitor className="w-4 h-4" />;
    switch (type.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border/40">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
            Analytics
          </h2>
          <p className="text-muted-foreground text-base">
            Acompanhe as métricas da sua landing page em tempo real
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport} 
            className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 backdrop-blur-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleClear} 
            className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            Limpar Dados
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 p-1.5 rounded-xl shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 w-fit">
        <Button
          variant={period === 'day' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setPeriod('day')}
          className="gap-2 rounded-lg transition-all duration-200"
        >
          <Calendar className="w-4 h-4" />
          Dia
        </Button>
        <Button
          variant={period === 'week' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setPeriod('week')}
          className="gap-2 rounded-lg transition-all duration-200"
        >
          <Calendar className="w-4 h-4" />
          Semana
        </Button>
        <Button
          variant={period === 'month' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setPeriod('month')}
          className="gap-2 rounded-lg transition-all duration-200"
        >
          <Calendar className="w-4 h-4" />
          Mês
        </Button>
      </div>

      <div className="space-y-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-sm text-muted-foreground flex items-center gap-2 px-4 py-3 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/40">
          <Clock className="w-4 h-4 text-primary" />
          <span>Mostrando dados para: <span className="font-semibold text-foreground">{getPeriodLabel(period)}</span></span>
        </div>

          {/* Main Metrics Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Visits */}
            <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-xl bg-gradient-to-br from-blue-50/80 to-background dark:from-blue-950/30 dark:to-background/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Total de Visitas
                </CardTitle>
                <div className="p-2.5 bg-blue-500/10 backdrop-blur-sm rounded-xl">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  {metrics.totalVisits}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {getPeriodLabel(period)}
                </p>
              </CardContent>
            </Card>

            {/* Conversion Rate */}
            <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-background dark:from-green-950/30 dark:to-background/50">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Taxa de Conversão
                </CardTitle>
                <div className="p-2.5 bg-green-500/10 backdrop-blur-sm rounded-xl">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-bold bg-gradient-to-br from-green-600 to-green-500 dark:from-green-400 dark:to-green-300 bg-clip-text text-transparent">
                  {formatPercentage(metrics.conversionRate)}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {metrics.totalFormCompletions} cadastros
                </p>
              </CardContent>
            </Card>

            {/* Abandoned Forms */}
            <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-xl bg-gradient-to-br from-orange-50/80 to-background dark:from-orange-950/30 dark:to-background/50">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Formulários Abandonados
                </CardTitle>
                <div className="p-2.5 bg-orange-500/10 backdrop-blur-sm rounded-xl">
                  <UserX className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-500 dark:from-orange-400 dark:to-orange-300 bg-clip-text text-transparent">
                  {metrics.abandonedForms}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatPercentage(metrics.abandonmentRate)} de abandono
                </p>
              </CardContent>
            </Card>

            {/* Average Time on Page */}
            <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-xl bg-gradient-to-br from-purple-50/80 to-background dark:from-purple-950/30 dark:to-background/50">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent"></div>
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Tempo Médio na Página
                </CardTitle>
                <div className="p-2.5 bg-purple-500/10 backdrop-blur-sm rounded-xl">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-purple-500 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent">
                  {formatTime(metrics.averageTimeOnPage)}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Por visitante
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics - Device, Location, Time */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Top Device */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-primary" />
                  Dispositivo Mais Usado
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metrics.deviceDistribution.length > 0 ? (
                  <>
                    <div className="text-2xl font-bold">
                      {metrics.deviceDistribution[0].device}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metrics.deviceDistribution[0].count} acessos ({formatPercentage(metrics.deviceDistribution[0].percentage)})
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Sem dados</p>
                )}
              </CardContent>
            </Card>

            {/* Top Location */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Localização Principal
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metrics.locationDistribution.length > 0 ? (
                  <>
                    <div className="text-2xl font-bold">
                      {metrics.locationDistribution[0].location}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metrics.locationDistribution[0].count} visitantes ({formatPercentage(metrics.locationDistribution[0].percentage)})
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Sem dados</p>
                )}
              </CardContent>
            </Card>

            {/* Total Registrations */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  Total de Cadastros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.totalFormCompletions}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Cadastros completos no período
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Visits Over Time */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Visitas ao Longo do Tempo</CardTitle>
                <CardDescription>
                  Evolução das visitas no período selecionado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorVisits)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Form Conversions vs Abandonments */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Cadastros vs Abandonos</CardTitle>
                <CardDescription>
                  Comparação entre formulários completados e abandonados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="formCompletions" 
                      fill="hsl(142 76% 36%)" 
                      name="Cadastros"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                      dataKey="abandonedForms" 
                      fill="hsl(24 95% 53%)" 
                      name="Abandonos"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Device Distribution Pie Chart */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Distribuição por Dispositivo</CardTitle>
                <CardDescription>
                  Porcentagem de acessos por tipo de dispositivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                {deviceChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={DEVICE_COLORS[entry.name as keyof typeof DEVICE_COLORS] || '#94a3b8'} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Sem dados de dispositivos
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Location Distribution Bar Chart */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Top 10 Localizações</CardTitle>
                <CardDescription>
                  Cidades com mais visitantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {locationChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={locationChartData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        type="number"
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        type="category"
                        dataKey="location" 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        width={120}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="hsl(var(--primary))"
                        radius={[0, 8, 8, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Sem dados de localização
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hour Distribution */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Acessos por Horário</CardTitle>
                <CardDescription>
                  Distribuição de visitas ao longo do dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={metrics.hourDistribution}>
                    <defs>
                      <linearGradient id="colorHour" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="hour" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorHour)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Gender Distribution Pie Chart */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Distribuição por Gênero</CardTitle>
                <CardDescription>
                  Distribuição de cadastros por gênero
                </CardDescription>
              </CardHeader>
              <CardContent>
                {genderChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={genderChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {genderChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={GENDER_COLORS[entry.name as keyof typeof GENDER_COLORS] || '#94a3b8'} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Sem dados de gênero
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Age Distribution Bar Chart */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Distribuição por Idade</CardTitle>
                <CardDescription>
                  Faixas etárias dos cadastrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ageChartData.length > 0 && ageChartData.some(a => a.count > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ageChartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="ageRange" 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="hsl(var(--primary))"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Sem dados de idade
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Day of Week Distribution */}
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Acessos por Dia da Semana</CardTitle>
                <CardDescription>
                  Distribuição de visitas ao longo da semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={metrics.dayOfWeekDistribution}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="day" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--primary))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Leads Table */}
          <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-xl font-bold">Detalhes dos Cadastros</CardTitle>
                  <CardDescription className="mt-1">
                    Lista completa de todos os leads cadastrados ({filteredLeads.length} no total)
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por localização, dispositivo..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-9 backdrop-blur-sm bg-background/80 border-border/60 focus:border-primary/60 transition-all duration-200"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {paginatedLeads.length > 0 ? (
                <>
                  <div className="rounded-xl border border-border/40 overflow-hidden backdrop-blur-sm bg-background/40">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30 border-b border-border/40 hover:bg-muted/40">
                          <TableHead className="font-bold text-foreground">Data/Hora</TableHead>
                          <TableHead className="font-bold text-foreground">Localização</TableHead>
                          <TableHead className="font-bold text-foreground">Dispositivo</TableHead>
                          <TableHead className="font-bold text-foreground">Gênero</TableHead>
                          <TableHead className="font-bold text-foreground">Idade</TableHead>
                          <TableHead className="font-bold text-foreground text-right">Tempo até Cadastro</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedLeads.map((lead) => (
                          <TableRow key={lead.id} className="hover:bg-muted/30 transition-all duration-200 border-b border-border/20 last:border-0">
                            <TableCell className="font-medium">
                              {lead.accessHour}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>
                                  {lead.location ? `${lead.location.city}, ${lead.location.region}` : 'Não disponível'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-primary/10 rounded-lg">
                                  {getDeviceIcon(lead.device?.type)}
                                </div>
                                <span className="capitalize text-xs">
                                  {lead.device?.type || 'N/D'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {lead.gender || 'Não informado'}
                            </TableCell>
                            <TableCell>
                              {lead.age ? `${lead.age} anos` : 'Não informado'}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="font-medium">{formatTime(lead.timeToComplete / 1000)}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 px-2">
                      <p className="text-sm text-muted-foreground font-medium">
                        Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} a {Math.min(currentPage * ITEMS_PER_PAGE, filteredLeads.length)} de {filteredLeads.length} cadastros
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="rounded-lg transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className="w-9 rounded-lg transition-all duration-200 hover:scale-105"
                              >
                                {pageNum}
                              </Button>
                            );
                          })}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="rounded-lg transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <UserX className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {searchTerm ? 'Nenhum cadastro encontrado com os filtros aplicados' : 'Ainda não há cadastros registrados'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Time Metrics */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Tempo até Iniciar Formulário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatTime(metrics.averageTimeToFormStart)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tempo médio desde a visita
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Tempo até Completar Cadastro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatTime(metrics.averageTimeToComplete)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tempo médio desde a visita
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg backdrop-blur-xl bg-background/60 border border-border/40 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Formulários Iniciados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics.totalFormStarts}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total no período
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
};
