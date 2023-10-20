"use client";

import { ProductWithTotalPrice } from "@/helpers/products";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
}

const initialCartValues: ICartContext = {
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
};

export const CartContext = createContext<ICartContext>(initialCartValues);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: CartProduct) => {
    if (products.some((productItem) => productItem.id === product.id)) {
      setProducts((prevProducts) =>
        prevProducts.map((productItem) =>
          productItem.id === product.id
            ? {
                ...productItem,
                quantity: productItem.quantity + product.quantity,
              }
            : productItem,
        ),
      );
      return;
    }
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product,
      ),
    );
  };

  const decreaseProductQuantity = (productId: string) => {
    products.map((product) => {
      if (product.id === productId) {
        if (product.quantity === 1) {
          removeProductFromCart(productId);
        } else {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId
                ? {
                    ...product,
                    quantity: product.quantity - 1,
                  }
                : product,
            ),
          );
        }
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
