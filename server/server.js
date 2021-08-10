const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

// PWAs want HTTPS!
function checkHttps(request, response, next) {
  // Check the protocol — if http, redirect to https.
  if (request.secure) {
    return next();
  } else {
    response.redirect("https://" + request.hostname + request.url);
  }
}

app.all("*", checkHttps);

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

// get List Movie
app.get("/api/movies", (request, response) => {
  const { current_page = 1, per_page_items = 10 } = request.query;
  let rawData = fs.readFileSync(
    path.resolve(__dirname, "movies_metadata.json")
  );
  let movies = JSON.parse(rawData);
  let page = Number(current_page),
    per_page = Number(per_page_items),
    offset = (page - 1) * per_page,
    paginatedItems = movies.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(movies.length / per_page);

  console.log("❇️ Received GET request to /api/movies");
  response.json({
    status: "success",
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: movies.length,
    total_pages: total_pages,
    data: paginatedItems,
  });
});

//get Single movie by ID
app.get("/api/movies/:id", (request, response) => {
  let rawData = fs.readFileSync(
    path.resolve(__dirname, "movies_metadata.json")
  );
  let dbMovies = JSON.parse(rawData);
  let movie = dbMovies.find((movies, index) => {
    if (movies.id === Number(request.params.id)) return true;
  });
  console.log("❇️ Received GET request to /api/movies/:id");
  response.json({ status: "success", data: movie });
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
