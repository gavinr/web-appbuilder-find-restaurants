define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/dom-attr'
],
function(
  declare, _WidgetBase, _TemplatedMixin, domAttr
) {
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: "<div><img data-dojo-attach-point='imageNode' /><span><a target='_blank' data-dojo-attach-point='nameNode'></a></span><div class='clear'></div></div>",
    baseClass: 'result-display',

    // attributes
    // see https://dojotoolkit.org/reference-guide/1.10/quickstart/writingWidgets.html#mapping-widget-attributes-to-domnode-attributes
    name: "unknown",
    _setNameAttr: { node: "nameNode", type: "innerHTML" },

    postCreate: function() {
      this.inherited(arguments);
      domAttr.set(this.nameNode, 'href', this.url);
      domAttr.set(this.imageNode, 'src', this.image_url);
    },

  });
});