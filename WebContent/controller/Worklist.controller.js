sap.ui.define([
	"root/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"root/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, formatter, Filter, FilterOperator, MessageToast, MessageBox) {
	"use strict";

	return BaseController.extend("root.controller.Worklist", {

		formatter: formatter,

		onInit: function() {
			var oViewModel,
				oTable = this.byId("table");
			oViewModel = new JSONModel({
				tableBusyDelay: 0
			});
			this.setModel(oViewModel, "worklistView");
						
			this._oTable = oTable;		
			this._oTableSearchState = [];
		},
		
		_applySearch: function(oTableSearchState) {
			var oViewModel = this.getModel("worklistView");
			this._oTable.getBinding("items").filter(oTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (oTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		},
		
		onSearch: function(oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var oTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					oTableSearchState = [new Filter("ProductName", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(oTableSearchState);
			}

		},
		
		onRefresh: function() {
			this._oTable.getBinding("items").refresh();
		},
		
		onPress: function(oEvent) {
            var oItem = oEvent.getSource();
            var Path = oItem.getBindingContextPath()
			this.getRouter().navTo("object", {
				sPath: encodeURIComponent(Path)
			});

		},
		
		quantityState: function(iValue) {
			if (iValue === 0) {
				return ValueState.Error;
			} else if (iValue <= 10) {
				return ValueState.Warning;
			} else {
				return ValueState.Success;
			}
        }

	});
});
