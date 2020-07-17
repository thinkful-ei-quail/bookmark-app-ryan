/* eslint-disable eqeqeq */
// import jquery and cuid
import $ from 'jquery';
import cuid from 'cuid';

// import the store and api modules
import store from './store';
import api from './api'; 
import logo from '../img/icon-default.ico';

// HTML generators that the render function will use
// generate the title for a bookmark

const bookmarkHeader = `
  <header>
    <div class="app-title">
      <div class="logo">
        <img src="${logo}" alt="warptrail logo" class="logo-ico" />
      </div>
    <h1>Bookmark collection</h1>
  </div>
  </header>`;



const generateBookmarkElement = function (bookmark) {
  // console.log(bookmark, 'is passed in from the map');

  let bookmarkTitle = `<h2 class="bookmark-title">${bookmark.title}</h2>`;
  let bookmarkUrl = `<a href="${bookmark.url}" target="_blank">Visit this site</a>`;
  let bookmarkRating = '';
  let bookmarkDesc = `<p>${bookmark.desc}</p>`;

  switch(bookmark.rating) {
  case bookmark.rating = 1:
    bookmarkRating = '<p>★</p>';
    break;
  case bookmark.rating = 2:
    bookmarkRating = '<p>★★</p>';
    break;
  case bookmark.rating = 3:
    bookmarkRating = '<p>★★★</p>';
    break;
  case bookmark.rating = 4:
    bookmarkRating = '<p>★★★★</p>';
    break;
  case bookmark.rating = 5:
    bookmarkRating = '<p>★★★★★</p>';
    break;
  }

  let bookmarkElement = `
    <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
      <div class="bookmark-bubble">
        ${bookmarkTitle}
        ${bookmarkRating}
      </div>
      <div class="bookmark-expand hidden">
      ${bookmarkUrl}
      ${bookmarkDesc}
      <button class="delete-bookmark">Delete</button>
      </div>
    </li>
  `;

  console.log(typeof bookmarkElement);
  return bookmarkElement;
};



const generateBookmarkListString = function (bookmarkList) {
  const bookmarks = bookmarkList.map(bookmark => generateBookmarkElement(bookmark));
  let filter = store.filter;

  let allResults = '<p>Displaying all ratings</p>';
  let filterResults = `<p>Displaying ${filter} stars and above</p>`;
  
  return `

  ${bookmarkHeader}

  <main>
  <div class="bookmark-controls">
      <div class="go-to-add-form">
      <button id="showAddBookmarkForm">Add Bookmark</button>
      </div>
      
      <div class="filter-by-rating"e>
        <select name="stars" id="stars">
          <option> Filter by Rating </option>
          <option value = "0"> All </option>
          <option value = "1"> ★ </option>
          <option value = "2"> ★★ </option>
          <option value = "3"> ★★★ </option>
          <option value = "4"> ★★★★ </option>
          <option value = "5"> ★★★★★ </option>
        </select>
        ${filter == 0 ? allResults : filterResults}
      </div>
  </div>

  <ul>
    ${bookmarks.join('')}
  </ul>
  </main>
  `;
};

const generateAddNewBookmarkString = function () {
  return `

  ${bookmarkHeader}

  <main>
    <form>
      <div>
        <label for="bookmark-title">Title</label>
        <input type="text" name="bookmark-title" id="title" required />
      </div>
      
      <div>
        <label for="url">URL</label>
        <input type="text" id="url" name="bookmark-url" required />
      </div>

    <div>
    <label for="rating">Rating</label>
      <select id="rating">
        <option value = "1"> ★ </option>
        <option value = "2"> ★★ </option>
        <option value = "3" selected> ★★★ </option>
        <option value = "4"> ★★★★ </option>
        <option value = "5"> ★★★★★ </option>
      </select>
    </div>

    <div>
      <label for="bookmark-description">Description</label>
      <textarea id="desc" name="bookmark-description"></textarea>
    </div>
    
      <input type="submit" id="addBookmark" value="add bookmark"/>
    </form>

    <button id="backToList">Back to List</button>
    </main>
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

  if(store.filter !== 0) {
    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filter);

  }
  console.log(bookmarks, store);
  // render the bookmark list in the DOM
  const bookmarkListString = generateBookmarkListString(bookmarks);
  const addNewBookmarkString = generateAddNewBookmarkString();

  
  if (store.adding === false) {
    visibleString = bookmarkListString;
  } else {
    visibleString = addNewBookmarkString;
  }

  

  // insert that HTML into the DOM
  $('#root').html(visibleString);

};

// Handler functions

const handleAddBookmarkButton = function () {
  $('#root').on('click', '#showAddBookmarkForm', (event) => {
    event.preventDefault();
    addingNewBookmark();
    render();
  });
};


const handleBackToListButton = function () {
  $('#root').on('click', '#backToList', (event) => {
    event.preventDefault();
    backToBookmarkList();
    render();
  });
};

const handleAddNewBookmarkSubmit = function () {
  // The event of clicking the submit button
  $('#root').on('submit', 'form', (event) => {
    event.preventDefault();
    console.log(event.target);

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
        if (res.ok) {
          return res.json();
        }
        throw new TypeError('error: bad POST');
      })
      .then((newBookmark) => {

        store.addBookmark(newBookmark);
        store.adding = false;
        render();
      })
      .catch((error) => {
        console.log(error.message);
      });

  });
};

// Handle the click the delete button event
// but first need to link each delete button to its respected bookmark id!

const getBookmarkIdFromElement = function (bookmark) {
  return $(bookmark)
    .closest('.js-bookmark-element')
    .data('bookmark-id');
};

const handleDeleteBookmarkButton = function () {
  $('#root').on('click', '.delete-bookmark', (event) => {
    event.preventDefault();
    console.log('delete!');
    console.log(event.target);

    const id = getBookmarkIdFromElement(event.currentTarget);
    console.log(id);

    api.deleteBookmark(id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new TypeError('error: unable to delete item');
      })
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
};

// handle the changing of the select menu to filter by rating
const handleFilterBookmarksByStars = function () {
  $('#root').on('change', '#stars', (event) => {
    
    store.filter = event.target.value;
    
    render();
  });
};

// handle toggling the expanded view of each bookmark
const handleExpandBookmarkBubble = function () {
  $('#root').on('click', '.bookmark-bubble', (event) => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    console.log('you have clicked ' + id + ' bubble!');

    $(`li[data-bookmark-id=${id}] .bookmark-expand`).toggleClass('hidden');
  });
};

// bind all the event listeners to export

const bindEventListeners = function () {
  handleAddBookmarkButton();
  handleBackToListButton();
  handleAddNewBookmarkSubmit();
  handleDeleteBookmarkButton();
  handleFilterBookmarksByStars();
  handleExpandBookmarkBubble();
};

export default {
  render,
  bindEventListeners
};