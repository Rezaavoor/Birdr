# Birdr
A wiki for bird watchers and bird enthusiasts!

On Birdr you can see the bird of the day, search for different birds and add the ones you like to your personal bird list. 
You can listen to many different bird calls as well as check out all the pictures of the birds. 
The most popular birds gets a spot on the hotlist which is a list for the most popular birds. 

Live webpage: https://birdr-7cc64.web.app/

# How to setup the project locally
## 1. Clone this repository
## 2. Open the main directory in your preffered editor
## 3. Run command `npm install`
## 4. Add a file called "apiConfig.js" in /src directory and insert your api key and base url as following:
```js
const BASE_URL = "https://nuthatch.lastelm.software/";
const API_KEY = YOUR_OWN_API_KEY;
export {BASE_URL , API_KEY};
```

## 5. Add a file called "firebaseConfig.js" in /src directory and insert your own credentials as following (Make sure you have created a project in Firebase and have a realtime database and authentication configured):
```js
const firebaseConfig = {
  apiKey: YOUR_OWN_API_KEY,
  authDomain: YOUR_OWN,
  databaseURL: YOUR_OWN,
  projectId: YOUR_OWN,
  storageBucket: YOUR_OWN,
  messagingSenderId: YOUR_OWN,
  appId: YOUR_OWN,
  measurementId: YOUR_OWN
};

export default firebaseConfig;
```
## 6. Run command `npm run dev` to start the project on your local host
## 7. Go to `http://localhost:8080/` in your broswer to see the project
