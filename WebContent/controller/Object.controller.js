/*global location*/
sap.ui.define([
	"root/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"root/model/formatter",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, History, formatter,MessageToast) {
	"use strict";

	return BaseController.extend("root.controller.Object", {

		formatter: formatter,
		
		onInit: function() {
			var oViewModel = new JSONModel({
				busy: true,
				delay: 0
			});
			this.setModel(oViewModel, "objectView");
			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);	
		},

	
		_onObjectMatched: function(oEvent) {
			var sPath = decodeURIComponent(
		            oEvent.getParameter("arguments").sPath);
			this.getView().bindElement({path: sPath});
		},
		
		onNavPress: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash != undefined){
				window.history.go(-1);
			}else{
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("worklist",{}, true);
			}
		},
		
		rateBtnClick: function(){
			MessageToast.show("Thanks for rating!");
		}
		

	});

});
