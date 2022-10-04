import App from "../App";
import { render } from "@testing-library/react";

describe("App", () => {
  it("Matches the snapshot", () => {
    const app = render(<App />);
    expect(app).toMatchSnapshot();
  });
});
