import { useEffect, useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { ChartAreaInteractive } from "../../components/chart-area-interactive";
import { DataTable } from "../../components/data-table";
import { SectionCards } from "../../components/section-cards";
import { SiteHeader } from "../../components/site-header";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    let auth = Cookies.get("auth");
    let data = await fetch("http://localhost:3333/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });

    let obj = await data.json();
    setUsers(obj.data);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                {!isLoading ? <DataTable data={users}/> : <>loading..</>}
              </div>
            }
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
