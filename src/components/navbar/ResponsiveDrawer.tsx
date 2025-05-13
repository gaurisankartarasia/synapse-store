// 'use client'
// import React, { useState } from 'react';
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   IconButton,
//   Typography,
//   Menu,
//   MenuItem,
//   Avatar,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   Home as HomeIcon,
//   Dashboard as DashboardIcon,
//   Settings as SettingsIcon,
//   Logout as LogoutIcon
// } from '@mui/icons-material';

// // Define menu items for navigation
// const menuItems = [
//   { text: 'Home', icon: <HomeIcon /> },
//   { text: 'Dashboard', icon: <DashboardIcon /> },
//   { text: 'Settings', icon: <SettingsIcon /> }
// ];

// const Navbar: React.FC = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   // State for drawer
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // State for profile menu
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const isMenuOpen = Boolean(anchorEl);

//   // Handlers for drawer
//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   // Handlers for profile menu
//   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   // Drawer content
//   const drawer = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
//       <Box sx={{ p: 2 }}>
//         <Typography variant="h6" component="div">
//           My App
//         </Typography>
//       </Box>
//       <Divider />
//       <List>
//         {menuItems.map((item) => (
//           <ListItem button key={item.text}>
//             <ListItemIcon>
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         <ListItem button>
//           <ListItemIcon>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItem>
//       </List>
//     </Box>
//   );

//   // Profile menu
//   const profileMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'right',
//       }}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//       <Divider />
//       <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
//     </Menu>
//   );

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           {isMobile && (
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2 }}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}

//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1 }}
//           >
//             My App
//           </Typography>

//           {!isMobile && (
//             <Box sx={{ display: 'flex' }}>
//               {menuItems.map((item) => (
//                 <Button key={item.text} color="inherit">
//                   {item.text}
//                 </Button>
//               ))}
//             </Box>
//           )}

//           <IconButton
//             size="large"
//             edge="end"
//             aria-label="account of current user"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleProfileMenuOpen}
//             color="inherit"
//           >
//             <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {profileMenu}

//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true, // Better open performance on mobile
//         }}
//       >
//         {drawer}
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;



"use client";
import React, { useState } from "react";
import {
  Menu,
  Home,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";
import { ShoppingBagIcon, HeartIcon, MapIcon, UserCircleIcon,   ChatBubbleLeftEllipsisIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";


// Define menu items for navigation
const menuItems = [
  { text: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
  {
    text: "Wishlist",
    href: "/wishlist",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  { text: "Cart", href: "/cart", icon: <Settings className="h-5 w-5" /> },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
const { profile } = useProfile();
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
              <SheetTitle className="text-left">Store</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <nav className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                  <div key={item.text} className="justify-start gap-2 px-2 ">
                    <Link
                      href={item.href}
                      className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                    >
                      {item.icon}
                      {item.text}{" "}
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
        <div className="flex-1 text-xl font-semibold">Store</div>

        {/* Desktop Navigation */}
        <nav className="mx-6 hidden md:flex items-center space-x-4">
          {menuItems.map((item) => (
             <div key={item.text} className="justify-start gap-2 px-2 ">
                    <Link
                      href={item.href}
                      className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                    >
                      {item.text}{" "}
                    </Link>
                  </div>
          ))}
        </nav>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.profilePhotoURL} alt="user image profile" ></AvatarImage>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
        
            <DropdownMenuGroup>
               <DropdownMenuItem> <UserCircleIcon/> My Account</DropdownMenuItem>
              <DropdownMenuItem><HeartIcon/> Wishlist</DropdownMenuItem>
              <DropdownMenuItem> <ShoppingBagIcon/> Orders</DropdownMenuItem>
              <DropdownMenuItem> <MapIcon/> Saved Addresses</DropdownMenuItem>
              <DropdownMenuItem>< ChatBubbleLeftEllipsisIcon/> Help & Support</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 hover:text-red-600">
              <ArrowLeftStartOnRectangleIcon/>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
