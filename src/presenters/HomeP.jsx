import Home from "../views/Home";

export default function HomeP(props) {
  return <Home birdOfTheDay = {props.model.birdOfTheDay}/>;
}
