sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel) {
        "use strict";

        return Controller.extend("dj.djchatbot.controller.CheckFlight", {
            onInit: function () {
                var test = new ODataModel(
                    "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001/TravelAgency",
                    // "Access-Control-Allow-Origin" = "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001"   
                );
                // "Access-Control-Allow-Origin" = "https://8581cf25-e4bd-4b31-a78e-2d30182dcc48.abap-web.ap21.hana.ondemand.com/sap/opu/odata/sap/ZUI_C_TRAVEL_DJ_001";    
                debugger;
                console.log(test);

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
            }
        });
    });
