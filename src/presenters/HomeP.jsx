import { observer } from "mobx-react-lite";
import Home from "../views/Home";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

export default observer(function HomeP(props) {
  const navigate = useNavigate();
  const toast = useToast();
  props.model.setBirdOfTheDay();
  const isLoggedIn = !!props.model.user;
  const isBirdLiked = props.model.isBirdLiked(props.model.birdOfTheDay);


  function onClickHandleMyBirds() {
    if (!isBirdLiked) {
      props.model.addLikedBird(props.model.birdOfTheDay);
      toast({
        title: "Bird added.",
        description: `You added ${props.model.birdOfTheDayPromiseState.data.name} to My Birds.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      props.model.removeLikedBird(props.model.birdOfTheDay);
      toast({
        title: "Bird removed.",
        description: `You removed ${props.model.birdOfTheDayPromiseState.data.name} from My Birds.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  function onClickMoreDetails() {
    props.model.setCurrentBird(props.model.birdOfTheDay);
    
    navigate(`/bird/${props.model.birdOfTheDay}`); 

    
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
        onClickHandleMyBirds={onClickHandleMyBirds}
        onClickMoreDetails={onClickMoreDetails}
        status="loading"
      />
    );
  }

  return (
    <Home
      name={props.model.birdOfTheDayPromiseState.data.name}
      images={props.model.birdOfTheDayPromiseState.data.images}
      onClickHandleMyBirds={onClickHandleMyBirds}
      onClickMoreDetails={onClickMoreDetails}
      isBirdLiked={isBirdLiked}
      isLoggedIn={isLoggedIn}
      status="data"
    />
  );
});
