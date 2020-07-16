// import jquery
import $ from 'jquery';

// import assets
import './css/index.css';
import placeLogo from './modules/images';

// import modules
import bookmarks from './modules/bookmarks';
import api from './modules/api';
import store from './modules/store';


// main function
function main() {
  console.log('DOM is loaded');

  placeLogo();
  // const startMsg = $('<p>Webpack is working!</p>');
  // $('#root').append(startMsg);

  // the initial api call to get bookmarks to store    
  api.getBookmarks()
    .then(res => res.json())
    .then((bookmarkList) => {
      bookmarkList.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarks.render();
    });
  
  bookmarks.bindEventListeners();
  bookmarks.render();
}

$(main);