import { useNavigate } from "react-router-dom";
import Search from "../views/Search";
import SearchForm from "../views/SearchForm";
import { observer } from "mobx-react-lite";

export default observer(function SearchP(props) {
  const navigate = useNavigate();
  function setCurrerntBirdACB(bird) {
    props.model.setCurrentBird(bird.id);
    navigate("/bird");
  }

  function textChangeHandlerACB(birdName) {
    props.model.setSearchName(birdName);
  }

  function searchClickHandlerACB() {
    props.model.doSearch(props.model.searchParams);
  }

  function renderSearchResult() {
    if (!props.model.searchResultsPromiseState.promise) {
      return <Search status="no data" />;
    }

    if (
      props.model.searchResultsPromiseState.promise &&
      props.model.searchResultsPromiseState.error &&
      !props.model.searchResultsPromiseState.data
    ) {
      return <Search status="error" />;
    }

    if (
      props.model.searchResultsPromiseState.promise &&
      !props.model.searchResultsPromiseState.error &&
      !props.model.searchResultsPromiseState.data
    ) {
      return <Search status="loading" />;
    }

    return (
      <Search
        searchResults={props.model.searchResultsPromiseState.data}
        onClickHandler={setCurrerntBirdACB}
        status="data"
      />
    );
  }

  return (
    <div>
      <SearchForm
        text={props.model.searchParams.name}
        changeTextValue={textChangeHandlerACB}
        searchClick={searchClickHandlerACB}
        onClickHandler={setCurrerntBirdACB}
      />
      {renderSearchResult()}
    </div>
  );
});
