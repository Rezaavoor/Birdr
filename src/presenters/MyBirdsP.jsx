import MyBirds from "../views/MyBirds";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export default observer(function MyBirdsP(props) {
  const navigate = useNavigate();
  const toast = useToast;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.model.getLikedBirds();
      } catch (error) {
        console.error("Error fetching liked birds:", error);
      }
    };

    console.log(props.model.likedBirdsPromiseState);

    if (!props.model.likedBirdsPromiseState.data) {
      fetchData();
    }
  }, [props.model.likedBirds]);

  function onClickMoreDetails(bird) {
    props.model.setCurrentBird(bird.id);
    navigate("/bird");
  }

  function removeMyBird(bird) {
    props.model.removeLikedBird(bird.id);
    // toast({
    //   title: "Bird removed.",
    //   description: `You removed ${bird.name} from My Birds.`,
    //   status: "error",
    //   duration: 5000,
    //   isClosable: true,
    // });
  }

  if (!props.model.likedBirdsPromiseState.promise) {
    return <MyBirds status="no data" />;
  }

  if (
    props.model.likedBirdsPromiseState.promise &&
    props.model.likedBirdsPromiseState.error &&
    !props.model.likedBirdsPromiseState.data
  ) {
    return <MyBirds status="error" />;
  }

  if (
    props.model.likedBirdsPromiseState.promise &&
    !props.model.likedBirdsPromiseState.error &&
    !props.model.likedBirdsPromiseState.data
  ) {
    return (
      <MyBirds
        status="loading"
        onClickHandler={onClickMoreDetails}
        removeBird={removeMyBird}
      />
    );
  }

  return (
    <MyBirds
      myBirds={props.model.likedBirdsPromiseState.data}
      onClickHandler={onClickMoreDetails}
      removeBird={removeMyBird}
      status="data"
    />
  );
});
