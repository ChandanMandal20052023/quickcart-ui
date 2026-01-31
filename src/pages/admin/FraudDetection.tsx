import { useState } from "react";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  FileText, 
  TrendingDown,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Search,
  AlertOctagon,
  Package,
  RotateCcw
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { cn } from "@/lib/utils";
import { 
  mockFraudAlerts, 
  mockInventoryMismatches, 
  mockAuditLogs,
  fraudStats 
} from "@/data/fraudDetectionData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ShopButton from "@/components/ui/ShopButton";

const FraudDetection = () => {
  const [activeTab, setActiveTab] = useState("alerts");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-destructive/80 text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertOctagon className="w-4 h-4 text-destructive" />;
      case 'investigating': return <Eye className="w-4 h-4 text-warning" />;
      case 'resolved': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'dismissed': return <XCircle className="w-4 h-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-destructive';
    if (score >= 60) return 'text-warning';
    return 'text-success';
  };

  const getVarianceColor = (variance: number) => {
    if (variance < -10) return 'text-destructive';
    if (variance < 0) return 'text-warning';
    return 'text-success';
  };

  const filteredAlerts = mockFraudAlerts.filter(alert => {
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    if (searchQuery && !alert.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', { 
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout 
      title="Fraud & Anomaly Detection" 
      subtitle="AI-powered security monitoring"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active Alerts"
          value={fraudStats.openCases}
          icon={AlertTriangle}
          variant="danger"
          subtitle={`${fraudStats.criticalAlerts} critical`}
        />
        <StatCard
          title="Risk Score (Avg)"
          value={fraudStats.averageRiskScore}
          icon={Activity}
          variant="warning"
          subtitle="Last 7 days"
        />
        <StatCard
          title="Potential Loss at Risk"
          value={`₹${fraudStats.potentialLossAtRisk.toLocaleString()}`}
          icon={TrendingDown}
          variant="danger"
          subtitle="Pending investigation"
        />
        <StatCard
          title="Inventory Accuracy"
          value={`${fraudStats.inventoryAccuracy}%`}
          icon={Package}
          variant="success"
          subtitle="Based on last audit"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Fraud Alerts
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Inventory Mismatches
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Audit Logs
          </TabsTrigger>
        </TabsList>

        {/* Fraud Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border-0 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 rounded-lg bg-muted border-0 text-sm focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={cn(
                  "p-4 rounded-xl border bg-card",
                  alert.severity === 'critical' && "border-destructive/50 bg-destructive/5",
                  alert.severity === 'high' && "border-destructive/30 bg-destructive/5"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {getStatusIcon(alert.status)}
                        <span className="capitalize">{alert.status}</span>
                      </div>
                      <span className={cn("font-bold text-lg", getRiskScoreColor(alert.riskScore))}>
                        {alert.riskScore}% Risk
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {alert.affectedItems.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-muted rounded text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(alert.detectedAt)}
                      </span>
                      {alert.assignedTo && (
                        <span>Assigned: {alert.assignedTo}</span>
                      )}
                    </div>
                    {alert.resolution && (
                      <div className="mt-2 p-2 bg-success/10 rounded-lg text-sm text-success">
                        ✓ {alert.resolution}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-destructive">
                      ₹{alert.potentialLoss.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Potential Loss</p>
                    {alert.status === 'open' && (
                      <ShopButton size="sm" className="mt-2">
                        Investigate
                      </ShopButton>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Inventory Mismatches Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">System Qty</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Physical Qty</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Variance</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Potential Cause</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Last Audit</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockInventoryMismatches.map((mismatch) => (
                    <tr key={mismatch.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{mismatch.productName}</p>
                          <p className="text-xs text-muted-foreground capitalize">{mismatch.category}</p>
                        </div>
                      </td>
                      <td className="p-4 text-center font-medium">{mismatch.systemQuantity}</td>
                      <td className="p-4 text-center font-medium">{mismatch.physicalQuantity}</td>
                      <td className="p-4 text-center">
                        <div className={cn("font-bold", getVarianceColor(mismatch.variancePercentage))}>
                          {mismatch.variance > 0 ? '+' : ''}{mismatch.variance}
                          <span className="text-xs ml-1">({mismatch.variancePercentage.toFixed(1)}%)</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-muted-foreground max-w-xs">{mismatch.potentialCause}</p>
                      </td>
                      <td className="p-4 text-center text-sm text-muted-foreground">
                        {new Date(mismatch.lastAuditDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </td>
                      <td className="p-4 text-center">
                        <ShopButton variant="outline" size="sm">
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Reconcile
                        </ShopButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Recent Activity</h3>
              <span className="text-sm text-muted-foreground">Showing last 24 hours</span>
            </div>
            <div className="divide-y divide-border">
              {mockAuditLogs.map((log) => (
                <div 
                  key={log.id}
                  className={cn(
                    "p-4 flex items-center gap-4",
                    log.riskFlag && "bg-destructive/5"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    log.riskFlag ? "bg-destructive/20" : "bg-muted"
                  )}>
                    {log.action === 'login' && <Activity className="w-5 h-5 text-muted-foreground" />}
                    {log.action === 'price_override' && <AlertTriangle className="w-5 h-5 text-warning" />}
                    {log.action === 'discount_applied' && <TrendingDown className="w-5 h-5 text-warning" />}
                    {log.action === 'void_transaction' && <XCircle className="w-5 h-5 text-destructive" />}
                    {log.action === 'refund_processed' && <RotateCcw className="w-5 h-5 text-muted-foreground" />}
                    {log.action === 'inventory_adjustment' && <Package className="w-5 h-5 text-muted-foreground" />}
                    {log.action === 'end_of_day' && <CheckCircle2 className="w-5 h-5 text-success" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{log.userName}</p>
                      {log.riskFlag && (
                        <Badge variant="destructive" className="text-xs">
                          Flagged
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{log.details}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm text-muted-foreground">{formatTime(log.timestamp)}</p>
                    <p className="text-xs text-muted-foreground">{log.ipAddress}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default FraudDetection;
