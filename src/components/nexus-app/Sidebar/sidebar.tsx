'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import './style.scss';
import MarketingBlock from '../MarketingBlock/MarketingBlock';
import ListFolders from './ListFolders';

interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, className }) => {


  return (
    <aside
      className={cn(
        'fixed top-0 z-10 md:w-[236px] pt-[60px] lg:w-[304px] hidden md:flex  flex-col justify-between h-[100%] w-full border-r bg-background overflow-hidden',
        className
      )}
    >
      <ListFolders />
      <MarketingBlock/>
    </aside>
  );
};

export default Sidebar;
