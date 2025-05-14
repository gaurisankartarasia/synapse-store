// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/hooks/useAuth";

// interface Order {
//   id: string;
//   createdAt: string;
//   status: string;
//   items: { name: string; price: number; quantity: number }[];
// }

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const {user} = useAuth()

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return;

//       const res = await fetch("/api/v1/store/order", {
//         credentials:"include"
//       });
//       const data = await res.json();
//       setOrders(data.orders || []);
//     };

//     fetchOrders();
//   }, [user]);

//   if (!user) return <p>Please log in to view your orders.</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order.id} className="p-4 border-b">
//             <p>Order ID: {order.id}</p>
//             <p>Status: {order.status}</p>
//             <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
//             <ul className="mt-2">
//               {order.items.map((item, index) => (
//                 <li key={index}>
//                   {item.name} - ${item.price} × {item.quantity}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Order {
  id: string;
  createdAt: string;
  status: string;
  items: { name: string; price: number; quantity: number }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/v1/store/order', {
          credentials: 'include',
        });
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, []); // 👈 Empty array ensures this runs only once on mount

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="mb-4">
            <CardHeader>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Order ID: {order.id}</p>
                <p className="text-sm text-muted-foreground">Status: {order.status}</p>
                <p className="text-sm text-muted-foreground">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.name} - ${item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
