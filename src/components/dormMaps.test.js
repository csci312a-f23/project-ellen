import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import "@testing-library/jest-dom";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import DormMaps from "./dormMaps";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Tell the mock router about the pages we will use (so we can use dynamic routes)
mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/dorms/Battell/[...room]", // something wrong with this one, I think it doesn't like the endpoint of [...room]
    "/dorms/[...name]",
    "/app",
    "/document",
    "/index",
    "/profile",
    "/review",
    "/rooms",
  ]),
);

describe("Testing DormMaps Component", () => {
  const dormName = "Battell";
  const dormImages = {
    Battell: {
      firstFloor: "/images/Battell1F.png",
      secondFloor: "/images/Battell2F.png",
    },
  };

  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
    render(<DormMaps selectedDorm={dormName} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetAllMocks();
  });

  test("displays the correct title for the selected dorm", () => {
    const titleElement = screen.getByText(dormName);
    expect(titleElement).toBeInTheDocument();
  });

  test("displays the correct images for the selected dorm", () => {
    Object.entries(dormImages[dormName]).forEach(([floorName, imagePath]) => {
      const imageAlt = `${floorName} image`;
      const imageElement = screen.getByAltText(imageAlt);
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute("src", imagePath);
    });
  });

  test("popup appears on hover over a room", () => {
    const roomNumber = "100";
    const mapArea = screen.getBy(`259,219,283,261`);
    fireEvent.mouseOver(mapArea);

    expect(screen.getByText(`Room: ${roomNumber}`)).toBeInTheDocument();
  });

  test("navigates to correct room page on click", () => {
    const roomNumber = "100";
    const mapArea = screen.getByAltText(`Room ${roomNumber}`);
    fireEvent.click(mapArea);

    mockRouter.push("/dorms/Battell/100");

    expect(mockRouter.asPath).toBe(`/dorms/Battell/${roomNumber}`);
  });
});
