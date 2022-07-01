import { render } from "@testing-library/react";
import { InputSearch } from "../../../src/components/InputSearch";

jest.mock("./InputSearch.module.scss", () => ({
  __esMOdule: true,
  default: {
    class1: "search",
  },
}));

describe("Component InputSearch", () => {
  it("get text placeholder input", () => {
    const { getByPlaceholderText } = render(<InputSearch />);

    expect(getByPlaceholderText("Procure por heróis")).toBeValid();
  });
});
