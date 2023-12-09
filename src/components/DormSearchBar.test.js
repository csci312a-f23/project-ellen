// import React from "react";
// import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// // eslint-disable-next-line import/no-extraneous-dependencies
// import mockRouter from "next-router-mock";
// // eslint-disable-next-line import/no-extraneous-dependencies
// import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
// import DormSearchBar from "./DormSearchBar";
// import testRooms from "../../data/test-data.json";

// jest.mock("next/router", () => ({
//   useRouter: jest.fn(),
// }));

// // We wrap the actual fetch implementation during testing so that we can introduce
// // the absolute URL (needed on teh server but not on the browser)
// const originalFetch = global.fetch;
// global.fetch = (url, ...params) => {
//   if (typeof url === "string" && url.startsWith("/")) {
//     return originalFetch(`http://0.0.0.0:3000${url}`, ...params);
//   }
//   return originalFetch(url, ...params);
// };

// // Tell the mock router about the pages we will use (so we can use dynamic routes)
// mockRouter.useParser(
//   createDynamicRouteParser([
//     // These paths should match those found in the `/pages` folder:
//     // "/dorms/[...names]/[...room]", // something wrong with this one, I think it doesn't like the endpoint of [...room]
//     "/dorms/[...name]",
//     "/app",
//     "/document",
//     "/index",
//     "/profile",
//     "/review",
//     "/rooms",
//   ]),
// );

// describe("DormSearchBar", () => {
//   beforeEach(() => {
//     mockRouter.setCurrentUrl("/");
//   });
//   afterEach(() => {
//     jest.resetAllMocks();
//   });

// //   test("Should display Battell rooms on initial render", async () => {
// //     render(<DormSearchBar />);

// //     await waitFor(() => {
// //     // just check for first few rooms
// //     const rooms = [
// //       "Room: 100",
// //       "Room: 101",
// //       "Room: 102",
// //       "Room: 103",
// //       "Room: 104",
// //       "Room: 105",
// //       "Room: 106",
// //       "Room: 107",
// //       "Room: 108",
// //     ];
// //     rooms.forEach((room) => {
// //       expect(screen.getByText(room)).toBeInTheDocument();
// //     });
// // });
// //   });

//   test("Should display Battell rooms on initial render", async () => {
//     // render(<DormSearchBar />);

//     // // Now, check for the presence of rooms
//     // const rooms = [
//     //   "Room: 100",
//     //   "Room: 101",
//     //   "Room: 102",
//     //   // ... other rooms
//     // ];
//     // rooms.forEach((testRoom) => {
//     //   expect(screen.getByText(testRoom)).toBeInTheDocument();
//     // });
//     render(<DormSearchBar name="Battell" />);

//     // Assuming the data structure in testData is similar to the actual API response
//     const roomsToCheck = testRooms
//       .filter((room) => room.dorm === "Battell")
//       .map((room) => `Room: ${room.id}`);

//     await waitFor(() => {
//       roomsToCheck.forEach((room) => {
//         expect(screen.getByText(room)).toBeInTheDocument();
//       });
//     });
//   });

//   test("Should filter rooms based on search term", async () => {
//     render(<DormSearchBar />);

//     const searchInput = screen.getByPlaceholderText("Search...");

//     fireEvent.change(searchInput, { target: { value: "101" } });
//     fireEvent.click(screen.getByRole("button", { name: "Search" }));

//     await screen.findByRole("list", { name: "SearchBar-results" });

//     const expectedResults = ["Room: 101"];
//     const unexpectedResults = ["Room: 102", "Room: 103"]; // Add any other rooms

//     expectedResults.forEach((room) => {
//         expect(screen.getByText(new RegExp(room))).toBeInTheDocument();
//       });

//     // expectedResults.forEach((room) => {
//     //   expect(screen.getByText(room)).toBeInTheDocument();
//     // });
//     unexpectedResults.forEach((room) => {
//       expect(screen.queryByText(room)).toBeNull();
//     });
//   });

//   test("Navigates to the correct page when a room is clicked", async () => {
//     render(<DormSearchBar />);

//     const roomNum = "Room: 100";
//     const roomItem = screen.getByText(roomNum).closest("li");
//     userEvent.click(roomItem);

//     mockRouter.push("/100");

//     await waitFor(() => {
//       expect(mockRouter.pathname).toBe("/100");
//       expect(mockRouter.asPath).toBe(`/${roomNum.split(" ").pop()}`);
//     });
//   });
// });
