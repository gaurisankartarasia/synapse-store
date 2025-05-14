


// // components/Store/Navbar/Navbar.tsx
// "use client";

// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import { Menu, LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { useMenuItems } from "./MenuItems";

// // Dynamically import components
// const SearchInput = dynamic(() => import("@/components/store/SearchInput"), {
//   ssr: false,
//   loading: () => <div className="w-48 h-8 bg-gray-100 animate-pulse rounded" />,
// });

// const UserDropdown = dynamic(() => import("./UserDropdown"), {
//   ssr: false,
// });

// const Navbar: React.FC = () => {

//   const [open, setOpen] = useState(false);


//   return (
//     <div className="border-b">
//       <div className="flex h-16 items-center px-4">
//         {/* Mobile Menu */}
//         <Sheet open={open} onOpenChange={setOpen}>
//           <SheetTrigger asChild className="md:hidden">
//             <Button variant="ghost" size="icon" className="mr-2">
//               <Menu className="h-5 w-5" />
//               <span className="sr-only">Toggle menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-64">
//             <SheetHeader>
//               <SheetTitle className="text-left">
//                 <Link href="/">Store</Link>
//               </SheetTitle>
//             </SheetHeader>

//             <div className="py-4">
//               <nav className="flex flex-col space-y-1">
//                 {menuItems.map((item) => (
//                   <div key={item.text} className="justify-start gap-2 px-2 ">
//                     <Link
//                       href={item.href}
//                       className="flex items-center text-sm text-gray-700 hover:text-gray-900"
//                     >
//                       {item.icon}
//                       {item.text}
//                     </Link>
//                   </div>
//                 ))}
//                 <div className="pt-4">
//                   <Button
//                     variant="ghost"
//                     className="justify-start gap-2 px-2 text-red-500 hover:text-red-600"
//                   >
//                     <LogOut className="h-5 w-5" />
//                     Logout
//                   </Button>
//                 </div>
//               </nav>
//             </div>
//           </SheetContent>
//         </Sheet>

//         {/* Logo */}
//         <div className="flex-1 text-xl font-semibold">
//           <Link href="/">Store</Link>
//         </div>

//         {/* Search */}
//         <SearchInput />

//         {/* Desktop Navigation */}
//         <nav className="mx-6 hidden md:flex items-center space-x-4">
//           {menuItems.map((item) => (
//             <div key={item.text} className="justify-start gap-2 px-2">
//               <Link
//                 href={item.href}
//                 className="flex items-center text-sm text-gray-700 hover:text-gray-900"
//               >
//                 {item.icon}
//               </Link>
//             </div>
//           ))}
//         </nav>

//         {/* User Dropdown */}
//         <UserDropdown />
//       </div>
//     </div>
//   );
// };

// export default Navbar;


"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Menu, LogOut } from "lucide-react";
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
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Link href="/">Store</Link>
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
                        // <span className="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                        //   {item.badgeCount}
                        // </span>
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
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex-1 text-xl font-semibold">
          <Link href="/">Store</Link>
        </div>

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
                  <Badge variant="destructive"  className="h-4 w-4" > {item.badgeCount}</Badge>
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