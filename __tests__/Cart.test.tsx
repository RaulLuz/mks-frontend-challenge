import { render } from "@testing-library/react";
import Header from "@/app/components/Header";
import { StoreContextProvider } from "@/app/context/StoreContext";
import "@testing-library/jest-dom";

describe("Cart component", () => {
  it("should display the correct total number of products in the cart", () => {
    const { getByText } = render(
      <StoreContextProvider>
        <Header />
      </StoreContextProvider>
    );

    const totalProducts = getByText("0");
    expect(totalProducts).toBeInTheDocument();
  });
});
