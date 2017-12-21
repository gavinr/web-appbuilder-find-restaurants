define([
  'dojo/_base/declare',
  'esri/request',
],
function(
  declare, esriRequest
) {
  return declare([], {
    apiKey: '',
    // apiUrl: 'https://api.yelp.com/v3',
    apiSearchUrl:'https://api.yelp.com/v3/businesses/search',

    constructor: function(apiKey) {
      this.apiKey = apiKey
    },

    getLocations(x, y) {
      console.log('yelp.getLocations', x, y);
      return esriRequest({
        url: this.apiSearchUrl,
        content: { 
          f: "json",
          latitude: x,
          longitude: y,
          raidus: 4000,
          sort_by: 'distance',
          categories: 'restaurants, All'
        },
        handleAs: "json",
        headers: {
          "Authorization": "Bearer vZ1m8Fw9d7TMXzFkM7X_wv7ldW8iKo5EXJG_DdUohgSHaq9M0O5aBj8acaKxHFERVhpk4_ZPDFm4ZJ_aXeONeQoV_8vkwuMznxi5ZupONAG5rJD49LlDsCAzefc7WnYx"
        }
      }, {
        usePost: false
      });
    }

  });
});