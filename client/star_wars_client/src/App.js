import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // const [planets, setPlanets] = useState([]);
  // const [isFetchingMovies, setIsFetchingMovies] = useState(false);

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

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading....</p>;
  }

  // let contentPlanet = <p> No planet was found</p>;

  // if (planets.length > 0) {
  //   contentPlanet = <PlanetsList planete={planets} />;
  // }

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/api/movies/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(()=> {
    fetchMoviesHandler()
   },[fetchMoviesHandler]);

  // async function fetchMoviesHandler() {
  //   const response = await fetch("https://swapi.dev/api/films/");

  //   if (!response.ok) {
  //     throw new Error("Somethoing went wrong!");
  //   }

  //   const data = await response.json();
  //   console.log(data);

  //   const transformedMovies = data.results.map((movieData) => {
  //     return {
  //       id: movieData.id,
  //       title: movieData.title,
  //       releaseDate: movieData.release_date,
  //       openingText: movieData.opening_crawl,
  //     };
  //   });

  //   setMovies(transformedMovies);
  // }

  // async function fetchPlanetsHandler() {
  //   const response = await fetch("https://swapi.dev/api/planets");
  //   if (!response.ok) {
  //     throw new Error("Somethoing went wrong!");
  //   }

  //   const data = await response.json();
  //   console.log(data);

  //   const loadedPlanets = data.results.map((planetData) => {
  //     return {
  //       id: planetData.id,
  //       name: planetData.name,
  //       rotation_period: planetData.rotation_period,
  //       population: planetData.population,
  //       terrain: planetData.terrain,
  //       surface_water: planetData.surface_water,
  //     };
  //   });
  //   setPlanets(loadedPlanets);
  // }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <section>{content}</section>
      </section>
      {/* <section>
          <button onClick={fetchPlanetsHandler}> Fetch Planets</button>
          <section> {contentPlanet}</section>
        </section> */}
    </React.Fragment>
  );
}

export default App;
