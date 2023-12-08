# Birdr
A wiki for bird watchers and bird enthusiasts!

Live webpage: https://birdr-7cc64.web.app/

# What we have done so far:
 - Homepage (Bird Of The Day Feature)
 - Search page (you can search for birds)
 - Bird details paged (info, image and recording)
 - Mostly all backend (Hotlist, Likedbirds partially)
 - Figma design for all views
 - Deployed the website
 - Received a few user evaluations

# What we plan to do:
 - Add authentication and persist user data (via firebase)
 - Make search page to show more results
 - Implement Hotlist and MyBirds pages
 - Show multiple images and recordings (if available)
 - Make the website mobile-friendly (add responsiveness)
 - Implement user evaluations

# File structure
We follow MVP dataflow and have two different folders (views, presenters) and a model (model.js).
 - Home and HomeP: It the homepage of the webapp and shows the Bird Of The Day
 - SearchForm and SearchP: the search input in search page
 - Search and SearchP: Here you see the search results
 - Hotlist and HotlistP: It shows a global list of most viewed birds
 - MyBids and MyBirdsP: It "will" show user's liked birds
 - Navbar: The navigation bar on top

The public folder stores favicon and image placeholder.
model.js holds all required data for the website.
modelSource.js handles the communication with the API.
resolvePromise.js handles all promises.
firebaseConfig.js and firebaseModel.js take care of persistence.
theme.js and globalstyle.css are for the theming of website.
The rest of the files are react/vite files
