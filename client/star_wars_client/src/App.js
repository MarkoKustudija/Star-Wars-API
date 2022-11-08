import React, { useState } from "react";
import "./App.css";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);

    // const addMovieHandler = () => {
    // setMovies((prevValue) => {
    //   return [...prevValue, newMovie];
    // });
  // }

  async function addMovieHandler (newMovie) {
    const response = await fetch('http://localhost:8080/api/movies/', {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  
  };

  let content = <p>No movie found</p>
  
  if(movies.length > 0) {
    content = <MoviesList  movies = {movies} />
  }



  const fetchMoviesHandler = () => {

  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
