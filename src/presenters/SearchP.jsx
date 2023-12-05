import Search from "../views/Search";

export default function SearchP(props) {
  function setCurrerntBirdACB(bird){
    props.model.setCurrerntBird(bird.id);
  }

  if(!props.model.searchResultsPromiseState.promise){
    return <Search status="no data"/>;
  }

  if(props.model.searchResultsPromiseState.promise && props.model.searchResultsPromiseState.error && !props.model.searchResultsPromiseState.data){
    return <Search status="error"/>;
  }

  if(props.model.searchResultsPromiseState.promise && !props.model.searchResultsPromiseState.error && !props.model.searchResultsPromiseState.data){
    return <Search status="loading"/>;
  }

  return <Search searchResults={props.model.searchResultsPromiseState.data} onClickHandler={setCurrerntBirdACB}/>;
}
