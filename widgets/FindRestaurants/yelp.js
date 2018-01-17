define([
  'dojo/_base/declare',
  'esri/request',
  'esri/config'
],
function(
  declare, esriRequest, esriConfig
) {
  return declare([], {
    apiKey: '',
    apiSearchUrl:'https://api.yelp.com/v3/businesses/search',

    constructor: function(apiKey) {
			esriConfig.defaults.io.corsEnabledServers.push('api.yelp.com');
      // We must pass an API key into the constructor or things will not work at all:
      if(apiKey) {
        this.apiKey = apiKey
      } else {
        console.error('Error getting API key.');
      }
    },

    /**
     * Given a point (x/y), return nearest restaurants sorted by distance.
     * @param {number} x - the x attiribute of the lat/long
     * @param {number} y - the y attribute of the lat/long
     * @returns {promise} returns a promise that will resolve to the results.
     */
    getLocations(x, y) {
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
          "Authorization": "Bearer " + this.apiKey
        }
      }, {
        usePost: false
      });
    }

  });
});