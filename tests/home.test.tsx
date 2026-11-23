// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Home from "@/app/page";

afterEach(cleanup);

test("renders the home page heading and documentation link", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "To get started, edit the page.tsx file.",
    }),
  ).toBeDefined();
  expect(
    screen.getByRole("link", { name: "Documentation" }).getAttribute("href"),
  ).toMatch(/^https:\/\/nextjs\.org\/docs(?:\?|$)/);
});
