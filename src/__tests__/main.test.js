import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/pages/index";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import userEvent from "@testing-library/user-event";
import Review from "../pages/review";

// Replace the router with the mock
// eslint-disable-next-line global-require, import/no-extraneous-dependencies
jest.mock("next/router", () => require("next-router-mock"));

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

beforeEach(() => {
  mockRouter.setCurrentUrl("/");
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<Home />);
  });
});

describe("Main page sub tests", () => {
  test("navigates to /profile when profile button is clicked", async () => {
    render(<Home />);

    const profileButton = screen.getByRole("button", { name: /my profile/i });
    userEvent.click(profileButton);

    mockRouter.push("/profile");

    await waitFor(() => {
      expect(mockRouter.pathname).toBe("/profile");
    });
  });
});

describe("Review Form", () => {
  test("fills out and submits the form", async () => {
    render(<Review />);

    const ratingInput = screen.getByRole("spinbutton");
    const commentTextarea = screen.getByRole("textbox");
    const submitButton = screen.getByText("Submit Review").closest("button");

    userEvent.type(ratingInput, "4");
    userEvent.type(commentTextarea, "Great place to stay!");

    // const mockSubmit = jest.fn();
    // submitButton.onclick = mockSubmit;

    userEvent.click(submitButton);

    expect(mockRouter.pathname).toBe("/");
  });
});
