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
import { useAppStore } from '@/store/store';
import { access } from 'fs';
import { CircleUser, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use } from 'react';
import MenuChart from './sidebar/menuChart';

interface NavbarProps {
  asSidebar?: boolean;
}

const Navbar: React.FC = ({ asSidebar = true }: NavbarProps) => {
  const t = useTranslations('common');
  const router = useRouter();

  const appStore = useAppStore();
  const { account }: any = appStore;

  const handleLogout = async () => {
    try {
      const response = await fetchData(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/logout`
      );
      if (response?.ok) {
        router.push('signin');
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <header className="fixed grid h-14 w-full grid-cols-[1fr_1fr] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] items-center border-b px-4 lg:h-[60px] lg:px-6 bg-background ">
      <div
        className={`flex h-full items-center ${asSidebar ? 'md:border-r' : ''}`}
      >
        <Link href={'/dashboard'} className="hidden md:flex">
          <h1 className="font-semibold">Nexus</h1>
        </Link>
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
            {account?.status === 'FREE' && (
              <div className="mt-auto p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('upgrade-title')}</CardTitle>
                    <CardDescription>
                      {t('upgrade-description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      {t('upgrade-button')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex justify-end items-center h-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {t('profile')}
              <Badge
                className="ml-4"
                variant={account?.status.toLowerCase() as any}
              >
                {account?.status}
              </Badge>
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
