sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("controller.viaCep", {

		onInit: function() {
			var oModel = new JSONModel("https://viacep.com.br/ws/01001000/json/");
			this.getView().setModel(oModel);
			this._oModel = oModel;

			var oViewModel = new JSONModel({
				searchTerm: "",
				busy: false
			});
			this.getView().setModel(oViewModel, "view");

		},

		onSearch: function(oEvent) {
			// @type sap.ui.model.json.JSONModel
			// var oModel = this.getView().getModel();

			// var oParameters = oEvent.getParameters();
			// var sCep = oParameters.query || oParameters.value;
			var sCep = this.getView().getModel("view").getProperty("/searchTerm");

			// var sUrl = "https://viacep.com.br/ws/" + sCep + "/json/";
			var sUrl = `https://viacep.com.br/ws/${sCep}/json/`; // ES6

			this.getView().getModel("view").setProperty("/busy", true);
			this._oModel.loadData(sUrl);
			this.getView().getModel("view").setProperty("/busy", false);

		}

	});

});