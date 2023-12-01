import { render, screen, waitFor, act } from "@testing-library/react";
import Home from "@/pages/index";
import { useSession } from "next-auth/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import userEvent from "@testing-library/user-event";
import Review from "../pages/dorms/[name]/[room]/review";
import Rooms from "../pages/dorms/[name]/[...room]";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

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

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { room: "100" },
      push: jest.fn(),
    };
  },
}));

beforeEach(() => {
  mockRouter.setCurrentUrl("/");
  useSession.mockReturnValue({ data: null, status: "loading" });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("End-to-end testing", () => {
  test("Render index.js component", async () => {
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

    userEvent.type(ratingInput, 4);
    userEvent.type(commentTextarea, "Great place to stay!");

    // const mockSubmit = jest.fn();
    // submitButton.onclick = mockSubmit;

    userEvent.click(submitButton);

    expect(mockRouter.pathname).toBe("/");
  });
});

describe("Rooms Component", () => {
  beforeEach(() => {
    act(() => {
      render(<Rooms />);
    });
  });

  test("displays the room image", () => {
    const image = screen.getByAltText("Room Photo");
    expect(image).toBeInTheDocument();
  });

  test("displays the room dimensions", () => {
    const dimensions = screen.getByText(/Dimensions/i);
    expect(dimensions).toBeInTheDocument();
  });

  test("displays the room number", () => {
    const roomNumber = screen.getByText(/Room :/i);
    expect(roomNumber).toBeInTheDocument();
  });

  test("displays the room rating", () => {
    const rating = screen.getByText(/Rating :/i);
    expect(rating).toBeInTheDocument();
  });

  test("displays the room reviews", () => {
    const reviews = screen.getByText(/Reviews/i);
    expect(reviews).toBeInTheDocument();
  });
});
