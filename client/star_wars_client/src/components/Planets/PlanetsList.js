import classes from "./PlanetsList.module.css";
import Planet from "./Planet";

const PlanetsList = (props) => {
  return (
    <ul className={classes["planets-list"]}>
      {props.planete.map((planet, index) => {
        return (
          <Planet
            id={index}
            key={index}
            name={planet.name}
            rotation_period={planet.rotation_period}
            population={planet.population}
            terrain={planet.terrain}
            surface_water = {planet.surface_water}
          />
        );
      })}
    </ul>
  );
};

export default PlanetsList;
