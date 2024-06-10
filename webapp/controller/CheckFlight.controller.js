sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"      
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, JSONModel, Filter, FilterOperator, MessageBox, Fragment, MessageToast) {
        "use strict";

        return Controller.extend("dj.djchatbot.controller.CheckFlight", {
            onInit: function () {
                // var test = new ODataModel(
                //     "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001/TravelAgency"
                //     // "Access-Control-Allow-Origin" = "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001"   
                // );
                // var otest = new ODataModel(
                //     "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/ZC_TRAVEL_DJ_010"
                //     // "Access-Control-Allow-Origin" = "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001"   
                // );
                
                // "Access-Control-Allow-Origin" = "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001";    

                // $.ajax({
                //     type: "GET",
                //     url: "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001/TravelAgency",
                //     data: {},
                //     Access-Control-Allow-Origin : "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001",
                //     setCookies: "JSESSIONID=s%3AXBaZDXfFTbprt5tnABkpk0sTpYUefRVS.yVA20x4c2bGNVhSM8HAqXJl%2FVKqknL2HPnsby5zqYRw; __VCAP_ID__=afb8c5e8-d29f-41f5-6fec-ae60",
                //     crossDomain: true,
                //     success: function (response) {
                //     //   let mise_list = response["RealtimeCityAir"]["row"];
                //     //   for (let i = 0; i < mise_list.length; i++) {
                //     //     let mise = mise_list[i];
                //     //     let gu_name = mise["MSRSTE_NM"];
                //     //     let gu_mise = mise["IDEX_MVL"];
                //         console.log(response);
                      
                //     },
                //   });
                var oTestModel = new JSONModel();
                oTestModel = this.getOwnerComponent().getModel("testModel");
                this.getView().setModel(oTestModel, 'testModel');
                this.getView().setModel(new JSONModel({}), "routerModel");
                this.getOwnerComponent().getRouter().getRoute("CheckFlight").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function(oEvent){
                var oArgs = oEvent.getParameter("arguments"),
                    oView = this.getView(),
                    oRouterModel = oView.getModel("routerModel");
                // $.ajax({
                //     url: "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/$metadata",
                //     type: "GET",
                //     beforeSend: function (xhr) {
                //         xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                //     },
                //     complete: function (xhr) {
                //         console.log(xhr)
                //         var oToken = xhr.getResponseHeader("X-CSRF-Token");
                //         $.ajax({
                //             url: "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/ZC_TRAVEL_DJ_010",
                //             type: "GET",
                //             contentType: "application/json",
                //             beforeSend: function (xhr1) {
                //                 xhr1.setRequestHeader("X-CSRF-Token", oToken);
                //             },
                //             success: function (success) {
                //                 console.log(success)
                //             },
                //             error: function (oError) {
                //                 console.log(oError)
                //             }
                //         });
                //     }
                // });

                if (!oArgs["?query"]) return;
                if (oArgs['?query']) {
                    oRouterModel.setProperty("/LocationFrom", oArgs['?query'].locationFrom);
                    oRouterModel.setProperty("/LocationFromName", oArgs['?query'].locationFromName);
                    oRouterModel.setProperty("/LocationTo", oArgs['?query'].locationTo);
                    oRouterModel.setProperty("/LocationToName", oArgs['?query'].locationToName);
                    oRouterModel.setProperty("/Passenger", oArgs['?query'].Passenger);
                }

                var aFilter = [];
                var oTable = this.getView().byId("schduleTable");

                aFilter.push(new Filter("airpfrom", FilterOperator.EQ, oRouterModel.getProperty("/LocationFrom")));
                aFilter.push(new Filter("airpto", FilterOperator.EQ, oRouterModel.getProperty("/LocationTo")));
                var oBinding = oTable.getBinding("rows");
                oBinding.filter(aFilter);    
                // oTestModel.setProperty("/tableL", oBinding.iLength);
                this.getOwnerComponent().getModel("testModel").setProperty("/tableL", oBinding.iLength);
                // Validation 메세지 초기화
                sap.ui.getCore().getMessageManager().removeAllMessages();
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

            onPressOpenPopover: function (oEvent) {
                var oView = this.getView(),
                    oSourceControl = oEvent.getSource();
    
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "dj.djchatbot.view.Card" // manifest의 Routing viewPath 를 참고
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }
    
                this._pPopover.then(function (oPopover) {
                    oPopover.openBy(oSourceControl);
                });
            },
            onNavigationBackPress: function(oEvent){
                var oConfirm = MessageBox.confirm("Would you like to go to the Main screen?", {
                    title: "Confirm",                                    // default                                      // default
                    actions: [ sap.m.MessageBox.Action.OK,
                               sap.m.MessageBox.Action.CANCEL ],         // default
                    emphasizedAction: sap.m.MessageBox.Action.OK,        // default
                    onClose: function(sAction) {
                        if(sAction == "OK")
                          this.getOwnerComponent().getRouter().navTo("RouteMain");
                    }.bind(this), 
                });
            },

            onFilterSearch: function(oEvent){
                var ofilterModel = this.getOwnerComponent().getModel("filterModel");
                var aFilter = [];
                var oTable = this.getView().byId("schduleTable");

                var oDestination = ofilterModel.getProperty("/Destination"),
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

                aFilter.push(new Filter("airpfrom", FilterOperator.EQ, oLocationFrom));
                aFilter.push(new Filter("airpto", FilterOperator.EQ, oLocationTo));
                var oBinding = oTable.getBinding("rows");
                oBinding.filter(aFilter);   

                this.getOwnerComponent().getModel("testModel").setProperty("/tableL", oBinding.iLength); 
                this.getView().getModel("routerModel").setProperty("/LocationFromName", resultF.Country); 
                this.getView().getModel("routerModel").setProperty("/LocationToName", resultT.Country); 
                this.getView().getModel("routerModel").setProperty("/Passenger", oPassenger); 

            },

            onCellClick: function(oEvent) {
                var oRecord = oEvent.getParameter('row'),
                    oData = this.getView().getModel('testModel').getProperty(oRecord.oBindingContexts.testModel.sPath),
                    oRouterModel = this.getView().getModel("routerModel");

                var path_num = oRecord.oBindingContexts.testModel.sPath.split("/")[2];       
                this.getOwnerComponent().getRouter().navTo("Reservation", {                
                    "?query": {
                        // carrid    : oData.carrid,
                        // connid    : oData.connid,
                        // cityfrom  : oData.cityfrom,
                        // airpfrom  : oData.airpfrom,
                        // cityto    : oData.cityto,
                        // airpto    : oData.airpto,
                        // fldate    : oData.fldate,
                        // deptime   : oData.deptime,
                        // arrtime   : oData.arrtime,
                        // seatocc   : oData.seatocc,
                        // seatocc_b : oData.seatocc_b,
                        // seatocc_f : oData.seatocc_f,
                        // price     : oData.price,
                        // price_b   : oData.price_b,
                        // price_f   : oData.price_f,
                        // currency  : oData.currency,
                        // created_by : oData.created_by, 
                        // created_at : oData.created_at, 
                        // last_changed_by : oData.last_changed_by, 
                        // last_changed_at : oData.last_changed_at,
                        // sPath       : oRecord.oBindingContexts.testModel.sPath,
                        sPath           : path_num,
                        LocationFrom    : oData.airpfrom,
                        LocationFromName: oData.cityfrom,
                        LocationTo      : oData.airpto,
                        LocationToName  : oData.cityto,
                        Passenger       : oRouterModel.getProperty("/Passenger")
                    }                
                });                    
            }
        });
    });
