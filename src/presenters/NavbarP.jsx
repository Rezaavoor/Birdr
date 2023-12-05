import Navbar from "../views/Navbar";

export default function NavbarP(props) {
    function searchClickACB(bird){
        props.model.doSearch(bird.id);
    }
  return <Navbar searchClick={searchClickACB}/>;
}