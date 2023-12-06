import Search from "../views/Search";
import SearchForm from "../views/SearchForm";

export default function SearchP(props) {
  function setCurrerntBirdACB(bird){
    props.model.setCurrerntBird(bird.id);
  }

  function textChangeHandlerACB(birdName){
    props.model.setSearchName(birdName);
  }

  function searchClickHandlerACB(){
    props.model.doSearch(props.model.searchParams);
  }

  function renderSearchResult(){
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

  return <div><SearchForm text={props.model.searchParams.name} textChange={textChangeHandlerACB} searchClick={searchClickHandlerACB}/>
  {renderSearchResult()}
  </div>
}
