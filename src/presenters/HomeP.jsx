import Home from "../views/Home";

export default function HomeP(props) {
  props.model.setBirdOfTheDay();
  return <Home model={props.model} />;
}
