"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/nexus-app/Navbar/navbar';
import { fetchData } from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import UserApi from '@/data/model/user';
import { set } from 'lodash';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const userApi = new UserApi();
  const router = useRouter();
  const account = useAppStore(state => state.account);
  const setAccount = useAppStore(state => state.setAccount);
  const setUser = useAppStore(state => state.setUser);

  useEffect(() => {
    const fetch = async ()=> {
      try {
        const response = await fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/check`);
        const res = await response.json();
        if(response.status === 401){
          router.replace("/signin")
        }
        if(response.status === 200 && account === null){
          const user = await userApi.getUserById(res.id);
          setAccount(user.currentAccount);
          setUser(user);
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
      <main className="w-full h-full pt-[60px] box-border	">
        {children}
      </main>
    </>
  );
};

export default Layout;
