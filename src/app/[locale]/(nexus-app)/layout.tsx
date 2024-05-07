"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/nexus-app/Navbar/navbar';
import { fetchData } from '@/lib/fetch';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const fetch = async ()=> {
      try {
        const response = await fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/check`);
        if(response.status === 401){
          router.replace("/signin")
        }
      }catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, []);
  
  return (
    <>
      <Navbar />
      <main className="w-full h-full bg-muted/40 pt-[60px] box-border	">
        {children}
      </main>
    </>
  );
};

export default Layout;
