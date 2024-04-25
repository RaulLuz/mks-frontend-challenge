import { IProductsInCart, Product } from "./Product";

interface StoreContextProps {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  productsInCart: IProductsInCart[];
  setProductsInCart: Dispatch<SetStateAction<IProductsInCart[]>>;
  handleProductQuantity: (product: IProductsInCart, newQuantity: number) => void
}

type StoreContextProvideProps = {
  children: ReactNode;
};

export { StoreContextProps, StoreContextProvideProps };
