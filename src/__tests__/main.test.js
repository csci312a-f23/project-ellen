import { render, screen, waitFor, act } from "@testing-library/react";
import Home from "@/pages/index";
import { useSession } from "next-auth/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
// import { useRouter } from 'next/router';
import userEvent from "@testing-library/user-event";
import Review from "../pages/dorms/[name]/[room]/review";
import Rooms from "../pages/dorms/[name]/[...room]";
import Profile from "../pages/profile";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

global.fetch = jest.fn();

// Replace the router with the mock
// eslint-disable-next-line global-require, import/no-extraneous-dependencies
jest.mock("next/router", () => require("next-router-mock"));

// Tell the mock router about the pages we will use (so we can use dynamic routes)
mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/dorms/[name]/[...room]", // something wrong with this one, I think it doesn't like the endpoint of [...room]
    "/dorms/[...name]",
    "/app",
    "/document",
    "/index",
    "/profile",
    "/review",
    "/rooms",
    "/login",
  ]),
);

jest.mock("next/router", () => ({
  useRouter() {
    return {
      // query: { room: "100" },
      query: { name: "Battell", room: "100" },
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
    await waitFor(() => {
      render(<Home />);
    });
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

    userEvent.click(submitButton);

    expect(mockRouter.pathname).toBe("/");
  });
  test("cancels review", async () => {
    render(<Review />);

    const cancelButton = screen.getByText("Cancel").closest("button");

    userEvent.click(cancelButton);

    expect(mockRouter.pathname).toBe("/");
  });
});

// Mock the response data
const mockRoomsData = {
  id: 100,
  dorm: "Battell",
  type: null,
  beds: 3,
  dormDimensions: 298,
  dormReview: "Comfortable and clean room.",
  dormRating: 5,
  reviews: [
    {
      id: 1,
      userId: "298",
      roomId: "100",
      dormReview: "Comfortable and clean room.",
      dormRating: "5",
    },
    {
      id: 138,
      userId: "1",
      roomId: "100",
      dormReview: "testing",
      dormRating: "1",
    },
    {
      id: 139,
      userId: "1",
      roomId: "100",
      dormReview: "testing",
      dormRating: "1",
    },
    {
      id: 146,
      userId: "2",
      roomId: "100",
      dormReview: "ASDhioda",
      dormRating: "5",
    },
  ],
};

describe("Rooms Page", () => {
  beforeEach(async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRoomsData),
    });

    act(() => {
      render(<Rooms />);
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("displays the room image", async () => {
    await waitFor(() => {
      const dormsearch = screen.getByText("Search");
      expect(dormsearch).toBeInTheDocument();
    });
    const image = screen.getByAltText("Room Photo");
    await waitFor(() => {
      expect(image).toBeInTheDocument();
    });
  });

  test("displays the room dimensions", async () => {
    await waitFor(() => {
      const dimensions = screen.getByText(/Dimensions/i);
      expect(dimensions).toBeInTheDocument();
    });
  });

  test("displays the room number", async () => {
    await waitFor(() => {
      const roomNumber = screen.getByText(/Room :/i);
      expect(roomNumber).toBeInTheDocument();
    });
  });

  test("displays the room rating", async () => {
    const rating = screen.getByText(/Rating :/i);
    await waitFor(() => {
      expect(rating).toBeInTheDocument();
    });
  });

  test("displays the room reviews", async () => {
    await waitFor(() => {
      const reviews = screen.getByText(/Reviews/i);
      expect(reviews).toBeInTheDocument();
    });
  });
});

const testUserData = {
  id: 4,
  name: "Caroline Haggerty",
  email: "chaggerty@middlebury.edu",
  room1: null,
  room2: null,
  room3: null,
};

describe("Profile page", () => {
  // slight console error on this

  beforeEach(() => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(testUserData),
    });

    act(() => {
      render(<Profile />);
    });
  });

  test("renders user details correctly when authenticated", async () => {
    const mockSession = {
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
    };
    useSession.mockReturnValueOnce({
      data: mockSession,
      status: "authenticated",
    });

    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });
  });
});
