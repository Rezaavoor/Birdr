import { getBirdDetails, getBirdsDetailsById, searchBird } from "./modelSource";
import resolvePromise from "./resolvePromise";
import { auth } from "./firebaseModel";
import { signOut } from "firebase/auth";

export default {
  user: null,

  likedBirds: [],

  hotBirds: [],
  searchParams: {},
  searchResultsPromiseState: {},
  currentBird: null,
  currentBirdPromiseState: {},
  birdOfTheDayPromiseState: {},
  hotBirdsPromiseState: {},
  likedBirdsPromiseState: {},
  birdOfTheDay: null,
  birdsOfTheDay: [
    1, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 17, 20, 21, 22, 23, 26, 28, 29, 30,
    31, 33, 34, 35, 36, 39, 40, 41, 43, 44, 45, 46, 48, 51, 54, 58, 59, 63, 68,
    69, 71, 72, 77, 80, 82, 83, 85, 86, 89, 90, 94, 100, 106, 107, 108, 110,
    111, 114, 116, 122, 123, 124, 128, 129, 130, 131, 132, 133, 134, 137, 138,
    140, 141, 142, 145, 146, 147, 148, 149, 153, 154, 155, 156, 157, 158, 159,
    160, 163, 172, 173, 174, 175, 176, 177, 185, 192, 193, 197, 198, 199, 202,
    206, 207, 209, 211, 214, 215, 218, 219, 220, 221, 222, 223, 224, 226, 229,
    230, 236, 237, 239, 240, 241, 242, 243, 244, 246, 247, 248, 249, 250, 251,
    254, 255, 256, 257, 258, 260, 261, 262, 263, 264, 265, 267, 268, 269, 270,
    271, 272, 275, 277, 278, 279, 280, 282, 284, 285, 286, 287, 288, 290, 292,
    294, 295, 298, 299, 300, 301, 304, 306, 307, 308, 309, 313, 314, 319, 321,
    322, 323, 324, 325, 328, 329, 332, 336, 337, 339, 340, 341, 342, 344, 346,
    352, 354, 364, 365, 366, 369, 370, 372, 374, 376, 377, 379, 381, 386, 389,
    392, 393, 395, 396, 398, 399, 401, 403, 404, 406, 407, 410, 411, 412, 416,
    419, 420, 422, 423, 425, 426, 428, 432, 434, 435, 437, 440, 444, 446, 448,
    449, 450, 451, 452, 453, 455, 456, 458, 459, 464, 465, 466, 467, 468, 473,
    475, 477, 478, 479, 480, 483, 484, 487, 488, 491, 492, 493, 495, 500, 501,
    503, 513, 515, 518, 523, 524, 525, 527, 528, 530, 533, 538, 541, 542, 543,
    546, 549, 550, 552, 553, 554, 555, 557, 558, 559, 562, 564, 570, 571, 572,
    573, 574, 579, 580, 581, 582, 583, 584, 586, 590, 592, 593, 594, 596, 598,
    599, 601, 602, 603, 605, 606, 608, 610, 616, 617, 618, 621, 622, 623, 624,
    625, 626, 627, 628, 631, 633, 634, 638, 639, 642, 646, 647, 657, 659, 660,
    754, 757, 761, 763, 857, 860, 465, 863, 866, 952, 954, 955, 964, 970, 975,
    979, 988, 990, 992, 994, 995, 404, 69, 26, 10,
  ],

  setCurrentBird(id) {
    resolvePromise(getBirdDetails(id), this.currentBirdPromiseState);
    this.currentBird = id;
    this.updataViewCount(id);

    //localStorage.setItem('currentBird', id);
  },

  updataViewCount(birdId) {
    const foundBird = this.hotBirds.find(findBirdCB);

    function findBirdCB(entry) {
      return entry.birdId === birdId;
    }

    if (foundBird) {
      foundBird.viewCount += 1;
    } else {
      const birdEntry = {
        birdId: birdId,
        viewCount: 1,
      };

      this.hotBirds.push(birdEntry);
    }

    this.hotBirds.sort(sortBirdCB);

    function sortBirdCB(a, b) {
      return b.viewCount - a.viewCount;
    }

    this.hotBirds = [...this.hotBirds];
  },

  addLikedBird(bird) {
    this.likedBirds = [...this.likedBirds, bird];
    this.getLikedBirds();
  },

  removeLikedBird(birdToRemove) {
    function checkBirdsCB(birdId) {
      return birdId != birdToRemove;
    }

    this.likedBirds = this.likedBirds.filter(checkBirdsCB);
    this.getLikedBirds();
  },

  async setBirdOfTheDay() {
    const getDateOfYearCB = () => {
      const date = new Date();
      return Math.floor(
        (date.getTime() - new Date(date.getFullYear(), 0, 0)) / 864e5
      );
    };

    if (!this.birdOfTheDay) {
      const id = this.birdsOfTheDay[getDateOfYearCB()];
      resolvePromise(getBirdDetails(id), this.birdOfTheDayPromiseState);
      this.birdOfTheDay = id;
    }
  },

  getHotBirds() {
    const slicedHotBirds = this.hotBirds.slice(0, 10);
    const ids = slicedHotBirds.map((bird) => bird.birdId);
    resolvePromise(getBirdsDetailsById(ids), this.hotBirdsPromiseState);
  },

  getLikedBirds() {
    resolvePromise(
      getBirdsDetailsById(this.likedBirds),
      this.likedBirdsPromiseState
    );
  },

  setSearchName(name) {
    this.searchParams.name = name;
  },

  setHasImg() {
    this.searchParams.hasImg = this.searchParams.hasImg ? false : true;
  },

  setSearchRegion(region) {
    this.searchParams.region = region;
  },

  doSearch(searchParams) {
    resolvePromise(
      searchBird(searchParams.name, searchParams.hasImg),
      this.searchResultsPromiseState
    );
  },

  isBirdLiked(id) {
    return this.likedBirds.filter(isBirdLikedCB).length > 0 && !!this.user;

    function isBirdLikedCB(curId) {
      return curId == id;
    }
  },
  signOut() {
    signOut(auth);
  },

  init() {
    //if(this.user === null){
    const currentPath = window.location.pathname;
    const match = currentPath.match(/\/bird\/(\d+)/);
    const birdId = match ? match[1] : null;

    if (birdId) {
      this.setCurrentBird(birdId);
   // }
  }
  },
};

/***
 *  const storedCurrentBird = localStorage.getItem('currentBird');
    if (storedCurrentBird) {
      this.setCurrentBird(storedCurrentBird);
    }
  },
 */
