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


            },

            onSearchFilter: function(oEvent){
                var ofilterModel = new JSONModel(this.getOwnerComponent().getModel("filterModel").getData()),
                    oDestination = ofilterModel.getProperty("/Destination"),
                    oLocationFrom = ofilterModel.getProperty("/LocationFrom"),
                    oLocationTo = ofilterModel.getProperty("/LocationTo"),
                    oPassenger = ofilterModel.getProperty("/Passenger"),
                    indexF = $.inArray(oLocationFrom, $.map(oDestination, function(n){
                        return n.AirportID
                    })),
                    resultF = ofilterModel.getProperty("/Destination/"+indexF),
                    indexT = $.inArray(oLocationTo, $.map(oDestination, function(n){
                        return n.AirportID
                    })),
                    resultT = ofilterModel.getProperty("/Destination/"+indexT);

                if( oPassenger == 0 ){
                    var msg = 'Please Check the Passenger';
                    MessageToast.show(msg);
                    return;
                }

                var aFilter = [];
                // aFilter.push(new Filter("airpfrom", FilterOperator.EQ, oLocationFrom));
                // aFilter.push(new Filter("airpto", FilterOperator.EQ, oLocationTo));
                // aFilter.push(new Filter("seatocc", FilterOperator.GE, oPassenger));
                // aFilter.push(new Filter("seatocc_b", FilterOperator.GE, oPassenger));
                // aFilter.push(new Filter("seatocc_f", FilterOperator.GE, oPassenger));

                // var aFilter = new Filter({
                //     filters: [
                //         new Filter({
                //             path: 'seatocc',
                //             bAnd: false,
                //             operator: FilterOperator.GE,
                //             value1: 200
                //             }),
                //         new Filter({
                //             path: 'seatocc_b',
                //             bAnd: false,
                //             operator: FilterOperator.GE,
                //             value1: oPassenger
                //             }),
                //         new Filter({
                //             path: 'seatocc_f',
                //             bAnd: false,
                //             operator: FilterOperator.GE,
                //             value1: oPassenger
                //             })   
                //     ]
                //   })
                aFilter.push(new Filter("airpfrom", FilterOperator.EQ, oLocationFrom));
                aFilter.push(new Filter("airpto", FilterOperator.EQ, oLocationTo));
                // aFilter.push(new Filter({
                //     filters: [
                //         // new Filter({
                //         //     path: 'seatocc',
                //         //     operator: FilterOperator.GE,
                //         //     value1: 200
                //         //     }),
                //         // new Filter({
                //         //     path: 'seatocc_b',
                //         //     operator: FilterOperator.GE,
                //         //     value1: oPassenger
                //         //     }),
                //         // new Filter({
                //         //     path: 'seatocc_f',
                //         //     operator: FilterOperator.GE,
                //         //     value1: oPassenger
                //         //     })   
                //     //   new Filter("seatocc", FilterOperator.GE, parseInt(oPassenger)),
                //     //   new Filter("seatocc_b", FilterOperator.GE, parseInt(oPassenger)),
                //     //   new Filter("seatocc_f", FilterOperator.GE, parseInt(oPassenger))
                //     ],
                //     and: false // true = AND, false = OR
                //   }));
            
                // var oBinding = this.getOwnerComponent().getModel("testModel");

                var oList= this.byId("validationTable"); 
                var oBinding = oList.getBinding("rows"); 
                oBinding.filter(aFilter);   
                // oBinding.filter(aFilter.getFilters());   

                if( oBinding.iLength <= 0 ){
                    // 실제로는 서비스의 값을 read하여 필터링해 존재 여부 확인
                    var msg = 'There are no flights matching the conditions.';
                    MessageToast.show(msg);
                }else{
                    this.getOwnerComponent().getRouter().navTo("CheckFlight", {                
                        "?query": {
                            locationFrom: oLocationFrom,
                            locationFromName: resultF.Country,
                            locationTo: oLocationTo,
                            locationToName: resultT.Country,
                            Passenger: oPassenger
                        }                
                    });
                }
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

                if( inputData.Passenger == 0 ){
                    var msg = 'Please Check the Passenger';
                    MessageToast.show(msg);
                    return;
                }

                var aFilter = [];
                aFilter.push(new Filter("airpfrom", FilterOperator.EQ, inputData.LocationFrom));
                aFilter.push(new Filter("airpto", FilterOperator.EQ, inputData.LocationTo));
                // 왜 안돼~~ ㅣ낭허미ㅏㄴ어ㅣㅏㄴㅇ머히
                // aFilter.push(new Filter("seatocc", FilterOperator.LE, inputData.Passenger));  
                // aFilter.push(new Filter("seatocc_b", FilterOperator.GE, inputData.Passenger));
                // aFilter.push(new Filter("seatocc_f", FilterOperator.GE, inputData.Passenger));
            
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
                            Passenger: inputData.Passenger
                        }                
                    });
                }
            }
        });
    });
