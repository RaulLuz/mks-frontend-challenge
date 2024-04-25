"use client";
import { createContext, useState, useContext, useEffect } from "react";
import {
  StoreContextProps,
  StoreContextProvideProps,
} from "../types/StoreContext";
import { IProductsInCart } from "../types/Product";

export const StoreContext = createContext({} as StoreContextProps);

export function StoreContextProvider({ children }: StoreContextProvideProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState([] as IProductsInCart[]);

  console.log({ productsInCart });
  function handleProductQuantity(
    product: IProductsInCart,
    newQuantity: number
  ) {
    setProductsInCart((prev) => {
      if (newQuantity === -1 && product.quantity === 1)
        return prev.filter((item) => item.id !== product.id);

      return prev.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + newQuantity };
        }
        return item;
      });
    });
  }

  useEffect(() => {
    const productsQuantity = productsInCart.map((product) => {
      return {
        id: product.id,
        quantity: product.quantity,
      };
    });

    localStorage.setItem("productsQuantity", JSON.stringify(productsQuantity));
  }, [productsInCart]);

  return (
    <StoreContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        productsInCart,
        setProductsInCart,
        handleProductQuantity,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
