import Hotlist from "../views/Hotlist";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

export default observer(function HotlistP(props) {
  props.model.getHotBirds();

  if (!props.model.birdOfTheDayPromiseState.promise) {
    return <Hotlist status="no data" />;
  }

  if (
    props.model.birdOfTheDayPromiseState.promise &&
    props.model.birdOfTheDayPromiseState.error &&
    !props.model.birdOfTheDayPromiseState.data
  ) {
    return <Hotlist status="error" />;
  }

  if (
    props.model.birdOfTheDayPromiseState.promise &&
    !props.model.birdOfTheDayPromiseState.error &&
    !props.model.birdOfTheDayPromiseState.data
  ) {
    return (
      <Hotlist
        status="loading"
      />
    );
  }

  return (
    <Hotlist
      currentHotlist = {props.model.hotBirdPromiseState.data}
      status="data"
    />
  );
});