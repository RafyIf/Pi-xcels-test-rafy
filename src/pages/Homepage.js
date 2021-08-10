import React, { useState, useEffect } from "react";
import Card from "../component/Card";
export default function Homepage() {
  const [movies, setMovies] = useState({});
  const [paginate, setPaginate] = useState({
    page: 1,
    perPage: 10,
    pre_page: null,
  });
  useEffect(() => {
    document.title = "Movie List"
    async function getData() {
      const response = await fetch(
        `/api/movies?current_page=${paginate.page}&per_page_items=${paginate.perPage}`
      );
      const payload = await response.json();
      setMovies(payload);
      setPaginate({
        page: payload.next_page,
        perPage: payload.per_page,
        pre_page: payload.pre_page,
      });
    }
    getData();
  }, []);

  const nextPage = async () => {
    const response = await fetch(
      `/api/movies?current_page=${paginate.page}&per_page_items=${paginate.perPage}`
    );
    const payload = await response.json();
    setMovies(payload);
    setPaginate({
      page: payload.next_page,
      perPage: payload.per_page,
      pre_page: payload.pre_page,
    });
  };

  const backPage = async () => {
    const response = await fetch(
      `/api/movies?current_page=${paginate.pre_page}&per_page_items=${paginate.perPage}`
    );
    const payload = await response.json();
    setMovies(payload);
    setPaginate({
      page: payload.next_page,
      perPage: payload.per_page,
      pre_page: payload.pre_page,
    });
  };
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <p>total movie : {movies.total}</p>
        <h1>Movie List</h1>
        <p>page : {movies.page}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 !important",
        }}
        className="container"
      >
        <button
          className="btn btn-light"
          style={{
            display:
              paginate.pre_page == null || paginate.pre_page == 0
                ? "none"
                : "block",
          }}
          onClick={backPage}
        >
          Back
        </button>
        <button
          className="btn btn-info"
          type="button"
          style={{
            display: paginate.page < movies.total_pages ? "block" : "none",
          }}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      <div className="container">
        {Array.isArray(movies.data) ? (
          <div className="row">
            {movies.data.map((item) => (
              <Card {...item} key={item.id} />
            ))}
          </div>
        ) : (
          <p>please waitt...</p>
        )}
      </div>
    </div>
  );
}
