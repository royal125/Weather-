import React from "react";

export default function Geo() {

    function is_browser_gps_capable() {
        var _locator_object;
        try {
            _locator_object = navigator.geolocation;
        } catch (e) { return false; }
        if (_locator_object)
            return true;
        else
            return false;
    }


    function watchLocation(successCallback, errorCallback) {
        successCallback = successCallback || function () { };
        errorCallback = errorCallback || function () { };



        // Try HTML5-spec geolocation.
        var geolocation = navigator.geolocation;

        if (geolocation) {
            // We have a real geolocation service.
            try {
                function handleSuccess(position) {
                    successCallback(position.coords);
                }

                geolocation.watchPosition(handleSuccess, errorCallback, {
                    enableHighAccuracy: true,
                    maximumAge: 5000 // 5 sec.
                });
            } catch (err) {
                errorCallback();
            }
        } else {
            errorCallback();
        }


    }
    return (
        <></>
    );
}