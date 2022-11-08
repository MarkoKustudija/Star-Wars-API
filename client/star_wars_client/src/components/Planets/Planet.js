import classes from "./Planet.module.css";

const Planet = (props) => {
  return (
    <li className={classes.planet}>
      <h2>{props.name} </h2>
      <h3>{props.rotation_period}</h3>
      <h3>{props.population}</h3>
      <h3> {props.terrain}</h3>
      <h3> {props.surface_water}</h3>
    </li>
  );
};

export default Planet;
