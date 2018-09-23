sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("controller.viaCep", {

		onInit: function () {
			var oModel = new JSONModel("https://viacep.com.br/ws/01001000/json/");
			this.getView().setModel(oModel);
			this._oModel = oModel;

			var oViewModel = new JSONModel({
				searchTerm: "",
				busy: false
			});
			this.getView().setModel(oViewModel, "view");

		},

		onSearch: function (oEvent) {
			// @type sap.ui.model.json.JSONModel
			// var oModel = this.getView().getModel();

			// var oParameters = oEvent.getParameters();
			// var sCep = oParameters.query || oParameters.value;
			var sCep = this.getView().getModel("view").getProperty("/searchTerm");

			// var sUrl = "https://viacep.com.br/ws/" + sCep + "/json/";
			var sUrl = `https://viacep.com.br/ws/${sCep}/json/`; // ES6

			this.getView().getModel("view").setProperty("/busy", true);

			function onRequestCompleted(oEvt) {
				this.getView().getModel("view").setProperty("/busy", false);
				if(!oEvt.getParameters().success || this._oModel.getProperty("/erro")){
					this._oModel.setProperty("/", {});
					MessageToast.show("CEP não encontrado ou inválido");
				}
			}
			this._oModel.attachRequestCompleted(onRequestCompleted, this)
			this._oModel.loadData(sUrl);

		}

	});

});