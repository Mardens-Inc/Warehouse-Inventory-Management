import React, {ReactNode} from "react";
import {Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Tooltip} from "@heroui/react";
import {useNavigate} from "react-router-dom";
import DashboardIcon from "../images/icons/DashboardIcon.tsx";
import PurchasesIcon from "../images/icons/PurchasesIcon.tsx";
import InventoryIcon from "../images/icons/InventoryIcon.tsx";
import VendorIcon from "../images/icons/VendorIcon.tsx";
import GearIcon from "../images/icons/GearIcon.tsx";
import NotificationIcon from "../images/icons/NotificationIcon.tsx";
import AccountDropdown from "./AccountDropdown.tsx";
import Logo from "../images/Logo.tsx";
import {getCurrentTheme, Theme} from "../ts/Theme.ts";
import Notification, {NotificationAction, NotificationUrgency} from "./Notification.tsx";

interface Page
{
    name: string;
    url: string;
    icon: (props: { isCurrentPage: boolean }) => ReactNode;
}

export default function Navigation()
{

    if (window.location.pathname.startsWith("/print"))
    {
        return;
    }
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pages: Page[] = [
        {
            name: "Dashboard",
            url: "/app/",
            icon: ({isCurrentPage}) => (
                <DashboardIcon fill={isCurrentPage ? (getCurrentTheme() === Theme.dark ? "hsl(var(--heroui-primary-L000))" : "hsl(var(--heroui-foreground-L000))") : "hsl(0, 0%, 50%)"}/>
            )
        },
        {
            name: "Purchases",
            url: "/app/purchases",
            icon: ({isCurrentPage}) => (
                <PurchasesIcon fill={isCurrentPage ? (getCurrentTheme() === Theme.dark ? "hsl(var(--heroui-primary-L000))" : "hsl(var(--heroui-foreground-L000))") : "hsl(0, 0%, 50%)"}/>
            )
        },
        {
            name: "Inventory",
            url: "/app/inventory",
            icon: ({isCurrentPage}) => (
                <InventoryIcon fill={isCurrentPage ? (getCurrentTheme() === Theme.dark ? "hsl(var(--heroui-primary-L000))" : "hsl(var(--heroui-foreground-L000))") : "hsl(0, 0%, 50%)"}/>
            )
        },
        {
            name: "Vendors",
            url: "/app/vendors",
            icon: ({isCurrentPage}) => (
                <VendorIcon fill={isCurrentPage ? (getCurrentTheme() === Theme.dark ? "hsl(var(--heroui-primary-L000))" : "hsl(var(--heroui-foreground-L000))") : "hsl(0, 0%, 50%)"}/>
            )
        }
    ];
    const menuItems = pages.map((item, index) =>
    {
        const isCurrentPage = window.location.pathname === item.url;
        return (
            <NavbarMenuItem key={`${item}-${index}`}>
                <Button
                    tabIndex={-1}
                    href={item.url}
                    aria-current={isCurrentPage}
                    size="lg"
                    variant={isCurrentPage ? "flat" : "ghost"}
                    className="w-full bg-background-L-100 hover:!text-foreground-L000 hover:!bg-background-L200 hover:!border-transparent"
                    style={{
                        color: isCurrentPage ? "hsl(var(--heroui-foreground-L000))" : "hsl(0, 0%, 50%)",
                        backgroundColor: isCurrentPage ? "hsl(var(--heroui-background-L200))" : "transparent"
                    }}
                    radius={"full"}
                    startContent={item.icon({isCurrentPage})}
                    onPress={() => navigate(item.url)}
                >
                    {item.name}
                </Button>
            </NavbarMenuItem>
        );
    });


    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth={"full"} className={"bg-transparent"} isBlurred={false} position={"static"}>
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden"/>
                <NavbarBrand>
                    <Logo fill={"hsl(var(--heroui-foreground-L000))"}/>
                </NavbarBrand>
            </NavbarContent>
            {
                window.location.pathname.startsWith("/app/") && (
                    <>
                        <NavbarContent className="hidden sm:flex gap-4" justify="center">
                            {menuItems}
                        </NavbarContent>
                        <NavbarContent justify="end">
                            <NavbarItem>
                                <Tooltip content={"Open Settings"}>
                                    <Button
                                        className={"bg-background-L200 text-foreground-L-100 w-[2.5rem] h-[2.5rem] p-0 min-w-0 aspect-square"}
                                        onPress={() => navigate("/app/settings")}
                                    >
                                        <GearIcon fill={"hsl(var(--heroui-foreground-L000))"}/>
                                    </Button>
                                </Tooltip>
                            </NavbarItem>
                            <NavbarItem>
                                <Tooltip content={"Open Notifications"}>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button className={"bg-background-L200 text-foreground-L-100 w-[2.5rem] h-[2.5rem] p-0 min-w-0 aspect-square"}>
                                                <Badge className={"bg-accent-L000 aspect-square"}>
                                                    <NotificationIcon fill={"hsl(var(--heroui-foreground-L000))"}/>
                                                </Badge>
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            closeOnSelect={false}
                                            disabledKeys={["no-items"]}
                                            className="p-3"
                                            itemClasses={{
                                                base: [
                                                    "rounded-md",
                                                    "text-default-800 dark:text-default-500",
                                                    "transition-opacity cursor-default",
                                                    "data-[hover=true]:text-foreground",
                                                    "data-[hover=true]:bg-background-L100",
                                                    "data-[selectable=true]:focus:bg-default-50",
                                                    "data-[pressed=true]:opacity-70",
                                                    "data-[focus-visible=true]:ring-default-500"
                                                ]
                                            }}
                                        >
                                            <DropdownItem closeOnSelect={false} key="info-notification">
                                                <Notification
                                                    name={"Test"}
                                                    description={"This is a test of the notification system, please ignore."}
                                                    actions={[NotificationAction.CLOSE]}
                                                    urgency={NotificationUrgency.INFO}
                                                />
                                            </DropdownItem>
                                            <DropdownItem closeOnSelect={false} key="warning-notification">
                                                <Notification
                                                    name={"Test"}
                                                    description={"This is a test of the notification system, please ignore."}
                                                    actions={[NotificationAction.VIEW, NotificationAction.CLOSE]}
                                                    urgency={NotificationUrgency.WARNING}
                                                />
                                            </DropdownItem>
                                            <DropdownItem closeOnSelect={false} key="error-notification">
                                                <Notification
                                                    name={"Test"}
                                                    description={"This is a test of the notification system, please ignore."}
                                                    actions={[NotificationAction.ACCEPT, NotificationAction.DECLINE]}
                                                    urgency={NotificationUrgency.ERROR}
                                                />
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Tooltip>
                            </NavbarItem>
                            <NavbarItem>
                                <AccountDropdown/>
                            </NavbarItem>
                        </NavbarContent>

                        <NavbarMenu
                            className={"sm:hidden"}
                        >
                            {menuItems}
                        </NavbarMenu>
                    </>
                )
            }
        </Navbar>
    )
        ;
}
