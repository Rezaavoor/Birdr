import { observer } from "mobx-react-lite";
import Home from "../views/Home";

export default 
//observer(
  function HomeP(props) {
    props.model.setBirdOfTheDay();

  if(!props.model.birdOfTheDayPromiseState.promise){
    return <p>no data</p>
  } 

  if(props.model.birdOfTheDayPromiseState.promise && props.model.birdOfTheDayPromiseState.error && !props.model.birdOfTheDayPromiseState.data){
      return <p>{props.model.currentDishPromiseState.error}</p>;
  }

  if(props.model.birdOfTheDayPromiseState.promise && !props.model.birdOfTheDayPromiseState.error && !props.model.birdOfTheDayPromiseState.data){
      return <img src="https://brfenergi.se/iprog/loading.gif"/>;
  }

  return <Home model={props.model} />;
}
//);
