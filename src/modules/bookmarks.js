// import jquery and cuid
import $ from 'jquery';
import cuid from 'cuid';

// import the store and api modules
import store from './store';
import api from './api';

// HTML generators that the render function will use


// generate the title for a bookmark
const generateBookmarkElement = function (bookmark) {
  // console.log(bookmark, 'is passed in from the map');
  let bookmarkTitle = `<h2 class="bookmark-title">${bookmark.title}</h2>`;
  let bookmarkUrl = `<a href="${bookmark.url}" target="_blank">Visit this site</a>`;
  let bookmarkRating = `<p>${bookmark.rating}</p>`;
  let bookmarkDesc = `<p>${bookmark.desc}</p>`;
  
  let bookmarkElement = bookmarkTitle + bookmarkRating + bookmarkDesc + bookmarkUrl;
  return bookmarkElement;
};

// for each bookmark in the list, 
// generate a string for it, 
// and merge them into the list string

/* 
const generateBookmarkListString = function (bookmarkList) {
  console.log(bookmarkList, 'is an an array with an object in it');
  const bookmarks = bookmarkList.map((bookmark) => {
    console.log(bookmark, '26');
    return generateBookmarkElement(bookmark);
  });
  console.log(bookmarks); // !!! returning [undefined] !!!
  console.log(bookmarks.join(''), '???');
  return bookmarks.join('');
};
*/

const generateBookmarkListString = function (bookmarkList) {
  const bookmarks = bookmarkList.map(bookmark => generateBookmarkElement(bookmark));
  console.log(bookmarkList, '39');
  return bookmarks;
};




// Render the page dependent on what's in the store

const render = function () {
  let bookmarks = [...store.bookmarks];
  console.log(bookmarks, 'from the render');

  // render the bookmark list in the DOM
  const bookmarkListString = generateBookmarkListString(bookmarks);
  console.log(bookmarkListString);

  // insert that HTML into the DOM
  $('main').html(bookmarkListString);

};

export default {
  render
};