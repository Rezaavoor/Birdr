import { observer } from "mobx-react-lite";
import Home from "../views/Home";

export default observer(function HomeP(props) {
  props.model.setBirdOfTheDay();

  if (!props.model.birdOfTheDayPromiseState.promise) {
    return <Home model={props.model} status="no data" />;
  }

  if (
    props.model.birdOfTheDayPromiseState.promise &&
    props.model.birdOfTheDayPromiseState.error &&
    !props.model.birdOfTheDayPromiseState.data
  ) {
    return <Home model={props.model} status="error" />;
  }

  if (
    props.model.birdOfTheDayPromiseState.promise &&
    !props.model.birdOfTheDayPromiseState.error &&
    !props.model.birdOfTheDayPromiseState.data
  ) {
    return <Home model={props.model} status="loading" />;
  }

  return <Home model={props.model} status="data" />;
});
