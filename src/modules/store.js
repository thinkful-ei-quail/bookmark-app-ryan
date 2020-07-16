let bookmarks = [

];

let adding = false;

let error = null;

let filter = 0;

// methods

const addBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

// exports

export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark
};


