"use client";
import React, { use, useEffect } from 'react';
import Navbar from '@/components/nexus-app/Navbar/navbar';
import { fetchData } from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import UserApi from '@/data/model/user';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const userApi = new UserApi();
  const router = useRouter();
  const account = useAppStore((state: any) => state.account);
  const setAccount = useAppStore((state: any) => state.setAccount);
  const setUser = useAppStore((state: any) => state.setUser);
  const themeUser = useAppStore((state: any) => state.theme);
  const setThemeUser = useAppStore((state: any) => state.setTheme);
  const [theme, setTheme] = React.useState(themeUser);

  
  useEffect(() => {
    const fetch = async ()=> {
      try {
        const response = await fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/check`);
        const res = await response.json();
        // if(response.status === 401){
        //   router.replace("/signin")
        // }
        console.log(res);
        if(response.status === 200 && account === null){
          const user = await userApi.getUserById(res.id);
          setAccount(user.currentAccount);
          setUser(user);
          if(themeUser !== user.theme) {
            setTheme(user.theme);
            setThemeUser(user.theme);
          }
        }
      }catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    setTheme(themeUser);
  }, [themeUser]);
  
  return (
    <body className={`flex flex-col items-center ${theme}`}>
      {theme ? (
        <>
          <Navbar />
          <main className="bg-background w-full h-full pt-[60px] box-border	">
            {children}
          </main>
            <Toaster />
        </>
        ): (
          <></>
        )}
    </body>
  );
};

export default Layout;
