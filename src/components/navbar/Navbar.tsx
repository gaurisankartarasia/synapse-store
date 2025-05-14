
//src/components/navbar/Navbar.tsx
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Bars2Icon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMenuItems } from "./MenuItems";
import { Badge } from "@/components/ui/badge"
import Image from "next/image";

// Dynamically import components
const SearchInput = dynamic(() => import("@/components/store/SearchInput"), {
  ssr: false,
  loading: () => <div className="w-48 h-8 bg-gray-100 animate-pulse rounded" />,
});

const UserDropdown = dynamic(() => import("./UserDropdown"), {
  ssr: false,
});

const Navbar: React.FC = () => {
  const menuItems = useMenuItems(); // Call the hook to get menuItems
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-2xl">
      <div className="flex h-16 items-center px-4">
        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Bars2Icon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Image src="/favicon.ico" alt="Logo" width={25} height={25} className="mr-2" />
                <Link href="/">Synapse Store</Link>
              </SheetTitle>
            </SheetHeader>

            <div className="py-4">
              <nav className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                  <div key={item.href} className="flex justify-start gap-2 px-2">
                    <Link
                      href={item.href}
                      className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                      onClick={() => setOpen(false)} 
                    >
                      {item.icon}
                      <span className="ml-2">{item.text}</span>
                      {item.badgeCount ? (
                        <Badge variant="destructive"> {item.badgeCount}</Badge>
                      ) : null}
                    </Link>
                  </div>
                ))}
                <div className="pt-4">
                  <Button
                    variant="ghost"
                    className="justify-start gap-2 px-2 text-red-500 hover:text-red-600"
                  >
                    <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center" >   
          <Image src="/favicon.ico" alt="Logo" width={25} height={25} className="mr-2" />
          <div className="flex-1 text-lg font-medium">
           Synapse Store
          </div>
        </Link>

        {/* Search */}
        <SearchInput />

        {/* Desktop Navigation */}
        <nav className="mx-6 hidden md:flex items-center space-x-4">
          {menuItems.map((item) => (
            <div key={item.href} className="flex justify-start gap-2 px-2">
              <Link
                href={item.href}
                className="flex items-center text-sm text-gray-700 hover:text-gray-900"
              >
                {item.icon}
                {/* <span className="ml-2">{item.text}</span> */}
                {item.badgeCount ? (
                  <Badge variant="destructive" className="h-4 w-4"> {item.badgeCount}</Badge>
                ) : null}
              </Link>
            </div>
          ))}
        </nav>

        {/* User Dropdown */}
        <UserDropdown />
      </div>
    </div>
  );
};

export default Navbar;