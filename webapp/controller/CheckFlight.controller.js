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
                // oTestModel = this.getOwnerComponent().getModel("testModel").getProperty("/testTable");
                oTestModel = this.getOwnerComponent().getModel("testModel");
                this.getView().setModel(oTestModel, 'testModel');
                this.getView().setModel(new JSONModel({
                    locationFrom : "",
                    locationTo  :  "",
                    personnel  : ""
                }), "routerModel");
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
                    oRouterModel.setProperty("/locationFrom", oArgs['?query'].locationFrom);
                    oRouterModel.setProperty("/locationTo", oArgs['?query'].locationTo);
                    oRouterModel.setProperty("/personnel", oArgs['?query'].personnel);
                }
                
                // Validation 메세지 초기화
                sap.ui.getCore().getMessageManager().removeAllMessages();
            },
        });
    });
