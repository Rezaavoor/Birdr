import { getBirdDetails } from "./modelSource";

export default {
  user: {
    id: null,
  },
  likedBirds: [],
  hotBirds: [],
  searchParams: {},
  searchResultsPromiseState: {},
  currentBird: null,
  birdOfTheDay: null,

  setCurrentBird(id) {
    getBirdDetails(id)
      .then((res) => res.json())
      .then((res) => (this.currentBird = res));
  },

  addLikedBird(bird) {
    this.likedBirds = [...this.likedBirds, bird];
  },

  removeLikedBird(birdToRemove) {
    function checkBirdsCB(bird) {
      return bird.id != birdToRemove.id;
    }

    this.likedBirds = this.likedBirds.filter(checkBirdsCB);
  },

  async setBirdOfTheDay() {
    const id = Math.floor(Math.random() * 1000) + 1;
    getBirdDetails(id)
      .then((res) => res.json())
      .then((res) => (this.birdOfTheDay = res));
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
};
