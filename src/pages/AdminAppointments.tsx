import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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

const AdminAppointments = () => {
  const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY || "";

  const { data, error, isLoading, refetch } = useQuery<Appointment[], Error>({
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
    if (error) {
      console.error("AdminAppointments error:", error);
      toast.error(error.message);
    }
  }, [error]);

  if (isLoading) {
    return (
      <main className="min-h-screen grid place-items-center py-20">
        <p className="text-lg">Loading appointments...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Admin Appointments</h1>
          <Button onClick={() => refetch()}>Refresh</Button>
        </div>

        {!ADMIN_API_KEY && (
          <div className="rounded-lg border border-destructive p-4 bg-destructive/10 text-destructive">
            Set <code>VITE_ADMIN_API_KEY</code> in <code>.env.local</code> to retrieve appointments.
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive p-4 bg-destructive/10 text-destructive">
            {error.message}
          </div>
        )}

        {!data?.length ? (
          <div className="rounded-lg border border-muted p-4 bg-muted/20 text-muted-foreground">
            No appointments found.
          </div>
        ) : (
          <div className="overflow-auto rounded-xl border border-border bg-background">
            <table className="min-w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Message</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="border-t border-border">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleString("en-NP", {
                        timeZone: "Asia/Kathmandu",
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.phone}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.service}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.status}</td>
                    <td className="px-4 py-3 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{item.message || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminAppointments;
