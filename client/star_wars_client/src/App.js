import React, { useState } from "react";
import "./App.css";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);

  //   const addMovieHandler = (newMovie) => {
  //   setMovies((prevValue) => {
  //     return [...prevValue, newMovie];
  //   });
  // }

  async function addMovieHandler(newMovie) {
    const response = await fetch("http://localhost:8080/api/movies/", {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p>No movie found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  async function fetchMoviesHandler() {
    const response = await fetch("http://localhost:8080/api/movies/",{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }
    );
    if (!response.ok) {
      throw new Error("Somethoing went wrong!");
    }
    const data = await response.json();
    console.log(data);

    const loadedMovies = [];

    for (const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        releaseDate: data[key].releaseDate,
        openingText: data[key].openingText,
      });
    }

    setMovies(loadedMovies);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
