import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React, { Component, use } from "react";

interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  className,
}) => {
  const t = useTranslations("common");

  return (
    <aside
      className={cn(
        "flex flex-col justify-between h-full w-full border-r bg-background",
        className
      )}
    >
      <div>{children}</div>
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
            <Button size="sm" className="w-full">
              {t("upgrade-button")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default Sidebar;
