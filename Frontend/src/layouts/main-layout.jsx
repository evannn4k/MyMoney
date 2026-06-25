import { Outlet } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router";
// import { Toaster } from "sonner";

export default function MainLayout() {
    const routeTitles = {
        "/dashboard": "Dashboard",
        "/wallet": "Dompet",
        "/note": "Catat Transaksi",
        "/history": "Riwayat Transaksi",
    };

    const location = useLocation();
    // console.log(routeTitles["/dashboard"])
    const title = routeTitles[location.pathname];

    return (
        <>
            {/* <Toaster position="top-right" closeButton richColors /> */}
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <h1 className="font-medium font-base text-brand-700">
                                {title}
                            </h1>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                            <Outlet />
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
