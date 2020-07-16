const BASE_URL = 'https://thinkful-list-api.herokuapp.com/warptrail';

function getBookmarks () {
  return fetch(`${BASE_URL}/bookmarks/`);
}

export default {
  getBookmarks
};