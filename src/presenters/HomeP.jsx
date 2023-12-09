import { observer } from "mobx-react-lite";
import Home from "../views/Home";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default observer(function HomeP(props) {
  const navigate = useNavigate();
  const toast = useToast();
  props.model.setBirdOfTheDay();
  function onClickAddToMyBirds() {
    props.model.addLikedBird(props.model.birdOfTheDay);
    toast({
      title: "Bird added.",
      description: `You added ${props.model.birdOfTheDayPromiseState.data.name} to My Birds.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }
  function onClickMoreDetails() {
    props.model.setCurrentBird(props.model.birdOfTheDay);
    
    console.log(props.model.currentBirdPromiseState);
    window.alert("Redirecting to Bird Page!");
    window.location.href = "bird";
    navigate("/bird");
  }

  if (!props.model.birdOfTheDayPromiseState.promise) {
    return <Home status="no data" />;
  }

  if (
    props.model.birdOfTheDayPromiseState.promise &&
    props.model.birdOfTheDayPromiseState.error &&
    !props.model.birdOfTheDayPromiseState.data
  ) {
    return <Home status="error" />;
  }

  if (
    props.model.birdOfTheDayPromiseState.promise &&
    !props.model.birdOfTheDayPromiseState.error &&
    !props.model.birdOfTheDayPromiseState.data
  ) {
    return (
      <Home
        onClickAddToMyBirds={onClickAddToMyBirds}
        onClickMoreDetails={onClickMoreDetails}
        status="loading"
      />
    );
  }

  return (
    <Home
      name={props.model.birdOfTheDayPromiseState.data.name}
      images={props.model.birdOfTheDayPromiseState.data.images}
      onClickAddToMyBirds={onClickAddToMyBirds}
      onClickMoreDetails={onClickMoreDetails}
      status="data"
    />
  );
});
