import { observer } from "mobx-react-lite";
import Bird from "../views/Bird";
import { useToast } from "@chakra-ui/react";

export default observer(function BirdP(props) {
  const toast = useToast();
  const isLoggedIn = !!props.model.user;
  const isBirdLiked = props.model.isBirdLiked(props.model.currentBird);

  function onClickHandleMyBirds() {
    if (!isBirdLiked) {
      props.model.addLikedBird(props.model.currentBird);
      toast({
        title: "Bird added.",
        description: `You added ${props.model.currentBirdPromiseState.data.name} to My Birds.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      props.model.removeLikedBird(props.model.currentBird);
      toast({
        title: "Bird removed.",
        description: `You removed ${props.model.currentBirdPromiseState.data.name} from My Birds.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
      onClickHandleMyBirds={onClickHandleMyBirds}
      isBirdLiked={isBirdLiked}
      isLoggedIn={isLoggedIn}
      status="data"
    />
  );
});
