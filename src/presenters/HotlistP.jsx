import Hotlist from "../views/Hotlist";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { getBirdDetails } from "../modelSource";

export default observer(function HotlistP(props) {
  const navigate = useNavigate();
  
  function setCurrerntBirdACB(bird) {
    props.model.setCurrentBird(bird.id);
    navigate("/bird");
  }

  function convertHotList(){
    const convertedHotBirds = [];
    console.log(props.model.hotBirds, "This is the hotlist atm");

    for (let i = 1; i < 11; i++){
      const test = props.model.hotBirds[i];
      console.log(test.birdId);
      const convertedHotBird = getBirdDetails(props.model.hotBirds[i]);
      //console.log(convertedHotBird);
      convertedHotBirds.push(convertedHotBird);
    }
    return convertedHotBirds;
  }

  const convertedHotBirds = convertHotList();

  return (
    <div>
      <Hotlist
        currentHotlist={convertedHotBirds}
        onClickHandler={setCurrerntBirdACB}
      />
    </div>
  );
});