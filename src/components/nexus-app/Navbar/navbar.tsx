'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { fetchData } from '@/lib/fetch';
import { useAppStore } from '@/store/appStore';
import { access } from 'fs';
import { CircleUser, Menu, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react';
import MenuChart from '../Sidebar/ListFolders';
import MarketingBlock from '../MarketingBlock/MarketingBlock';
import useDashboardStore from '@/store/dashboardStore';
import UserApi from '@/data/model/user';

interface NavbarProps {
  asSidebar?: boolean;
}

const Navbar: React.FC = ({ asSidebar = true }: NavbarProps) => {
  const t = useTranslations('common');
  const router = useRouter();

  const appStore = useAppStore();
  const resetData = useDashboardStore((state: any) => state.restoreData);
  const { account, user, setUser }: any = appStore;
  const theme = useAppStore((state: any) => state.theme);
  const setTheme = useAppStore((state: any) => state.setTheme);
  const userApi = new UserApi();

  const versionApp = process.env.NEXT_PUBLIC_VERSION_APP;

  const handleLogout = async () => {
    try {
      const response = await fetchData(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/logout`
      );
      if (response?.ok) {
        resetData();
        router.push('signin');
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const changeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    userApi.updateTheme(newTheme).then((data) => {
      setUser(data)
    })
  };

  return (
    <header className="fixed z-40 grid h-14 w-full grid-cols-[1fr_1fr] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] items-center border-b px-4 lg:h-[60px] lg:px-6 bg-background ">
      <div
        className={`flex h-full items-center ${asSidebar ? 'md:border-r' : ''}`}
      >
        <div className='flex gap 2 items-center'>
          <Link href={'/dashboard'} className="hidden md:flex">
            <h1 className="font-semibold">Nexus</h1>
          </Link>
          <Badge variant="tester" className="hidden md:flex ml-2">Alpha {versionApp}</Badge>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col items-center w-[350px]"
          >
            <MenuChart />
            <MarketingBlock/>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex justify-end items-center gap-2 h-full">
        <Button onClick={changeTheme} variant="ghost" className='p-2 rounded-full'>
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <span className='text-muted-foreground text-sm font-normal'>{user?.email}</span>
              {account?.status && (
                <Badge
                  className="ml-2"
                  variant={account?.status.toLowerCase() as any}
                >
                  {account?.status}
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/setting">{t('settings')}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
