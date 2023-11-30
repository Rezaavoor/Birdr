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
  birdOfTheDay: {
    id: null,
    name: "",
    images: [],
  },

  setCurrentBird(id) {
    getBirdDetails(id).then((res) => res.json())
    .then((res) => this.currentBird = res);
  },

  addLikedBird(bird) {
    this.likedBirds = [...this.likedBirds, bird];
  },

  removeLikedBird(birdToRemove) {
    function checkBirdsCB(bird) {
      return bird.id != birdToRemove.id;
    }

    this.likedBirds = this.likedBirds.filter(checkBirdsCB)
  },
};
