import { getBirdDetails, searchBird } from "./modelSource";
import resolvePromise from "./resolvePromise";

export default {
  user: {
    id: null,
    likedBirds: [],
  },
  hotBirds: [],
  searchParams: {},
  searchResultsPromiseState: {},
  currentBird: null,
  currentBirdPromiseState: {},
  birdOfTheDayPromiseState: {},
  birdOfTheDay: null,

  setCurrentBird(id) {
   /* getBirdDetails(id)
      .then((res) => res.json())
      .then((res) => (this.currentBird = res));*/
      resolvePromise(getBirdDetails(id), this.currentBirdPromiseState);
      this.currentBird = id;
  },

  addLikedBird(bird) {
    this.user.likedBirds = [...this.user.likedBirds, bird];
  },

  removeLikedBird(birdToRemove) {
    function checkBirdsCB(bird) {
      return bird.id != birdToRemove.id;
    }

    this.likedBirds = this.likedBirds.filter(checkBirdsCB);
  },

  async setBirdOfTheDay() {
    const id = Math.floor(Math.random() * 1000) + 1;
    resolvePromise(getBirdDetails(id), this.birdOfTheDayPromiseState);
    this.birdOfTheDay = id;
  },

  setSearchName(name) {
    this.searchParams.name = name;
  },

  /* setSearchRegion(region) {
    this.searchParams.region = region;
  },

  setSearchSciName(sciName) {
    this.searchParams.sciName = sciName;
  },*/

  doSearch(searchParams) {
    resolvePromise(searchBird(searchParams), this.searchResultsPromiseState)
  }
};
