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
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'find-restaurants',

    postCreate: function() {
      this.inherited(arguments);
      // when the widget is created, create an instance of "Yelp" to be used later, passing the Yelp API key from the 
      // Web AppBuilder config.
      this.yelp = new Yelp(this.config.apiKey);

      this.createSearchWidget();
    },

    startup: function() {
      this.inherited(arguments);
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
      if(this.results) {
        this.results.forEach(function(result) {
          result.destroy();
        });
      }

      this.results = [];
      resultsArray.forEach(function(result) {
        var resultDisplay = new ResultDisplay(result);
        resultDisplay.placeAt(this.resultsWrapper, 'last');
        this.results.push(resultDisplay);
      }.bind(this));
    }

  });
});