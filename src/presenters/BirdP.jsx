import { observer } from "mobx-react-lite";
import Bird from "../views/Bird";
import { useToast } from "@chakra-ui/react";

export default observer(function BirdP(props) {
  const toast = useToast();
  function onClickAddToMyBirds() {
    props.model.addLikedBird(props.model.currentBird);
    toast({
      title: "Bird added.",
      description: `You added ${props.model.currentBirdPromiseState.data.name} to My Birds.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
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
