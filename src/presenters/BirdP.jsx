import Bird from "../views/Bird";

export default function BirdP(props) {
  function onClickAddToMyBirds() {
    props.model.addLikedBird(props.model.birdOfTheDay);
  }
  if (!props.model.birdOfTheDayPromiseState.promise) {
    return <Bird status="no data" />;
  }

  if (
    props.model.birdOfTheDayPromiseState.promise &&
    props.model.birdOfTheDayPromiseState.error &&
    !props.model.birdOfTheDayPromiseState.data
  ) {
    return <Bird status="error" />;
  }

  if (
    props.model.birdOfTheDayPromiseState.promise &&
    !props.model.birdOfTheDayPromiseState.error &&
    !props.model.birdOfTheDayPromiseState.data
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
}
