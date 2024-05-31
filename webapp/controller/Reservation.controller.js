sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, JSONModel) {
        "use strict";

        return Controller.extend("dj.djchatbot.controller.Reservation", {
            onInit: function () {
                var oTestModel = new JSONModel();
                oTestModel = this.getOwnerComponent().getModel("testModel");
                this.getView().setModel(oTestModel, 'testModel');
                this.getView().setModel(new JSONModel({
                    locationFrom : "",
                    locationTo  :  "",
                    Passenger  : ""
                }), "routerModel");
                this.getOwnerComponent().getRouter().getRoute("Reservation").attachMatched(this._onRouteMatched, this);

            },
            _onRouteMatched: function(oEvent){
                var oArgs = oEvent.getParameter("arguments"),
                    oView = this.getView(),
                    oJSON = new JSONModel(),
                    oRouterModel = oView.getModel("routerModel");

                if (!oArgs["?query"]) return;
                if (oArgs['?query']) {
                    oRouterModel.setProperty("/sPath", oArgs['?query'].sPath);
                    oRouterModel.setProperty("/locationFrom", oArgs['?query'].locationFrom);
                    oRouterModel.setProperty("/locationFromName", oArgs['?query'].locationFromName);
                    oRouterModel.setProperty("/locationTo", oArgs['?query'].locationTo);
                    oRouterModel.setProperty("/locationToName", oArgs['?query'].locationToName);
                    oRouterModel.setProperty("/Passenger", oArgs['?query'].Passenger);
                }
                oJSON = this.getView().getModel('testModel').getProperty("/testTable/"+ oRouterModel.getData().sPath);
                this.getOwnerComponent().getModel("reserveModel").setProperty("/total", oJSON.price * oArgs['?query'].Passenger);
                this.getOwnerComponent().getModel("reserveModel").setProperty("/reserve",oJSON );
                // this.getView().setModel(oJSON, 'reserveModel');

            },
            formatDate: function(oDate) {
                var sReturnValue = "";
                if (oDate) {
                   sReturnValue = oDate.slice(0, 4) + "-" + oDate.slice(4, 6) + "-" + oDate.slice(6, 8);
                }
                return sReturnValue;
            },

            formatTime: function(oTime) {
                var sReturnValue = "";
                if (oTime) {
                   sReturnValue = oTime.slice(0, 2) + ":" + oTime.slice(2, 4);
                }
                return sReturnValue;
            },                
        });
    });
