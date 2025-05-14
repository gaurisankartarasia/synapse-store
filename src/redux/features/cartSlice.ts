
// // src/redux/features/cartSlice.ts

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// // Define the product and cart item interfaces
// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   // Add any other fields your product might include
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: CartState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// // Async thunk to sync with Firestore via API
// export const addToCartAsync = createAsyncThunk<
//   { productId: string; quantity: number },
//   { product: Product; quantity: number },
//   { rejectValue: string }
// >(
//   "cart/addToCartAsync",
//   async ({ product, quantity }, { rejectWithValue }) => {
//     try {
//       const response = await fetch("/api/v1/store/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ productId: product.id, quantity }),
//         credentials: "include", // Ensure cookies are included
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         return rejectWithValue(errorData.error || "Failed to add to cart");
//       }

//       return { productId: product.id, quantity };
//     } catch (error) {
//       return rejectWithValue("Network error");
//     }
//   }
// );

// // Create the slice
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // Local-only reducer if needed
//     addToCartLocal: (state, action: PayloadAction<Product & { quantity?: number }>) => {
//       const { id, quantity = 1 } = action.payload;
//       const existingItem = state.items.find((item) => item.id === id);
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.items.push({ ...action.payload, quantity });
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//     updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (item) {
//         item.quantity = action.payload.quantity;
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToCartAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addToCartAsync.fulfilled, (state, action) => {
//         const existingItem = state.items.find((item) => item.id === action.payload.productId);
//         if (existingItem) {
//           existingItem.quantity += action.payload.quantity;
//         } else {
//           state.items.push({
//             id: action.payload.productId,
//             name: "",
//             description: "",
//             price: 0,
//             imageUrl: "",
//             quantity: action.payload.quantity,
//           });
//         }
//         state.loading = false;
//       })
//       .addCase(addToCartAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Something went wrong";
//       });
//   },
// });

// export const {
//   addToCartLocal,
//   removeFromCart,
//   updateQuantity,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;



// // src/redux/features/cartSlice.ts

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// import { Product } from "@/types/store/types";


// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: CartState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// // Async thunk to sync with Firestore via API
// export const addToCartAsync = createAsyncThunk<
//   { productId: string; quantity: number },
//   { product: Product; quantity: number },
//   { rejectValue: string }
// >(
//   "cart/addToCartAsync",
//   async ({ product, quantity }, { rejectWithValue }) => {
//     try {
//       const response = await fetch("/api/v1/store/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ productId: product.productId, quantity }),
//         credentials: "include", // Ensure cookies are included
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         return rejectWithValue(errorData.error || "Failed to add to cart");
//       }

//       return { productId: product.productId, quantity };
//     } catch (error) {
//       return rejectWithValue("Network error");
//     }
//   }
// );

// // Create the slice
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // Local-only reducer if needed
//     addToCartLocal: (state, action: PayloadAction<Product & { quantity?: number }>) => {
//       const { productId, quantity = 1 } = action.payload;
//       const existingItem = state.items.find((item) => item.productId === productId);
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.items.push({ ...action.payload, quantity });
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((item) => item.productId !== action.payload);
//     },
//     updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
//       const item = state.items.find((item) => item.productId === action.payload.id);
//       if (item) {
//         item.quantity = action.payload.quantity;
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToCartAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addToCartAsync.fulfilled, (state, action) => {
//         const existingItem = state.items.find((item) => item.productId === action.payload.productId);
//         if (existingItem) {
//           existingItem.quantity += action.payload.quantity;
//         } else {
//           state.items.push({
//             productId: action.payload.productId,
//             name: "",
//             description: "",
//             price: 0,
//             imageUrl: "",
//             quantity: action.payload.quantity,
//           });
//         }
//         state.loading = false;
//       })
//       .addCase(addToCartAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Something went wrong";
//       });
//   },
// });

// export const {
//   addToCartLocal,
//   removeFromCart,
//   updateQuantity,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/store/types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk to sync with Firestore via API
export const addToCartAsync = createAsyncThunk<
  { product: Product; quantity: number },
  { product: Product; quantity: number },
  { rejectValue: string }
>(
  "cart/addToCartAsync",
  async ({ product, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/store/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.productId, quantity }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || "Failed to add to cart");
      }

      return { product, quantity };
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Local-only reducer if needed
    addToCartLocal: (state, action: PayloadAction<Product & { quantity?: number }>) => {
      const { productId, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.productId === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const { product, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.productId === product.productId);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ ...product, quantity });
        }
        state.loading = false;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  addToCartLocal,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;