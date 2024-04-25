import getProducts from "@/app/api";
import { useStore } from "@/app/context/StoreContext";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React from "react";
import QuantitySelector from "./QuantitySelector";
import Image from "next/image";
import { Product } from "@/app/types/Product";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const items = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

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
    <motion.div variants={variants} className="cart__products">
      {productsInCart?.map((product) => (
        <motion.div
          variants={items}
          animate={isCartOpen ? "open" : "closed"}
          key={product.id}
          className="cart__products_product"
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
          <p>R${Number(product.price).toLocaleString("pt-br")}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Products;
