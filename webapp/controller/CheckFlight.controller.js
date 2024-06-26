sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/Dialog",      
    "sap/m/Input"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, JSONModel, Filter, FilterOperator, MessageBox, Fragment, MessageToast, Dialog, Input) {
        "use strict";
        var dupFlag = false;
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
                // var vvUrl = "https://port8082-workspaces-ws-b99hh.ap21.trial.applicationstudio.cloud.sap/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/"
                var vvUrl = "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/"
                // var vvUrl = "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/$metadata?sap-language=EN"
                // var vvUrl = "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/$metadata"
                        var username = 'CB9980001819';
                        var password = 'danilej77!';
                        var credentials = btoa(username + ':' + password);

                // $.response.headers.set("Access-Control-Allow-Origin", "*");
                // $.response.status = $.net.http.OK;
                var oResult;
                $.ajax({
                    url: vvUrl,
                    type: 'GET',
                    dataType: 'json',
                    crossDomain: true,
                    beforeSend: function (req) {
                        req.setRequestHeader('Authorization', 'Basic ' + credentials);
                        req.setRequestHeader('Access-Control-Allow-Origin', '*');
                        req.setRequestHeader('Origin', 'https://cors-anywhere.herokuapp.com/https://port8082-workspaces-ws-b99hh.ap21.trial.applicationstudio.cloud.sap/');
                    },
                    success: function(result) {
                        oResult = result;
                        console.log(result);
                    },
                    error: function(e) {
                        console.log(e);
                        // log error in browser
                        console.log(e.message);
                        oResult = e;
                    }
                });

                var oTestModel = new JSONModel();
                oTestModel = this.getOwnerComponent().getModel("testModel");
                this.getView().setModel(oTestModel, 'testModel');
                this.getView().setModel(new JSONModel({}), "routerModel");
                // this.getView().setModel(new JSONModel({
                //     reservationId : "",
                //     password : ""
                // }), "reserveSearchModel");
                this.getOwnerComponent().getRouter().getRoute("CheckFlight").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function(oEvent){
                var oArgs = oEvent.getParameter("arguments"),
                    oView = this.getView(),
                    oRouterModel = oView.getModel("routerModel");

                var pleaseModel = this.getOwnerComponent().getModel("mainModel");
                    // https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/ZC_TRAVEL_DJ_010?sap-client=100

                        var url = 'https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/ZC_TRAVEL_DJ_010';
                        // var username = 'qkrwlstjd3@naver.com';
                        // var password = 'danilej77!';

                        // // Base64 인코딩
                        // var credentials = btoa(username + ':' + password);

                    // $.ajax({
                    //     url: url,
                    //     method: "GET",
                    //     dataType: 'json',
                    //     // headers: {
                    //     //     'Authorization': 'Basic ' + credentials,
                    //     //     'Content-Type': 'application/json'
                    //     // },
                    //     beforeSend : function(xhr) {  
                    //         xhr.setRequestHeader('Cookie', "__VCAP_ID__=e397484e-3767-4403-63db-6bb3; JSESSIONID=s%3ALBv6qfvhJShX8HOrp_WpVgRof1jE0gJD.fyMln7VUgHpph5m%2B6TsjECCDhyOvnB7Tb3EPQTsJ4iM");
                    //         xhr.setRequestHeader('Host', "8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com");
                    //       },
                    //     success: function(response) {
                    //         console.log("Success:", response);
                    //     },
                    //     error: function(jqXHR, textStatus, errorThrown) {
                    //         // console.error("Error123:",jqXHR,  textStatus, errorThrown);
                    //     }
                    // });
                // $.ajax({
                //     url: "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/ZC_TRAVEL_DJ_010",
                //     type: "GET",
                //     // beforeSend: function (xhr) {
                //     //     xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                //     // },
                //     // complete: function (xhr) {
                //         success: function (success) {
                //                     console.log(success)
                //                 },
                //         // var oToken = xhr.getResponseHeader("X-CSRF-Token");
                //         // $.ajax({
                //         //     url: "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_010/ZC_TRAVEL_DJ_010",
                //         //     type: "GET",
                //         //     contentType: "application/json",
                //         //     beforeSend: function (xhr1) {
                //         //         xhr1.setRequestHeader("X-CSRF-Token", oToken);
                //         //     },
                //         //     success: function (success) {
                //         //         console.log(success)
                //         //     },
                //         //     error: function (oError) {
                //         //         console.log(oError)
                //         //     }
                //         // });
                //     // }
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
                this.getOwnerComponent().getModel("filterModel").setProperty("/LocationFrom", oRouterModel.getProperty("/LocationFrom"));
                this.getOwnerComponent().getModel("filterModel").setProperty("/LocationTo", oRouterModel.getProperty("/LocationTo"));
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
            
            onDialogPress: function(oEvent){
                var oView = this.getView();

                if (!this.oReserveDialog) {
                    this.oReserveDialog = Fragment.load({
                        id: oView.getId(),
                        name: "dj.djchatbot.view.ReserveDialog",
                        controller: this
                    }).then(function (oDialog){
                        oDialog.setModel(oView.getModel());
                        return oDialog;
                    });
                }

                this.oReserveDialog.then(function(oDialog){
                    oDialog.open();
                }.bind(this));                
            },

            onDialogSearch: function(){
                var vReservationNumber = this.getView().byId("reserveInput").getProperty("value")
                var vPassword = this.getView().byId("passwordInput").getProperty("value")

                var resultR;

                var oUserModel = this.getOwnerComponent().getModel("mockUser");
                var oReserveTable = this.getOwnerComponent().getModel("reservationTable"); // DB read 대용

                var indexR = $.inArray(vReservationNumber, $.map(oReserveTable.getProperty("/reservation"), function(n){
                    return n.reserveID
                }));

                if(indexR !== -1){
                    resultR = oReserveTable.getProperty("/reservation/"+indexR);
                    if(resultR.password === vPassword){
                        if(resultR.cancelFlag === "true"){
                            this.getView().byId("reserveInput").setValue("");
                            this.getView().byId("passwordInput").setValue("");
                            MessageToast.show("The reservation number has already been canceled."); 
                        }else{
                            this.getOwnerComponent().getRouter().navTo("ReviewReservation", {                
                                "?query": {
                                    reserveID   : vReservationNumber,
                                    createFlag  : "false"
                                }                
                            });     
                        }
                    }else{
                        this.getView().byId("reserveInput").setValue("");
                        this.getView().byId("passwordInput").setValue("");
                        MessageToast.show("Please confirm your password or reservation number."); 
                    } 
                }else{
                    this.getView().byId("reserveInput").setValue("");
                    this.getView().byId("passwordInput").setValue("");
                    MessageToast.show("Please confirm your password or reservation number."); 
                }                
            },

            onDialogClose: function(oEvent){
                // oEvent.getSource().destroy();
                this.getView().byId("reserveInput").setValue("");
                this.getView().byId("passwordInput").setValue("");
                oEvent.getSource().getParent().close();
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
                dupFlag = false;
                this.checkReserve(oData.fldate, oData.carrid, oData.connid);
                var path_num = oRecord.oBindingContexts.testModel.sPath.split("/")[2];     

                if(dupFlag){
                    var oConfirm = MessageBox.confirm("A reservation already exists for that date. Do you want to proceed?", {
                        title: "Confirm",                                    // default                                      // default
                        actions: [ sap.m.MessageBox.Action.OK,
                                   sap.m.MessageBox.Action.CANCEL ],         // default
                        emphasizedAction: sap.m.MessageBox.Action.OK,        // default
                        onClose: function(sAction) {
                            if(sAction == "OK")
                                this.getOwnerComponent().getRouter().navTo("Reservation", {                
                                    "?query": {
                                        sPath           : path_num,
                                        LocationFrom    : oData.airpfrom,
                                        LocationFromName: oData.cityfrom,
                                        LocationTo      : oData.airpto,
                                        LocationToName  : oData.cityto,
                                        Passenger       : oRouterModel.getProperty("/Passenger")
                                    }                
                            });    
                                // this.getOwnerComponent().getRouter().navTo("RouteMain");  
                        }.bind(this), 
                    });       
                }else{
                    this.getOwnerComponent().getRouter().navTo("Reservation", {                
                        "?query": {
                            sPath           : path_num,
                            LocationFrom    : oData.airpfrom,
                            LocationFromName: oData.cityfrom,
                            LocationTo      : oData.airpto,
                            LocationToName  : oData.cityto,
                            Passenger       : oRouterModel.getProperty("/Passenger")
                        }                
                    });                    
                }
            },

            checkReserve: function(sDate, sCarrid, sConnid){
                // DB 예약 테이블 조회하여 동일 항공편 예약 이력이 있는지 확인
                var resultR;
                var oUserModel = this.getOwnerComponent().getModel("mockUser");
                var oReserveTable = this.getOwnerComponent().getModel("reservationTable"); // DB read 대용

                // read 대용으로 해봤는데 다건은 고려하지 못함, 해당날짜의 데이터가 단건이라는 가정하에 진행 -> completeFlag
                var indexR = $.inArray(sDate, $.map(oReserveTable.getProperty("/reservation"), function(n){
                    return n.fldate
                }));

                // if ($.inArray('foo', array) == -1 && $.inArray('bar', array) == -1) {
                //     // Neither foo or bar in array
                // }

                if(indexR !== -1){
                    resultR = oReserveTable.getProperty("/reservation/"+indexR);
                    if(resultR.userID === oUserModel.getProperty("/userId") && resultR.completeFlag === "false" 
                       && resultR.cancelFlag === "false" && resultR.carrid === sCarrid && resultR.connid === sConnid)
                        dupFlag = true;
                }
            }

        });
    });
