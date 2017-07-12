// **************************************************************
// nutil.js * Utility to assist in tracking setup
//
// Checks if cookies exists, gets or sets their value.
// Gets the value of a query string.
// Creates a randomized string that can be used as a user ID.
//
// Usage:
/*

// Checks for existance of a cookie
nUtil.check('cookie name');

// Retrieve a cookie's value
nUtil.get('cookie name');

// Sets a cookie's value
nUtil.set('cookie name');

// Retrieve the value of a query string
nUtil.getquery('query string name');

// Retrieve the value of a query string
nUtil.createuid();

*/
//
// Requires: None
// Credits: @GuilhermeMoreira for the cookie functions
//          @DanWilkerson for the user ID generator
// **************************************************************

var nUtil = {

  // Gets a cookie and returns the cookie's value
  // If no cookies, it returns blank ""
  get: function (c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  },

  // Sets a cookie with your given ("cookie name", "cookie value", "duration in days")
  set: function (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + exdate.toUTCString());
  },

  // Checks to see if a cookie exists, then returns true or false
  check: function (c_name) {
    c_name = jsCookies.get(c_name);
    if (c_name != null && c_name != "") {
      return true;
    } else {
      return false;
    }
  },

  // Retrieves query string from url
  getquery: function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },

  // Creates random string for use as a user ID
  createuid: function () {
    var ts = Math.round(+new Date() / 1000.0);
    var rand;
    try {
      var uu32 = new Uint32Array(1);
      rand = crypto.getRandomValues(uu32)[0];
    } catch (e) {
      rand = Math.round(Math.random() * 2147483647);
    }
    return [rand, ts].join('_');
  }

};
