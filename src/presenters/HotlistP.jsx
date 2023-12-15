import Hotlist from "../views/Hotlist";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export default observer(function HotlistP(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.model.getHotBirds();
      } catch (error) {
        console.error("Error fetching hot birds:", error);
      }
    };
  
    if (!props.model.hotBirdsPromiseState.data) {
      fetchData();
    }
  }, [props.model.hotBirdsPromiseState.data, props.model]);

  function onClickMoreDetails(bird) {
    props.model.setCurrentBird(bird.id);
    navigate("/bird");
  }

  if (!props.model.hotBirdsPromiseState.promise) {
    return <Hotlist status="no data" />;
  }

  if (
    props.model.hotBirdsPromiseState.promise &&
    props.model.hotBirdsPromiseState.error &&
    !props.model.hotBirdsPromiseState.data
  ) {
    return <Hotlist status="error" />;
  }

  if (
    props.model.hotBirdsPromiseState.promise &&
    !props.model.hotBirdsPromiseState.error &&
    !props.model.hotBirdsPromiseState.data
  ) {
    return (
      <Hotlist
        status="loading"
        onClickHandler = {onClickMoreDetails}
      />
    );
  }

  return (
    <Hotlist
      currentHotlist = {props.model.hotBirdsPromiseState.data}
      onClickHandler = {onClickMoreDetails}
      status="data"
    />
  );
});