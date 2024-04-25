"use client";

import { useQuery } from "@tanstack/react-query";
import getProducts from "../api";
import Image from "next/image";
import { IProductsInCart, Product } from "../types/Product";
import { useStore } from "../context/StoreContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const skeletons = Array.from({ length: 8 }).map((_, index) => (
  <Skeleton key={index} width={217} height={328} />
));

const ProductList = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const {
    setIsCartOpen,
    setProductsInCart,
    productsInCart,
    handleProductQuantity,
  } = useStore();

  const handleAddToCart = (product: Product) => {
    setIsCartOpen(true);

    const productInCart = productsInCart.filter(
      (item) => item.id === product.id
    );

    if (productInCart.length) {
      return handleProductQuantity(productInCart[0], 1);
    }

    return setProductsInCart((prev: IProductsInCart[]) => [
      ...prev,
      { ...product, quantity: 1 },
    ]);
  };

  if (isError) return null;

  return (
    <>
      <section className="product-list">
        {isLoading
          ? skeletons
          : products!.map((product, index) => {
              const formattedPrice = Number(product.price).toLocaleString(
                "pt-br"
              );

              return (
                <motion.article
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  key={product.id}
                  className="product-list__product"
                >
                  <div className="product-list__product_container">
                    <div className="product-list__product_container--image-container">
                      <Image
                        src={product.photo}
                        alt={product.name}
                        width={171}
                        height={171}
                      />
                    </div>

                    <div className="product-list__product_container--info">
                      <h3>{product.name}</h3>
                      <span>R${formattedPrice}</span>
                    </div>
                    <p className="product-list__product_container--description">
                      {product.description}
                    </p>
                    <button
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                      className="product-list__product_container--buy"
                    >
                      <Image
                        src={"/shopping-bag.svg"}
                        alt="Comprar"
                        width={12}
                        height={13.5}
                      />
                      <span>Comprar</span>
                    </button>
                  </div>
                </motion.article>
              );
            })}
      </section>
    </>
  );
};

export default ProductList;
