import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/carts";
const token = localStorage.getItem("token");

// Thunk untuk mendapatkan data cart
export const getCartItems = createAsyncThunk(
    "cart/getCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(BASE_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk untuk menghapus item dari cart
export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (id, { rejectWithValue }) => {
        try {
            if (!id) throw new Error("Invalid ID");
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        product: [],
        qty: 0,
        buyProduct: null,
        error: null,
    },
    reducers: {
        selectProduct: (state, action) => {
            const selectedProduct = action.payload;
            const productExists = state.product.some(
                (item) => item._id === selectedProduct._id
            );

            if (!productExists) {
                state.product.push(selectedProduct);
            }
        },

        deselectProduct: (state, action) => {
            const productId = action.payload;
            state.product = state.product.filter((item) => item._id !== productId);
        },

        clearSelectedProducts: (state) => {
            state.product = [];
        },

        buyNow: (state, action) => {
            const buyProductNow = action.payload;
            console.log("Product received in buyNow action:", buyProductNow);
            state.buyProduct = buyProductNow;
        },

        clearBuyNow: (state) => {
            state.buyProduct = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { selectProduct, deselectProduct, clearSelectedProducts, buyNow, clearBuyNow } = cartSlice.actions
export const selectProducts = (state) => state.cart.items.map((item) => item);



export default cartSlice.reducer;
