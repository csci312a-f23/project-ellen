import React from "react";
import mockRouter from "next-router-mock";
import "@testing-library/jest-dom";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { render, screen } from "@testing-library/react";

import DormSearchBar from "./DormSearchBar";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Tell the mock router about the pages we will use (so we can use dynamic routes)
mockRouter.useParser(
  createDynamicRouteParser([
    "/dorms/[...name]",
    "/app",
    "/document",
    "/index",
    "/profile",
    "/review",
    "/rooms",
  ]),
);

describe("DormSearchBar", () => {
  test("Renders the search bar correctly", () => {
    render(<DormSearchBar name="Battell" />);
    const searchBar = screen.getByPlaceholderText("Search...");
    expect(searchBar).toBeInTheDocument();
  });
});
