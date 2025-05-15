// // components/Store/Navbar/UserDropdown.tsx
// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   TruckIcon,
//   HeartIcon,
//   MapIcon,
//   UserCircleIcon,
//   ChatBubbleLeftEllipsisIcon,
//   ArrowLeftStartOnRectangleIcon,
// } from "@heroicons/react/24/solid";
// import { useProfile } from "@/hooks/useProfile";

// const UserDropdown = () => {
//   const { profile } = useProfile();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="relative h-8 w-8 rounded-full"
//         >
//           <Avatar className="h-8 w-8">
//             <AvatarImage src={profile?.profilePhotoURL} alt="user image profile" />
//             <AvatarFallback>U</AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56" align="end" forceMount>
//         <DropdownMenuGroup>
//           <DropdownMenuItem><UserCircleIcon className="h-5 w-5 mr-2" /> My Account</DropdownMenuItem>
//           <DropdownMenuItem><HeartIcon className="h-5 w-5 mr-2" /> Wishlist</DropdownMenuItem>
//           <DropdownMenuItem><TruckIcon className="h-5 w-5 mr-2" /> Orders</DropdownMenuItem>
//           <DropdownMenuItem><MapIcon className="h-5 w-5 mr-2" /> Saved Addresses</DropdownMenuItem>
//           <DropdownMenuItem><ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2" /> Help & Support</DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem><ArrowLeftStartOnRectangleIcon className="h-5 w-5 mr-2" /> Logout</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default UserDropdown;



// components/Store/Navbar/UserDropdown.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TruckIcon,
  HeartIcon,
  MapIcon,
  UserCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";

interface DropdownLinkItemProps {
  href: string;
  children: React.ReactNode;
  classname?: string;
}

const DropdownLinkItem = ({ href, children }: DropdownLinkItemProps) => {
  return (
    <DropdownMenuItem asChild>
      <Link href={href}>{children}</Link>
    </DropdownMenuItem>
  );
};

const UserDropdown = () => {
  const { profile } = useProfile();

  const avatar = profile?.identity === "female" ? "/assets/avatar_female.svg" : "/assets/avatar_male.svg"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt="user image profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownLinkItem href="/account">
            <UserCircleIcon className="h-5 w-5 mr-2 text-primary" /> My Account
          </DropdownLinkItem>
          <DropdownLinkItem href="/wishlist">
            <HeartIcon className="h-5 w-5 mr-2 text-primary" /> Wishlist
          </DropdownLinkItem>
          <DropdownLinkItem href="/orders">
            <TruckIcon className="h-5 w-5 mr-2 text-primary" /> Orders
          </DropdownLinkItem>
          <DropdownLinkItem href="/addresses">
            <MapIcon className="h-5 w-5 mr-2 text-primary" /> Saved Addresses
          </DropdownLinkItem>
          <DropdownLinkItem href="/help">
            <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2 text-primary" /> Help & Support
          </DropdownLinkItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownLinkItem classname="text-primary"  href="/logout">
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5 mr-2 text-primary" /> Logout
        </DropdownLinkItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;