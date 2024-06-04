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
                this._wizard = this.byId("ShoppingCartWizard");
                oTestModel = this.getOwnerComponent().getModel("testModel");
                this.getView().setModel(oTestModel, 'testModel');
                this.getView().setModel(new JSONModel({
                    locationFrom : "",
                    locationTo  :  "",
                    Passenger  : ""
                }), "routerModel");
                this.getView().setModel(new JSONModel([
                        {
                            key : "M",
                            text  : "Male"
                        },
                        {
                            key : "F",
                            text  : "Female"
                        }
                ]), "genderCombo");       
                // this.getView().setModel(new JSONModel({
                //     "gender" : [
                //         {
                //             key : "M",
                //             text  : "Male"
                //         },
                //         {
                //             key : "F",
                //             text  : "Female"
                //         }
                //     ]
                // }), "genderCombo");                
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
                this.getOwnerComponent().getModel("reserveModel").setProperty("/payment", "");
                this.getOwnerComponent().getModel("reserveModel").setProperty("/card", {
                    name : "",
                    number : "",
                    securityCode : "",
                    expire : ""
                });
                this.getOwnerComponent().getModel("reserveModel").setProperty("/passenger", {
                    passportNo : "",
                    gender : "",
                    name : "",
                    country : "",
                    birth : "",
                    expire : ""
                });                
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

            onRbgSelect: function (oEvent) {
                var iIndex = oEvent.getParameter("selectedIndex"),
                    oView = this.getView(),
                    oReserve = this.getOwnerComponent().getModel("reserveModel").getData(),
                    oRouterModel = oView.getModel("routerModel").getData(),
                    oGroup = oEvent.getSource();

                if (iIndex === 0)
                    this.getOwnerComponent().getModel("reserveModel").setProperty("/total", oReserve.reserve.price * oRouterModel.Passenger);
                else if (iIndex === 1)
                    this.getOwnerComponent().getModel("reserveModel").setProperty("/total", oReserve.reserve.price_b * oRouterModel.Passenger);
                else if (iIndex === 2)
                    this.getOwnerComponent().getModel("reserveModel").setProperty("/total", oReserve.reserve.price_f * oRouterModel.Passenger);  
            },   

            goToPaymentStep: function () {
                var selectedKey = this.getOwnerComponent().getModel("reserveModel").getProperty("/payment");
    
                switch (selectedKey) {
                    case "Bank Transfer":
                        this.byId("PaymentTypeStep").setNextStep(this.getView().byId("BankAccountStep"));
                        break;
                    case "Credit Card":
                    default:
                        this.byId("PaymentTypeStep").setNextStep(this.getView().byId("CreditCardStep"));
                        break;
                }
            },

            checkCreditCardStep: function () {
                var cardName = this.getOwnerComponent().getModel("reserveModel").getProperty("/card/name") || "";
                if (cardName.length < 3) {
                    this._wizard.invalidateStep(this.byId("CreditCardStep"));
                } else {
                    this._wizard.validateStep(this.byId("CreditCardStep"));
                }
            },
              
        });
    });
