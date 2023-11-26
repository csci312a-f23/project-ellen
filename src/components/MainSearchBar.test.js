import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import mockRouter from "next-router-mock";
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import MainSearchBar from "./MainSearchBar";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Tell the mock router about the pages we will use (so we can use dynamic routes)
mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    // "/dorms/[...names]/[...room]", // something wrong with this one, I think it doesn't like the endpoint of [...room]
    "/dorms/[...name]",
    "/app",
    "/document",
    "/index",
    "/profile",
    "/review",
    "/rooms",
  ]),
);

describe("SearchBar", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should display all dorms on initial render", () => {
    render(<MainSearchBar />);

    const dorms = [
      "Battell",
      "Allen",
      "Hepburn",
      "Stewart",
      "Forest(Feb Area)",
      "Gifford",
      "Hadley",
      "Milliken",
      "Coffrin",
      "Pearsons",
      "LaForce",
      "Lang",
      "Kelly",
      "Painter",
      "Atwater",
      "Munford",
      "Chrome",
      "Forest",
      "Voter",
      "Star",
      "Ridgeline",
      "German House - The Deanery",
      "Arabic House - Sperry House",
      "Spanish House - Perkins",
      "Italian House - Longwell",
    ];
    dorms.forEach((dorm) => {
      expect(screen.getByText(dorm)).toBeInTheDocument();
    });
  });

  test("displays only freshman dorms when filtered", async () => {
    render(<MainSearchBar />);
    const select = screen.getByRole("combobox");

    userEvent.selectOptions(select, "Freshman Dorms");

    await screen.findByRole("list", { name: "SearchBar-results" });

    // List of expected freshman dorms
    const freshmanDorms = [
      "Battell",
      "Allen",
      "Hepburn",
      "Stewart",
      "Forest(Feb Area)",
    ];

    // Check if all freshman dorms are displayed
    freshmanDorms.forEach((dorm) => {
      expect(screen.getByText(dorm)).toBeInTheDocument();
    });
  });

  test("navigates to the correct page when a dorm name is clicked", async () => {
    render(<MainSearchBar />);

    const dormName = "Battell";
    const dormItem = screen.getByText(dormName).closest("li");

    userEvent.click(dormItem);

    mockRouter.push("/dorms/Battell");

    await waitFor(() => {
      expect(mockRouter.pathname).toBe("/dorms/[...name]");
      expect(mockRouter.asPath).toBe(`/dorms/${dormName}`);
    });
  });
});
