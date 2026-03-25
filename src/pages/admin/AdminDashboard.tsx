import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  BarChart3,
  Users,
  CalendarDays,
  Search,
  Filter,
  Download,
  Edit,
  LogOut,
  LayoutDashboard,
  Settings,
  Bell,
  Sparkles,
  Menu,
  X
} from "lucide-react";

interface Appointment {
  _id: string;
  name: string;
  phone: string;
  service: string;
  message?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY || "";

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const { data, error, isError, isLoading, refetch, isFetching } = useQuery<Appointment[], Error>({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!ADMIN_API_KEY) {
        throw new Error("Admin API key is not provided. Set VITE_ADMIN_API_KEY in .env.local.");
      }
      const response = await fetch(`${BASE_API_URL}/appointments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ADMIN_API_KEY,
        },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to fetch appointments");
      }

      const result = await response.json();
      return result.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`${BASE_API_URL}/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ADMIN_API_KEY,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to update appointment");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Appointment status updated successfully");
      setIsUpdateDialogOpen(false);
      setSelectedAppointment(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const filteredAppointments = data?.filter((appointment) => {
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    const matchesSearch =
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  }) || [];

  const stats = {
    total: data?.length || 0,
    pending: data?.filter(a => a.status === "Pending").length || 0,
    confirmed: data?.filter(a => a.status === "Confirmed").length || 0,
    completed: data?.filter(a => a.status === "Completed").length || 0,
    cancelled: data?.filter(a => a.status === "Cancelled").length || 0,
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Pending: "secondary",
      Confirmed: "default",
      Completed: "default",
      Cancelled: "destructive",
    };

    const icons = {
      Pending: <Clock className="w-3 h-3 text-yellow-500" />,
      Confirmed: <CheckCircle className="w-3 h-3 text-green-500" />,
      Completed: <CheckCircle className="w-3 h-3 text-blue-500" />,
      Cancelled: <XCircle className="w-3 h-3" />,
    };

    return (
      <Badge variant={variants[status] || "outline"} className={`flex items-center gap-1.5 px-2.5 py-1 ${status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 border-transparent' : status === 'Confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-100/80 border-transparent' : status === 'Completed' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100/80 border-transparent' : ''}`}>
        {icons[status as keyof typeof icons] || <AlertCircle className="w-3 h-3" />}
        {status}
      </Badge>
    );
  };

  const handleStatusUpdate = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status);
    setIsUpdateDialogOpen(true);
  };

  const confirmStatusUpdate = () => {
    if (selectedAppointment && newStatus !== selectedAppointment.status) {
      updateStatusMutation.mutate({ id: selectedAppointment._id, status: newStatus });
    } else {
      setIsUpdateDialogOpen(false);
    }
  };

  const exportToCSV = () => {
    if (!filteredAppointments.length) return;

    const headers = ["Date", "Name", "Phone", "Service", "Status", "Message"];
    const csvContent = [
      headers.join(","),
      ...filteredAppointments.map(apt => [
        new Date(apt.createdAt).toLocaleString("en-NP", { timeZone: "Asia/Kathmandu" }),
        `"${apt.name}"`,
        apt.phone,
        apt.service,
        apt.status,
        `"${apt.message || ""}"`,
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r w-64 flex-shrink-0 z-20">
      <div className="h-16 flex items-center px-6 border-b">
        <Sparkles className="h-6 w-6 text-primary mr-2" />
        <span className="font-bold text-xl tracking-tight text-primary">Smile Connect</span>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Internal Tools</h3>
        <Button variant="secondary" className="w-full justify-start h-10 px-3 bg-primary/10 text-primary hover:bg-primary/20">
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start h-10 px-3 hover:bg-muted" disabled>
          <CalendarDays className="mr-3 h-5 w-5 opacity-50" />
          Calendar
        </Button>
        <Button variant="ghost" className="w-full justify-start h-10 px-3 hover:bg-muted" disabled>
          <Users className="mr-3 h-5 w-5 opacity-50" />
          Patients
        </Button>
        <Button variant="ghost" className="w-full justify-start h-10 px-3 hover:bg-muted" disabled>
          <Settings className="mr-3 h-5 w-5 opacity-50" />
          Settings
        </Button>
      </div>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50 dark:bg-gray-950/50 font-sans">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/50 z-20 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-30 shadow-xl"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white dark:bg-gray-900 border-b shrink-0 z-10">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Appointments Overview</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              {stats.pending > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-white dark:border-gray-900" />
              )}
            </Button>
            <div className="hidden sm:flex items-center gap-2 ml-2 pl-4 border-l">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                A
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Main Content Scroll Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                      <h3 className="text-3xl font-bold mt-2 text-foreground">{isLoading ? "-" : stats.total}</h3>
                    </div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500"><BarChart3 className="h-5 w-5" /></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/10 dark:to-gray-900 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500">Pending</p>
                      <h3 className="text-3xl font-bold mt-2 text-foreground">{isLoading ? "-" : stats.pending}</h3>
                    </div>
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg text-yellow-600"><Clock className="h-5 w-5" /></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/10 dark:to-gray-900 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-500">Confirmed</p>
                      <h3 className="text-3xl font-bold mt-2 text-foreground">{isLoading ? "-" : stats.confirmed}</h3>
                    </div>
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg text-green-600"><CheckCircle className="h-5 w-5" /></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-500">Completed</p>
                      <h3 className="text-3xl font-bold mt-2 text-foreground">{isLoading ? "-" : stats.completed}</h3>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600"><CalendarDays className="h-5 w-5" /></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-gray-900 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-red-600 dark:text-red-500">Cancelled</p>
                      <h3 className="text-3xl font-bold mt-2 text-foreground">{isLoading ? "-" : stats.cancelled}</h3>
                    </div>
                    <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg text-red-600"><XCircle className="h-5 w-5" /></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Action Bar */}
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex-1 w-full max-w-sm relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients, phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 bg-muted/50 border-transparent focus-visible:bg-transparent transition-colors"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-48">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="pl-9 h-10">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => refetch()} disabled={isFetching} className="h-10 w-10 shrink-0">
                      <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin text-primary' : ''}`} />
                    </Button>
                    <Button onClick={exportToCSV} variant="secondary" disabled={!filteredAppointments.length} className="h-10 shrink-0">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointments Data Table */}
            <Card className="border-border/50 shadow-sm overflow-hidden">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                  <RefreshCw className="w-8 h-8 animate-spin text-primary/50 mb-4" />
                  <p>Loading appointments grid...</p>
                </div>
              ) : !filteredAppointments.length ? (
                <div className="flex flex-col items-center justify-center py-24 text-center px-4">
                  <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <Search className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No appointments found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    We couldn't find any appointments matching your current search or filter criteria.
                  </p>
                  {(searchTerm || statusFilter !== "all") && (
                    <Button 
                      variant="link" 
                      onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
                      className="mt-4"
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50 text-xs uppercase tracking-wider">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="font-semibold text-muted-foreground w-[200px]">Date & Time</TableHead>
                        <TableHead className="font-semibold text-muted-foreground">Patient</TableHead>
                        <TableHead className="font-semibold text-muted-foreground">Contact</TableHead>
                        <TableHead className="font-semibold text-muted-foreground">Service</TableHead>
                        <TableHead className="font-semibold text-muted-foreground w-[150px]">Status</TableHead>
                        <TableHead className="font-semibold text-muted-foreground max-w-[200px]">Message</TableHead>
                        <TableHead className="text-right font-semibold text-muted-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {filteredAppointments.map((appointment) => (
                          <motion.tr 
                            key={appointment._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="group transition-colors border-b hover:bg-muted/30"
                          >
                            <TableCell className="align-top py-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary/5 rounded-md text-primary mt-0.5">
                                  <Calendar className="w-4 h-4" />
                                </div>
                                <div className="space-y-1">
                                  <div className="font-medium text-foreground">
                                    {new Date(appointment.createdAt).toLocaleDateString("en-NP", {
                                      timeZone: "Asia/Kathmandu",
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric"
                                    })}
                                  </div>
                                  <div className="text-xs text-muted-foreground font-medium">
                                    {new Date(appointment.createdAt).toLocaleTimeString("en-NP", {
                                      timeZone: "Asia/Kathmandu",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground capitalize">
                                  {appointment.name.charAt(0)}
                                </div>
                                <span className="font-semibold text-foreground">{appointment.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-3.5 h-3.5" />
                                <span className="font-medium text-foreground">{appointment.phone}</span>
                              </div>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                                {appointment.service}
                              </span>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              {getStatusBadge(appointment.status)}
                            </TableCell>
                            <TableCell className="align-top py-4 max-w-[250px]">
                              {appointment.message ? (
                                <div className="flex items-start gap-2">
                                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground mt-1 shrink-0" />
                                  <p className="text-sm text-muted-foreground line-clamp-2" title={appointment.message}>
                                    {appointment.message}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-muted-foreground/50 text-sm italic">No message provided</span>
                              )}
                            </TableCell>
                            <TableCell className="align-top py-4 text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleStatusUpdate(appointment)}
                              >
                                <Edit className="w-4 h-4 mr-2 text-primary" />
                                <span className="text-primary font-medium">Edit</span>
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Manage Appointment
            </DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Patient Name</p>
                  <p className="font-semibold text-foreground">{selectedAppointment.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Service</p>
                  <p className="font-semibold text-foreground capitalize">{selectedAppointment.service}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="status-select" className="text-sm font-medium">Update Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending Validation</SelectItem>
                    <SelectItem value="Confirmed">Confirmed Checkup</SelectItem>
                    <SelectItem value="Completed">Successfully Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">This will update the internal state of the appointment.</p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="ghost" onClick={() => setIsUpdateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={confirmStatusUpdate}
                  disabled={updateStatusMutation.isPending || newStatus === selectedAppointment.status}
                  className="min-w-[120px]"
                >
                  {updateStatusMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;