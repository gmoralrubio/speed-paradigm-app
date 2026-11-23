// @vitest-environment jsdom

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Home from "@/app/page";

afterEach(cleanup);

test("renders the project heading in the main landmark", () => {
  render(<Home />);

  const main = screen.getByRole("main");
  expect(
    within(main).getByRole("heading", {
      level: 1,
      name: "Speed Paradigm App",
    }),
  ).toBeDefined();
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
});
