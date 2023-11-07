import { render } from "@testing-library/react";
import Home from "@/pages/index";
// eslint-disable-next-line import/no-extraneous-dependencies
import mockRouter from "next-router-mock";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

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

describe("End-to-end testing", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/articles");
  });

  test("Render index.js component", () => {
    render(<Home />);
  });
});
