import React from "react";
import { Link } from "react-router-dom";
export default function Card({ id, title, vote_average, tagline }) {
  return (
    <>
      <div className="card">
        <div>
          <h4>
            <b>{title}</b>
          </h4>
          <p>Average : {vote_average}</p>
          <i className="text-muted">Tag : {tagline}</i>
        </div>
        <div className="py-2">
          <Link style={{ textDecoration: "none" }} to={`/movie/${id}`}>
            <button type="button" className="btn btn-light">
              See more...
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
