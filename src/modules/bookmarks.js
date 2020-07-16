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


const generateBookmarkListString = function (bookmarkList) {
  const bookmarks = bookmarkList.map(bookmark => generateBookmarkElement(bookmark));
  return bookmarks;
};

const generateAddNewBookmarkString = function () {
  return `
    <form>
      <div>
        <label for="title">Title</label>
        <input type="text" id="title">
      </div>
      
      <div>
        <label for="url">URL</label>
        <input type="text" id="url">
      </div>

      <div>
      <label for="rating">Rating</label>
      <input type="number" id="rating">
    </div>

    <div>
    <label for="desc">Description</label>
    <input type="text" id="desc">
  </div>
    

      <input type="submit" id="addBookmark" value="Add Bookmark">
    </form>
    <button id="backToList">Back to List</button>
    `;
};

// Controller functions
const addingNewBookmark = function () {
  store.adding = true;
};

const backToBookmarkList = function () {
  store.adding = false;
};


// Render the page dependent on what's in the store

const render = function () {
  let visibleString = '';
  let bookmarks = [...store.bookmarks];
  
  // render the bookmark list in the DOM
  const bookmarkListString = generateBookmarkListString(bookmarks);
  const addNewBookmarkString = generateAddNewBookmarkString();

  if (store.adding === false) {
    visibleString = bookmarkListString;
  } else {
    visibleString = addNewBookmarkString;
  }
  
  // insert that HTML into the DOM
  $('main').html(visibleString);

};

// Handler functions

const handleAddBookmarkButton = function () {
  $('header').on('click', '#addBookmark', (event) => {
    event.preventDefault();
    addingNewBookmark();
    render();
  });
};


const handleBackToListButton = function () {
  $('main').on('click', '#backToList', (event) => {
    event.preventDefault();
    backToBookmarkList();
    render();
  });
};

const handleAddNewBookmarkSubmit = function () {
  // The event of clicking the submit button
  $('main').on('click', '#addBookmark', (event) => {
    event.preventDefault();
  
    // storing the input fields as variables
    const newBookmarkTitle = $('#title').val();
    $('#title').val('');

    const newBookmarkUrl = $('#url').val();
    $('#url').val('');

    const newBookmarkRating = $('#rating').val();
    $('#rating').val('');

    const newBookmarkDesc = $('#desc').val();
    $('#desc').val('');

    api.createBookmark(newBookmarkTitle, newBookmarkUrl, newBookmarkRating, newBookmarkDesc)
      .then(res => {
        if(res.ok){
          return res.json();
        }
        throw new TypeError('error: something bad happened with the POST');
      })
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        render();
      })
      .catch((error) => {
        console.log(error.message);
      });

  });
};


// bind all the event listeners to export

const bindEventListeners = function () {
  handleAddBookmarkButton();
  handleBackToListButton();
  handleAddNewBookmarkSubmit();
};

export default {
  render,
  bindEventListeners
};