define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/dom-attr',
  'dojo/dom-class',
  'dojo/text!./templates/ResultDisplay.html'
],
function(
  declare, _WidgetBase, _TemplatedMixin, domAttr, domClass, templateString
) {
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: templateString,
    baseClass: 'result-display',

    // attributes
    // see https://dojotoolkit.org/reference-guide/1.10/quickstart/writingWidgets.html#mapping-widget-attributes-to-domnode-attributes
    // but we cannot use this method for href and src, so those are assigned in the postCreate below.
    name: "unknown",
    _setNameAttr: { node: "nameNode", type: "innerHTML" },

    postCreate: function() {
      this.inherited(arguments);
      domAttr.set(this.nameNode, 'href', this.url);
      if(this.image_url && this.image_url !== '(unknown)') {
        domAttr.set(this.imageNode, 'src', this.image_url);
      } else {
        domClass.add(this.imageNode, 'hidden');
      }
      domAttr.set(this.starsLink, 'href', this.url);
      domAttr.set(this.yelpLink, 'href', this.url);
      domClass.add(this.starsLink, 'rating_' + String(this.rating).replace('.', ''));

    }

  });
});