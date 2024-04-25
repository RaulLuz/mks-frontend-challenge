import { useStore } from "@/app/context/StoreContext";
import { IProductsInCart } from "@/app/types/Product";
import { useState } from "react";

const QuantitySelector = ({ product }: { product: IProductsInCart }) => {
  const { handleProductQuantity } = useStore();

  const handleQuantityChange = (operation: number) => {
    handleProductQuantity(product, operation);
  };

  return (
    <div className="quantity-selector">
      <span className="quantity-selector__label">Qtd:</span>
      <div className="quantity-selector__content">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="quantity-selector__content_remove"
        >
          -
        </button>
        <div className="">{product.quantity}</div>
        <button
          onClick={() => handleQuantityChange(1)}
          className="quantity-selector__content_add"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
