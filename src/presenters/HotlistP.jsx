import Hotlist from "../views/Hotlist";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

export default observer(function HotlistP(props) {
  const navigate = useNavigate();
  
  function setCurrerntBirdACB(bird) {
    props.model.setCurrentBird(bird.id);
    navigate("/bird");
  }

  return (
    <div>
      <Hotlist
        currentHotlist={props.model.hotBirds}
        onClickHandler={setCurrerntBirdACB}
      />
    </div>
  );
});