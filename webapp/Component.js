/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "dj/djchatbot/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("dj.djchatbot.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.renderRecastChatbot();
            },
            renderRecastChatbot: function() {
                if (!document.getElementById("cai-webchat")) {
                    var s = document.createElement("script");
                       s.setAttribute("id", "cai-webchat");
                      s.setAttribute("src", "https://cdn.cai.tools.sap/webchat/webchat.js");
                          document.body.appendChild(s);
                    }
                    s.setAttribute("channelId", "b48b4985-4b75-4071-8a29-68e1e74bd4cd");
                    s.setAttribute("token", "edd0c81942b2d561d39839022b0824ac");
            },
        });
    }
);