import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InlineInput from "../../components/InlineInput";

it("should render self", async () => {
  const value = "123";
  const tagName = "h1";

  const { getByTestId } = render(
    <InlineInput value={value} tagName={tagName} onChange={() => {}} />
  );
  const inputElement = getByTestId("input");

  expect(inputElement.innerText).toBe(value);
  expect(inputElement.tagName).toBe("H1");
});

it("should call onChange when user types some text", async () => {
  const expected = "kanahei";
  const handleChange = jest.fn();

  const { getByTestId } = render(<InlineInput value="" onChange={handleChange} />);
  const inputElement = getByTestId("input");

  inputElement.innerText = expected;
  fireEvent.input(inputElement);

  expect(handleChange.mock.calls[0][0]).toBe(expected);
});
