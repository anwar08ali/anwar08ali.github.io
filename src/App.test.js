import { render, screen } from "@testing-library/react";
import App from "./App";
import ImageContext from "./components/Context/ImageContext";
test("renders learn react link", () => {
  render(
    <ImageContext>
      <App />
    </ImageContext>
  );
  const linkElement = screen.getByText(/Image Search App/i);
  expect(linkElement).toBeInTheDocument();
});
