sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("controller.initial", {

		onInit: function() {

			var oFonteDeDados = {
				nome: "Fabio",
				sobrenome: "Pagoti"
			};
			// oFonteDeDados.sobrenome = "Pagoti";

			var oJSONModel = new sap.ui.model.json.JSONModel(oFonteDeDados);

			this._oJSONModel = oJSONModel;
			window.modelo = this._oJSONModel;

			// Nome
			var oText = this.byId("textNome");
			var sNome = this._oJSONModel.getProperty("/nome");
			oText.setText(sNome);

			// Sobrenome
			// oText = this.byId("textSobrenome");
			// oText.setModel(this._oJSONModel); // sap.m.Text

			this.getView().setModel(this._oJSONModel);

		},

		onCarregar: function() {
			var oViewModel = new JSONModel({
				ocupado: true
			});
			this.getView().setModel(oViewModel, "view");
		}

	});

});