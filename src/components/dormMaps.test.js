import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DormMaps from "./dormMaps";

describe("Testing DormMaps Component", () => {
  const dormName = "Battell";
  const dormImages = {
    Battell: {
      firstFloor: "/images/Battell1F.png",
      secondFloor: "/images/Battell2F.png",
    },
  };

  beforeEach(() => {
    render(<DormMaps selectedDorm={dormName} />);
  });

  afterEach(() => {
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
});
