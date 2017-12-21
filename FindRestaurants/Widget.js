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
      this.yelp = new Yelp(this.config.apiKey);

      this.createSearchWidget();
      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);
      console.log('startup');
    },

    createSearchWidget: function() {
      this.search = new Search({
        map: this.map,
        autoNavigate: false
      }, this.searchWidgetWrapper);
      this.search.startup();
      on(this.search, 'select-result', function(evt) {
        console.log('result', evt);
        this.showResultsForPoint(evt.result.feature.geometry);
      }.bind(this));
    },

    searchButtonClickHandler: function(evt) {
      this.showResultsForAddress(this.searchText.value);
    },

    showResultsForAddress: function(address) {
      // first geocode the address

      // Then take the first result and call "showResultsForXY"
    },

    // Given a point geometry, calls the yelp api and then passes the results to displayResults
    showResultsForPoint: function(point) {
      console.log('showResultsForPoint', point);
      this.yelp.getLocations(point.getLatitude(), point.getLongitude()).then(function(evt) {
        console.log('locations', evt);
        this.displayResults(evt.businesses);
      }.bind(this));
    },

    displayResults: function(resultsArray) {
      console.log('displayResults', resultsArray);
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