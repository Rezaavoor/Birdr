import { useNavigate } from "react-router-dom";
import Search from "../views/Search";
import SearchForm from "../views/SearchForm";
import { observer } from "mobx-react-lite";

export default observer(function SearchP(props) {
  const navigate = useNavigate();

  function setCurrentBirdACB(bird) {
    props.model.setCurrentBird(bird.id);
    navigate(`/bird/${bird.id}`);
  }
  function setCurrentPageACB(page) {
    if (page != props.model.searchResultsPromiseState.data.page)
      props.model.setPageNr(page);
  }

  function textChangeHandlerACB(birdName) {
    props.model.setSearchName(birdName);
  }

  function searchClickHandlerACB() {
    props.model.setPageNr(1);
  }

  function onlyImagesHandlerACB() {
    props.model.setHasImg();
    props.model.setPageNr(1);
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
    props.model.getPages();
    return (
      <Search
        searchResults={props.model.searchResultsPromiseState.data.entities}
        totalResults={props.model.searchResultsPromiseState.data.total}
        currentPage={props.model.searchResultsPromiseState.data.page}
        totalPages={props.model.pages}
        onBirdClick={setCurrentBirdACB}
        onPageClick={setCurrentPageACB}
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
        onClickHandler={setCurrentBirdACB}
        onlyImages={onlyImagesHandlerACB}
        hasImg={props.model.searchParams.hasImg}
      />
      {renderSearchResult()}
    </div>
  );
});
