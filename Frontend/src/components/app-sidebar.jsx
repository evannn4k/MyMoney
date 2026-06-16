import {
    faChartColumn,
    faClockRotateLeft,
    faWallet,
    faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuAction,
    SidebarMenuBadge,
} from "@/components/ui/sidebar";
import PrimaryLogo from "@/assets/images/logo/primary_logo.png";

export function AppSidebar() {
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/dashboard">
                                <img
                                    src={PrimaryLogo}
                                    alt="logo"
                                    className="aspect-square size-8"
                                />
                                <div className="flex flex-col gap-1 leading-none">
                                    <span className="font-semibold">
                                        MyMoney
                                    </span>
                                    <span className="">Catat keuanganmu</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
                    <SidebarMenu className="gap-1">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/dashboard">
                                    <FontAwesomeIcon icon={faChartColumn} />
                                    <span>Dashboard</span>
                                </a>
                            </SidebarMenuButton>
                            <SidebarMenuAction>
                                <span className="sr-only">Dashboard</span>
                            </SidebarMenuAction>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/note">
                                    <FontAwesomeIcon icon={faReceipt} />
                                    <span>Catat</span>
                                </a>
                            </SidebarMenuButton>
                            <SidebarMenuAction>
                                <span className="sr-only">Catat</span>
                            </SidebarMenuAction>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/wallet">
                                    <FontAwesomeIcon icon={faWallet} />
                                    <span>Dompet</span>
                                </a>
                            </SidebarMenuButton>
                            <SidebarMenuAction>
                                <span className="sr-only">Dompet</span>
                            </SidebarMenuAction>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/history">
                                    <FontAwesomeIcon icon={faClockRotateLeft} />
                                    <span>Riwayat</span>
                                </a>
                            </SidebarMenuButton>
                            <SidebarMenuAction>
                                <span className="sr-only">Riwayat</span>
                            </SidebarMenuAction>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>Username</SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

// SidebarProvider
// ├── Sidebar
// │   ├── SidebarHeader
// │   ├── SidebarContent
// │   │   ├── SidebarGroup
// │   │   │   ├── SidebarGroupLabel
// │   │   │   ├── SidebarGroupAction
// │   │   │   ├── SidebarGroupContent
// │   │   │   └── SidebarMenu
// │   │   │       ├── SidebarMenuItem
// │   │   │       │   ├── SidebarMenuButton
// │   │   │       │   ├── SidebarMenuAction
// │   │   │       │   └── SidebarMenuBadge
// │   │   │       └── SidebarMenuItem
// │   │   │           ├── SidebarMenuButton
// │   │   │           └── SidebarMenuSub
// │   │   │               ├── SidebarMenuSubItem
// │   │   │               └── SidebarMenuSubItem
// │   │   └── SidebarGroup
// │   │       └── SidebarMenu
// │   │           ├── SidebarMenuItem
// │   │           └── SidebarMenuItem
// │   ├── SidebarFooter
// │   └── SidebarRail
// ├── SidebarInset
// └── SidebarTrigger
