"use client";

import { useQuery } from "@tanstack/react-query";
import getProducts from "../../api";
import { motion } from "framer-motion";
import { useStore } from "@/app/context/StoreContext";
import Products from "./Products";
import SuccesModal from "./SuccesModal";
import { useState } from "react";

const variants = {
  open: {
    x: 0,
    transition: { stiffness: 10 },
  },
  closed: {
    x: "100%",
    transition: { stiffness: 1000 },
  },
};

const Cart = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { isCartOpen, setIsCartOpen, productsInCart, setProductsInCart } = useStore();
  const totalPrice = productsInCart.reduce(
    (acc, product) => acc + Number(product.price) * product.quantity,
    0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyProducts = () => {
    setIsModalOpen(true);
    setProductsInCart([])
    setIsCartOpen(false);
  }

  if (!products) return null;

  return (
    <>
      <motion.nav
        initial={false}
        animate={isCartOpen ? "open" : "closed"}
        variants={variants}
        className="cart"
      >
        <div className="cart__header">
          <div>
            <h3>Carrinho</h3>
            <h3> de compras</h3>
          </div>
          <button onClick={() => setIsCartOpen(false)}>
            <span>x</span>
          </button>
        </div>

        {productsInCart.length === 0 ? (
          <div className="cart__empty">
            <h3>Carrinho vazio</h3>
          </div>
        ) : (
          <Products />
        )}

        <div className="cart__footer">
          <div
            className={`${
              productsInCart.length > 5 ? "padding" : ""
            } cart__footer_total`}
          >
            <p>Total:</p>
            <p>R${totalPrice.toLocaleString("pt-br")}</p>
          </div>
          <button disabled={productsInCart.length === 0} onClick={handleBuyProducts}>
            Finalizar compra
          </button>
        </div>
      </motion.nav>
      <SuccesModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Cart;
