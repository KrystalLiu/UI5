sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"root/model/models",
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("root.Component", {

		metadata : {
			manifest: "json"
		},

		init : function () {
			
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			
			// create the views based on the url/hash
			this.getRouter().initialize();

		}
		
		

		
		
	});

});