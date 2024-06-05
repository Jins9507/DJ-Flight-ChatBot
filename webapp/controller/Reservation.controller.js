sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment"    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, JSONModel, MessageBox, Fragment) {
        "use strict";
        var history = {
            prevPaymentSelect: null
        };
    
        return Controller.extend("dj.djchatbot.controller.Reservation", {
            onInit: function () {
                var oTestModel = new JSONModel();
                this._wizard = this.byId("ShoppingCartWizard");
                this._oNavContainer = this.byId("navContainer")
                this._oDynamicPage = this.getPage();
                oTestModel = this.getOwnerComponent().getModel("testModel");
                this.getView().setModel(oTestModel, 'testModel');
                this.getView().setModel(new JSONModel({
                    locationFrom : "",
                    locationTo  :  "",
                    Passenger  : ""
                }), "routerModel");
                this.getView().setModel(new JSONModel({
                    selectedKey: "Male", // 편의상 키를 텍스트로 대체 야메야메~
                    selectItems: [
                        {"itemKey": "M", "itemText": "Male"},
                        {"itemKey": "F", "itemText": "Female"}]
                }), "genderCombo");                   
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
                this.getOwnerComponent().getModel("reserveModel").setProperty("/payment", "Credit Card");
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

            getPage: function () {
                return this.byId("dynamicPage");
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
                    oRouterModel = oView.getModel("routerModel").getData();

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

            checkPassengerStep: function () {
                var oPassenger = this.getOwnerComponent().getModel("reserveModel").getProperty("/passenger"),
                    vPassport  = oPassenger.passportNo || "",
                    vName      = oPassenger.name || "",
                    vCountry   = oPassenger.country || "",
                    vBirth     = oPassenger.birth || "",
                    vExpire    = oPassenger.expire || "";

                if (vPassport.length < 3 || vName.length < 3 || vCountry.length < 3 || vBirth.length < 3 || vExpire.length < 3) {
                    this._wizard.invalidateStep(this.byId("PassengerStep"));
                } else {
                    this._wizard.validateStep(this.byId("PassengerStep"));
                }
            },

            setPaymentMethod: function () {
                this.setDiscardableProperty({
                    message: "Are you sure you want to change the payment type ? This will discard your progress.",
                    discardStep: this.byId("PaymentTypeStep"),
                    modelPath: "/payment",
                    historyPath: "prevPaymentSelect"
                });
            },

            setDiscardableProperty: function (params) {
                if (this._wizard.getProgressStep() !== params.discardStep) {
                    MessageBox.warning(params.message, {
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        onClose: function (oAction) {
                            if (oAction === MessageBox.Action.YES) {
                                this._wizard.discardProgress(params.discardStep);
                                history[params.historyPath] = this.getOwnerComponent().getModel("reserveModel").getProperty(params.modelPath);
                            } else {
                                this.getOwnerComponent().getModel("reserveModel").setProperty(params.modelPath, history[params.historyPath]);
                            }
                        }.bind(this)
                    });
                } else {
                    history[params.historyPath] = this.getOwnerComponent().getModel("reserveModel").getProperty(params.modelPath);
                }
            },

            completedHandler: function () {
                this._oNavContainer.to(this.byId("wizardBranchingReviewPage"));
            },  
            
            handleNavBackToPaymentType: function () {
                this._navBackToStep(this.byId("PaymentTypeStep"));
            },
    
            handleNavBackToCreditCard: function () {
                this._navBackToStep(this.byId("CreditCardStep"));
            },
    
            handleNavBackToPassenger: function () {
                this._navBackToStep(this.byId("PassengerStep"));
            },   

            _navBackToStep: function (step) {
                var fnAfterNavigate = function () {
                    this._wizard.goToStep(step);
                    this._oNavContainer.detachAfterNavigate(fnAfterNavigate);
                }.bind(this);
    
                this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
                this._oNavContainer.to(this._oDynamicPage);
            },
              
        });
    });
