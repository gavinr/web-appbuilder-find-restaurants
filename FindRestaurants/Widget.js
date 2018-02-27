define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'esri/dijit/Search',
  'dojo/on',
  './yelp',
  './ResultDisplay',
  'dojo/dom-construct'
],
function(
  declare, BaseWidget, Search, on, Yelp, ResultDisplay, domConstruct
) {
  var clazz = declare([BaseWidget], {

  	baseClass: 'find-restaurants',

    postCreate: function() {
      this.inherited(arguments);
      // when the widget is created, create an instance of "Yelp" to be used later, passing the Yelp API key from the 
      // Web AppBuilder config.
      this.yelp = new Yelp(this.config.apiKey);

      this.createSearchWidget();
    },

    createSearchWidget: function() {
      // Create a new "Search" widget (https://developers.arcgis.com/javascript/3/jsapi/search-amd.html) inside our 
      // widget.
      this.search = new Search({
        map: this.map,
        autoNavigate: false
      }, this.searchWidgetWrapper);
      this.search.startup();

      // Setup an event listener so when a search is completed, we'll take that point location and do a Yelp search 
      // with it:
      on(this.search, 'select-result', function(evt) {
        this.showResultsForPoint(evt.result.feature.geometry);
      }.bind(this));
    },

    /**
     * Given a point geometry, calls the yelp api and then passes the results to displayResults
     */
    showResultsForPoint: function(point) {
      this.yelp.getLocations(point.getLatitude(), point.getLongitude()).then(function(evt) {
        this.displayResults(evt.businesses);
      }.bind(this));
    },

    /**
     * Given an array of Yelp search results, display them in our widget
     */
    displayResults: function(resultsArray) {
      // If we've already done a search, destroy all the instances of the 
      // ResultDisplay widget that we've created before:
      if(this.results) {
        this.results.forEach(function(result) {
          result.destroy();
        });
      }

      // Create an array to hold references to the instances of ResultDisplay we're creating:
      this.results = [];
      // For each result we got from the API, create an instance of ResultDisplay
      // and place it into the "resultsWrapper" dom node.
      resultsArray.forEach(function(result) {
        var resultDisplay = new ResultDisplay(result);
        resultDisplay.placeAt(this.resultsWrapper, 'last');
        this.results.push(resultDisplay);
      }.bind(this));
    }

  });
  return clazz;
});