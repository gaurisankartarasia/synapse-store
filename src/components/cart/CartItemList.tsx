// // components/cart/CartItemList.tsx
// 'use client';
// import Image from 'next/image';
// import { TrashIcon } from '@heroicons/react/24/outline';
// import { Button } from '@/components/ui/button';
// import { CartItem } from '@/hooks/cart/useCart';
// import Link from 'next/link';
// import { getProductUrl } from '@/utils/url_constructor';

// interface Props {
//   cartItems: CartItem[];
//   onRemove: (productId: string) => void;
// }

// export const CartItemList = ({ cartItems, onRemove }: Props) => {

// const productUrl = getProductUrl(product.name, product.productId); 

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <h2 className="text-lg font-medium mb-4">Items ({cartItems.length})</h2>
//       <div className="divide-y">
//         {cartItems.map((item) => (
          
//           <div key={item.productId} className="py-4 flex items-center">
            
//             <Link href={productUrl} className="flex-shrink-0 mr-4">
//               {item.product?.imageUrl ? (
//                 <div className="relative h-24 w-24 overflow-hidden rounded-md border bg-gray-100">
//                   <Image
//                     src={item.product.imageUrl}
//                     alt={item.product.name}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               ) : (
//                 <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded-md">
//                   <span className="text-xs text-gray-500">No Image</span>
//                 </div>
//               )}
//             </Link>
//             <div className="flex-grow">
//               <Link href={`/products/${item.productId}`}  className="font-medium hover:text-blue-900 text-gray-900">
//                 {item.product?.name ?? 'Product unavailable'}
//               </Link>
//               <div className="mt-1 flex items-center text-sm text-gray-500">
//                 <span className="mr-2">Quantity: {item.quantity}</span>
//                 {item.product && (
//                   <span className="font-medium text-gray-800">
//                     ₹{item.product.price.toLocaleString()}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="ml-4">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => onRemove(item.productId)}
//                 className="text-red-600 hover:text-red-800 hover:bg-red-50"
//               >
//                 <TrashIcon className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



// components/cart/CartItemList.tsx
'use client';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/hooks/cart/useCart';
import Link from 'next/link';
import { getProductUrl } from '@/utils/url_constructor';  // Make sure this matches your actual utility file name

interface Props {
  cartItems: CartItem[];
  onRemove: (productId: string) => void;
}

export const CartItemList = ({ cartItems, onRemove }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Items ({cartItems.length})</h2>
      <div className="divide-y">
        {cartItems.map((item) => {
          // Generate product URL for each cart item
          const productUrl = item.product ? 
            getProductUrl(item.product.name, item.productId) : 
            '/';
            
          return (
            <div key={item.productId} className="py-4 flex items-center">
              <Link href={productUrl} className="flex-shrink-0 mr-4">
                {item.product?.imageUrl ? (
                  <div className="relative h-24 w-24 overflow-hidden rounded-md border bg-gray-100">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded-md">
                    <span className="text-xs text-gray-500">No Image</span>
                  </div>
                )}
              </Link>
              <div className="flex-grow">
                <Link href={productUrl} className="font-medium hover:text-blue-900 text-gray-900">
                  {item.product?.name ?? 'Product unavailable'}
                </Link>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <span className="mr-2">Quantity: {item.quantity}</span>
                  {item.product && (
                    <span className="font-medium text-gray-800">
                      ₹{item.product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.productId)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};