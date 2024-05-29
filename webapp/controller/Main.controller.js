sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/MessageToast"    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, JSONModel, Filter, FilterOperator, MessageToast) {
        "use strict";

        return Controller.extend("dj.djchatbot.controller.Main", {
            onInit: function () {
                var test = new ODataModel(
                    "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001/TravelAgency",
                    // "Access-Control-Allow-Origin" = "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001"   
                );

                // this.getView().byId("page").getAggregation("_navMaster").setWidth("90%");

                var selectLocationData = {
                    "Personnel": "",
                    "LocationFrom": "FRA",
                    "LocationTo"  : "JFK",
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
                var inputData = this.getView().getModel().getData(),
                    Destination = this.getView().getModel().getData().Destination,
                    indexF = $.inArray(inputData.LocationFrom, $.map(Destination, function(n){
                        return n.AirportID
                    })),
                    resultF = this.getView().getModel().getProperty("/Destination/"+indexF),
                    indexT = $.inArray(inputData.LocationTo, $.map(Destination, function(n){
                        return n.AirportID
                    })),
                    resultT = this.getView().getModel().getProperty("/Destination/"+indexT);

                if( inputData.Personnel == 0 ){
                    var msg = 'Please input the Personnel Count';
                    MessageToast.show(msg);
                    return;
                }

                var aFilter = [];
                aFilter.push(new Filter("airpfrom", FilterOperator.EQ, inputData.LocationFrom));
                aFilter.push(new Filter("airpto", FilterOperator.EQ, inputData.LocationTo));
                // 왜 안되지~~ ㅣ낭허미ㅏㄴ어ㅣㅏㄴㅇ머히
                // aFilter.push(new Filter("seatocc", FilterOperator.LE, inputData.Personnel));  
                // aFilter.push(new Filter("seatocc_b", FilterOperator.GE, inputData.Personnel));
                // aFilter.push(new Filter("seatocc_f", FilterOperator.GE, inputData.Personnel));
            
                var oBinding = this.getOwnerComponent().getModel("testModel");

                var oList= this.byId("validationTable"); 
                var oBinding = oList.getBinding("rows"); 
                oBinding.filter(aFilter);   

                if( oBinding.iLength <= 0 ){
                    // 실제로는 서비스의 값을 read하여 필터링해 존재 여부 확인
                    var msg = 'There are no flights matching the conditions.';
                    MessageToast.show(msg);
                }else{
                    this.getOwnerComponent().getRouter().navTo("CheckFlight", {                
                        "?query": {
                            locationFrom: inputData.LocationFrom,
                            locationFromName: resultF.Country,
                            locationTo: inputData.LocationTo,
                            locationToName: resultT.Country,
                            personnel: inputData.Personnel
                        }                
                    });
                }
            },

            onChangePersonnel: function(oEvent){
                // if(!oEvent.getParameter('value')){
                //     this.getView().setValueState(sap.ui.core.ValueState.Error);
                // }
                // else{
                //     this.getView().setValueState(sap.ui.core.ValueState.None);
                // }           
                
                // oManager = new sap.ui.commons.TextField({
                // id : "personnel",
                // required : true,
                // change : function() {
                //         if (this.getValue() === "") {
                //             this.setValueState(sap.ui.core.ValueState.Error);  // if the field is empty after change, it will go red
                //         }
            
                //         else {
                //             this.setValueState(sap.ui.core.ValueState.None); // if the field is not empty after change, the value state (if any) is removed
                //         }
                //     }
                // })
            }
        });
    });
