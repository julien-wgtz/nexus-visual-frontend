"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/store";
import { useTranslations } from "next-intl";
import React from "react";

interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  className,
}) => {
  const t = useTranslations("common");
  const appStore: any = useAppStore();
  const accountStatus = appStore.account?.status;

  return (
    <aside
      className={cn(
        "flex flex-col justify-between h-full w-full border-r bg-background",
        className
      )}
    >
      <div>{children}</div>
      {accountStatus === "FREE" && (
        <div className="mt-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("upgrade-title")}
              </CardTitle>
              <CardDescription>
                {t("upgrade-description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="sm"
                className="w-full"
              >
                {t("upgrade-button")}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
