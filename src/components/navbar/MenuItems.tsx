// // components/Store/Navbar/menuItems.tsx
// import { ShoppingBagIcon } from "@heroicons/react/24/outline";
// import { ReactNode } from "react";
// import { useProfile } from "@/hooks/useProfile";
 

// export interface MenuItem {
//   text: string;
//   href: string;
//   icon: ReactNode;
//   badgeCount?: number;
// }
//  const { profile } = useProfile();

// export const menuItems: MenuItem[] = [
//   {
//     text: "Cart",
//     href: "/cart",
//         icon: <ShoppingBagIcon className="h-5 w-5" />,
//         badgeCount: profile?.store?.itemsInCart || 0,

//   },
// ];



import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { ReactNode, useMemo } from "react";
import { useProfile } from "@/hooks/useProfile";

export interface MenuItem {
  text: string;
  href: string;
  icon: ReactNode;
  badgeCount?: number;
}

export const useMenuItems = () => {
  const { profile } = useProfile();

  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        text: "Cart",
        href: "/cart",
        icon: <ShoppingBagIcon className="h-5 w-5" />,
        badgeCount: profile?.store?.itemsInCart || 0,
      },
    ],
    [profile?.store?.itemsInCart]
  );

  return menuItems;
};