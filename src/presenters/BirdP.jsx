import { observer } from "mobx-react-lite";
import Bird from "../views/Bird";

export default observer(function BirdP(props) {
  function onClickAddToMyBirds() {
    props.model.addLikedBird(props.model.birdOfTheDay);
  }
  if (!props.model.currentBirdPromiseState.promise) {
    return <Bird status="no data" />;
  }

  if (
    props.model.currentBirdPromiseState.promise &&
    props.model.currentBirdPromiseState.error &&
    !props.model.currentBirdPromiseState.data
  ) {
    return <Bird status="error" />;
  }

  if (
    props.model.currentBirdPromiseState.promise &&
    !props.model.currentBirdPromiseState.error &&
    !props.model.currentBirdPromiseState.data
  ) {
    return <Bird status="loading" />;
  }

  return (
    <Bird
      bird={props.model.currentBirdPromiseState.data}
      onClickAddToMyBirds={onClickAddToMyBirds}
      status="data"
    />
  );
});
