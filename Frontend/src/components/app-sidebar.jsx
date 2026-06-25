import {
    faChartColumn,
    faClockRotateLeft,
    faWallet,
    faReceipt,
    faLayerGroup,
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
    useSidebar,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import PrimaryLogo from "@/assets/images/logo/primary_logo.png";
import Dfpp from "@/assets/images/dfpp.jpg";
import api from "@/services/api";
import { useNavigate } from "react-router";

export function AppSidebar() {
    const { isMobile } = useSidebar();
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const redirect = useNavigate();

    async function handleCLickLogout() {
        try {
            await api.post("/api/logout");

            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("token");

            redirect("/");
        } catch (e) {
            console.log(e);
        }
    }

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
                                    <span>Transaksi</span>
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
                                <a href="/category">
                                    <FontAwesomeIcon icon={faLayerGroup} />
                                    <span>Kategori</span>
                                </a>
                            </SidebarMenuButton>
                            <SidebarMenuAction>
                                <span className="sr-only">Kategori</span>
                            </SidebarMenuAction>
                        </SidebarMenuItem>
                        {/* <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/history">
                                    <FontAwesomeIcon icon={faClockRotateLeft} />
                                    <span>Riwayat</span>
                                </a>
                            </SidebarMenuButton>
                            <SidebarMenuAction>
                                <span className="sr-only">Riwayat</span>
                            </SidebarMenuAction>
                        </SidebarMenuItem> */}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            {/* <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>Username</SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter> */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={Dfpp} alt="avatar" />
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {email}
                                        </span>
                                    </div>
                                    {/* <ChevronsUpDown className="ml-auto size-4" /> */}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}>
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={Dfpp}
                                                alt="avatar"
                                            />
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <button onClick={handleCLickLogout}>
                                        Log out
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
