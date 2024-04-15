import React from "react";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbar from "@/components/nexus-app/nav/navbar";
import Sidebar from "@/components/nexus-app/nav/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      <main className="w-full h-full">
        <div className="grid h-14 grid-cols-[1fr] md:grid-cols-[236px_1fr] lg:grid-cols-[304px_1fr]  w-full h-full">
          <Sidebar className="hidden md:flex"></Sidebar>
          <div className=" h-full p-4">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
