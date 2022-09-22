import { render, screen, waitFor } from "@testing-library/react";
import ImageSearch from "./ImageSearch";
import { fireEvent } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import ImageContext from "../Context/ImageContext";
test("renders learn react link", () => {
  render(
    <ImageContext>
      <ImageSearch />
    </ImageContext>
  );
  // userEvent.type(screen.getByPlaceholderText(/Search Images/i), "red");

  // waitFor(() => {
  //   console.log("---", screen.getByPlaceholderText(/Search Images/i).value);
  //   expect(screen.getByPlaceholderText(/Search Images/i)).toHaveValue("red");
  // });
  const input = screen.getByPlaceholderText(/Search Images/i);
  fireEvent.change(input, { target: { value: "red roses" } });
  const inputEle = screen.getByPlaceholderText(/Search Images/i);
  expect(inputEle.value).toEqual("red roses");
  // screen.debug();
});
