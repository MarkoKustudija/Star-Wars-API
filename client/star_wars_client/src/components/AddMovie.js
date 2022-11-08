import { useState } from "react";
import classes from "./AddMovie.module.css";

const AddMovie = (props) => {
  const [movie, setMovie] = useState({
    title: "",
    releaseDate: "",
    openingText: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();
    setMovie({
      title: "",
      releaseDate: "",
      openingText: "",
    });
    console.log(movie);
    props.onAddMovie(movie);
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
        ></input>
      </div>
      <div className={classes.control}>
        <textarea
          onChange={handleChange}
          type="text"
          name="openingText"
          placeholder="Write some text..."
          value={movie.openingText}
        ></textarea>
      </div>
      <div className={classes.control}>
        <input
          onChange={handleChange}
          name="releaseDate"
          placeholder="Date"
          value={movie.releaseDate}
        ></input>
      </div>
      <button> Add Movie</button>
    </form>
  );
};

export default AddMovie;
