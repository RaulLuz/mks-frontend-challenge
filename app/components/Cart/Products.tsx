import getProducts from "@/app/api";
import { useStore } from "@/app/context/StoreContext";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import QuantitySelector from "./QuantitySelector";
import Image from "next/image";
import { Product } from "@/app/types/Product";

const Products = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { isCartOpen, productsInCart, setProductsInCart } = useStore();

  const handleRemoveProduct = (productId: number) => {
    setProductsInCart((prev: Product[]) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  if (!products) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="cart__products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
        transition={{ duration: 0.2 }}
      >
        {isCartOpen &&
          productsInCart?.map((product, index) => {
            let finalPrice = Number(product.price) * product.quantity

            return (
            <motion.div
              key={product.id}
              className="cart__products_product"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              layout
            >
              <button
                className="cart__products_product--remove"
                onClick={() => {
                  handleRemoveProduct(product.id);
                }}
              >
                <span>x</span>
              </button>
              <Image
                src={product.photo}
                alt={product.name}
                width={70}
                height={70}
              />
              <h3>{product.name}</h3>
              <QuantitySelector product={product} />
              <p>R${finalPrice.toLocaleString("pt-br")}</p>
            </motion.div>
          )})}
      </motion.div>
    </AnimatePresence>
  );
};

export default Products;
