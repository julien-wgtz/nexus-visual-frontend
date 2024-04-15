import Sidebar from "@/components/nexus-app/nav/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-1 items-center justify-center h-full rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no products
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add
          a product.
        </p>
        <Button className="mt-4">
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default Page;
