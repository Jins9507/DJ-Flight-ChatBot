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

        return Controller.extend("dj.djchatbot.controller.Main", {
            onInit: function () {
                var test = new ODataModel(
                    "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001/TravelAgency",
                    // "Access-Control-Allow-Origin" = "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001"   
                );
                
                var selectLocationData = {
                    "Personnel": "",
                    "LocationFrom": "JFK",
                    "LocationTo"  : "TYO",
                    "StartingPoint": [
                        {
                            "AirportID": "JFK",
                            "Country": "New York"
                        },
                        {
                            "AirportID": "SFO",
                            "Country": "San Francisco"
                        },
                        {
                            "AirportID": "FCO",
                            "Country": "Rome"
                        },
                        {
                            "AirportID": "TYO",
                            "Country": "Tokyo"
                        },
                        {
                            "AirportID": "FRA",
                            "Country": "Frankfurt"
                        },
                        {
                            "AirportID": "SIN",
                            "Country": "Singapore"
                        }
                    ],
                    "Destination": [
                        {
                            "AirportID": "JFK",
                            "Country": "New York"
                        },
                        {
                            "AirportID": "SFO",
                            "Country": "San Francisco"
                        },
                        {
                            "AirportID": "FCO",
                            "Country": "Rome"
                        },
                        {
                            "AirportID": "TYO",
                            "Country": "Tokyo"
                        },
                        {
                            "AirportID": "FRA",
                            "Country": "Frankfurt"
                        },
                        {
                            "AirportID": "SIN",
                            "Country": "Singapore"
                        }
                    ]
                };

                var oModel = new JSONModel(selectLocationData);
                this.getView().setModel(oModel);
            },

            onSearch: function(oEvent){
                var inputData = this.getView().getModel().getData();
                // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // oRouter.navTo("CheckFlight");
                this.getOwnerComponent().getRouter().navTo("CheckFlight", {                
                    "?query": {
                        locationFrom: inputData.LocationFrom,
                        locationTo: inputData.LocationTo,
                        personnel: inputData.Personnel
                    }                
                });
            }
        });
    });
