/* eslint-disable global-require */
import { wrapError, DBError } from "db-errors";

let getServerSession;
let authOptions;
let User;

if (typeof window === "undefined") {
  // This code will only run on the server side
  getServerSession = require("next-auth/next").getServerSession;
  authOptions = require("../pages/api/auth/[...nextauth]").authOptions;
  User = require("../../models/User").default;
}

export function onError(error, request, response, next) {
  if (response.headersSent) {
    next(error);
  }
  const wrappedError = wrapError(error);
  if (wrappedError instanceof DBError) {
    response.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
}

export async function authenticated(request, response, next) {
  const session = await getServerSession(request, response, authOptions);
  if (session) {
    request.user = await User.query()
      .findById(session.user.id)
      .throwIfNotFound();
    await next(); // Authenticated, proceed to the next handler
  } else {
    response.redirect("/login");
  }
}
