"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "../context/StoreContext";

const Header = () => {
  const { isCartOpen, setIsCartOpen, productsInCart } = useStore();
  const totalProducts = productsInCart?.length;

  return (
    <header className="header">
      <div className="header__content">
        <Link href="/" className="header__content_logo">
          <h1>
            MKS
            <span>Sistemas</span>
          </h1>
        </Link>

        <button onClick={() => setIsCartOpen(!isCartOpen)}>
          <Image src={"/cart.svg"} alt="Minicart" width={19} height={18} />
          <span>{totalProducts}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
