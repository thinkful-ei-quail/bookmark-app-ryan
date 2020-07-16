const BASE_URL = 'https://thinkful-list-api.herokuapp.com/warptrail';

const getBookmarks = function () {
  return fetch(`${BASE_URL}/bookmarks/`);
};

// Add a new bookmark by POST to api
const createBookmark = function () {

};


export default {
  getBookmarks
};