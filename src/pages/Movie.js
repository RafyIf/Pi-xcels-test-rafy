import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
export default function Movie() {
  let { id } = useParams();
  const [movie, setMovie] = useState([]);
  let history = useHistory();
  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/movies/" + id);
      const payload = await response.json();
      if ("data" != payload) {
        history.push("/notfound");
      } else {
        setMovie(payload.data);
        document.title = payload.data.title;
      }
    }
    getData();
  }, []);
  const runtimeExcecute = (runtime) => {
    let start = new Date().getTime();

    for (let i = 0; i < runtime; ++i) {
      // do something
    }

    let end = new Date().getTime();
    let time = end - start;
    return time;
  };
  const formatDate = (dates) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let convert = String(dates).split("/");
    let release_date = new Date(
      convert[1] + "/" + convert[0] + "/" + convert[2]
    );
    return (
      days[release_date.getDay()] +
      " " +
      months[release_date.getMonth()] +
      " " +
      release_date.getDate() +
      " " +
      release_date.getFullYear()
    );
  };
  return (
    <div className="container">
      <div className="card">
        <h2>
          title : <i>{movie.title}</i>
        </h2>
        <p>overview : {movie.overview}</p>

        <table>
          <tbody>
            <tr>
              <td>
                <b>status </b>
              </td>
              <td>
                <b className="text-success">{movie.status}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>release </b>
              </td>
              <td>
                <b className="text-muted">{formatDate(movie.release_date)}</b>
              </td>
            </tr>
            <tr>
              <td>
                <i>Tag</i>
              </td>
              <td>
                <i className="text-muted">{movie.tagline}</i>
              </td>
            </tr>
            <tr>
              <td>
                <i>runtime</i>
              </td>
              <td>
                <i className="text-muted">{runtimeExcecute(movie.runtime)}</i>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ margin: "5px 10px 0 2px" }}>
          <table>
            <thead>
              <tr>
                <td>Average</td>
                <td>Count</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{movie.vote_average}</td>
                <td>{movie.vote_count}</td>
              </tr>
            </tbody>
          </table>
          <Link style={{ textDecoration: "none" }} to="/">
            <button className="btn btn-info" type="button">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
