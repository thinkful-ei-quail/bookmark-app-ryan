import $ from 'jquery';

import warptrailLogo from '../img/icon-default.ico';

function placeLogo () {
  const logo = $(`<img src="${warptrailLogo}" alt="warptrail logo" class="logo-ico" />`);
  $('.logo').html(logo);
}

export default placeLogo;