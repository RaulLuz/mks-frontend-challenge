import "./scss/main.scss";
import ProductList from "./components/ProductList";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import getProducts from "./api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart/Cart";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <main id="app">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
        <ProductList />
        <Footer />
        <Cart />
      </HydrationBoundary>
    </main>
  );
}
