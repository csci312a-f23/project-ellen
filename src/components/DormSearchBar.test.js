import React from "react";
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import DormSearchBar from "./DormSearchBar";

// mock the useRouter function
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// mock the useRouter implementation
useRouter.mockImplementation(() => ({
  pathname: "/",
  push: jest.fn(),
}));

// Mock the fetch function
global.fetch = jest.fn();

// Mock the response data
const mockRoomsData = [
  {
    id: 100,
    dorm: "Battell",
    type: null,
    beds: 3,
    dormDimensions: 298,
    dormReview: "Comfortable and clean room.",
    dormRating: 5,
  },
  {
    id: 101,
    dorm: "Battell",
    type: null,
    beds: 2,
    dormDimensions: 184,
    dormReview: "Noisy neighbors but great location.",
    dormRating: 3,
  },
  {
    id: 102,
    dorm: "Battell",
    type: null,
    beds: 2,
    dormDimensions: 184,
    dormReview: "Spacious and well-furnished.",
    dormRating: 4,
  },
  {
    id: 103,
    dorm: "Battell",
    type: null,
    beds: 2,
    dormDimensions: 184,
    dormReview: "Cozy atmosphere but limited storage space.",
    dormRating: 3,
  },
  {
    id: 104,
    dorm: "Battell",
    type: null,
    beds: 2,
    dormDimensions: 184,
    dormReview: "Excellent facilities and friendly staff.",
    dormRating: 5,
  },
  {
    id: 105,
    dorm: "Battell",
    type: null,
    beds: 2,
    dormDimensions: 184,
    dormReview: "Small room  but great price.",
    dormRating: 3,
  },
  {
    id: 106,
    dorm: "Battell",
    type: null,
    beds: 2,
    dormDimensions: 184,
    dormReview: "Convenient location but outdated furniture.",
    dormRating: 4,
  },
  {
    id: 107,
    dorm: "Battell",
    type: null,
    beds: 2,
    dormDimensions: 184,
    dormReview: "Clean and tidy but slow internet.",
    dormRating: 3,
  },
  {
    id: 108,
    dorm: "Battell",
    type: null,
    beds: 2,
    dormDimensions: 170,
    dormReview: "Comfortable beds and quiet surroundings.",
    dormRating: 5,
  },
  {
    id: 109,
    dorm: "Battell",
    type: null,
    beds: 2,
    dormDimensions: 170,
    dormReview: "Limited parking options.",
    dormRating: 1,
  },
  {
    id: 110,
    dorm: "Battell",
    type: null,
    beds: 2,
    dormDimensions: 170,
    dormReview: "Friendly and helpful staff.",
    dormRating: 5,
  },
];

beforeEach(() => {
  // Mock the fetch implementation
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockRoomsData),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("DormSearchBar test", () => {
  test("Renders DormSearchBar component", () => {
    act(() => {
      render(<DormSearchBar name="Battell" />);
    });

    expect(screen.getByPlaceholderText("Room...")).toBeInTheDocument();
    expect(screen.getByLabelText("SearchBar-results")).toBeInTheDocument();
  });

  test("Displays Battell rooms on initial render", async () => {
    act(() => {
      render(<DormSearchBar name="Battell" />);
    });

    // Wait for the rooms to be rendered
    await waitFor(() => {
      const rooms = ["Room: 100", "Room: 101", "Room: 102"]; // Update with actual room names
      rooms.forEach((room) => {
        expect(screen.getByText(room)).toBeInTheDocument();
      });
    });
  });

  test("Filters rooms based on search term", async () => {
    act(() => {
      render(<DormSearchBar name="Battell" />);
    });

    await waitFor(() => {
      const rooms = ["Room: 100", "Room: 101", "Room: 102"];
      rooms.forEach((room) => {
        expect(screen.getByText(room)).toBeInTheDocument();
      });
    });

    const roomNum = "Room: 101";
    const notRoomNum = "Room: 102";

    const searchInput = screen.getByPlaceholderText("Room...");

    act(() => {
      fireEvent.change(searchInput, { target: { value: "101" } });
      fireEvent.click(screen.getByRole("button", { name: "Search" }));
    });

    await waitFor(() => {
      expect(screen.getByText(roomNum)).toBeInTheDocument();
      expect(screen.queryByText(notRoomNum)).toBeNull();
    });
  });

  test("Navigates to the correct page when a room is clicked", async () => {
    const mockPush = jest.fn();
    useRouter.mockImplementation(() => ({
      push: mockPush,
    }));

    act(() => {
      render(<DormSearchBar name="Battell" />);
    });

    await waitFor(() => {
      const clicker = screen.getByText("Room: 100").closest("li");
      act(() => {
        fireEvent.click(clicker);
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dorms/Battell/100");
    });
  });

  test("Filters based on filter thing", async () => {
    act(() => {
      render(<DormSearchBar name="Battell" />);
    });

    await waitFor(() => {
      const rooms = ["Room: 100", "Room: 101", "Room: 102"];
      rooms.forEach((room) => {
        expect(screen.getByText(room)).toBeInTheDocument();
      });
    });

    const select = screen.getByRole("combobox");

    act(() => {
      fireEvent.change(select, { target: { value: "3" } });
    });

    expect(select).toHaveValue("3");

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Search" }));
    });

    await waitFor(() => {
      const expectedRooms = "Room: 100";
      const unexpectedRooms = "Room: 101";

      expect(screen.getByText(expectedRooms)).toBeInTheDocument();
      expect(screen.queryByText(unexpectedRooms)).toBeNull();
    });
  });
});
