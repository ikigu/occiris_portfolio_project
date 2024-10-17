function createSessionStore(mongoDbURL) {
  return {
    uri: mongoDbURL,
    databaseName: "occiris",
    collection: "sessions",
  };
}

function createSessionCookie(sessionStore) {
  return {
    secret: "somethingincrediblyhardtoguess",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    SameSite: "strict",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      sameSite: "strict",
    },
  };
}

module.exports = {
  createSessionStore: createSessionStore,
  createSessionCookie: createSessionCookie,
};
