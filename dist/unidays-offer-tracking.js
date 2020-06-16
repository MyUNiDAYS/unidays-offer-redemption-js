/**
 * Constructs a UNiDAYS tracking object.
 * @constructor
 * @param {string} partnerId The unique, region-specific partnerId provided by UNiDAYS.
 * @param {string} transactionId A unique ID for the transaction in your system.
 * @param {string} code The UNiDAYS discount code used.
 * @throws Will throw an error if any of the arguments are null.
 */
function UnidaysOfferTracking(partnerId, transactionId, code) {
    "use strict";

    this.partnerId = partnerId;
    this.transactionId = transactionId;
    this.code = code;

    if (!this.partnerId)
        throw 'partnerId is required and cannot be empty';

    if (!this.transactionId)
        throw 'transactionId is required and cannot be empty';

    if (!this.code)
        throw 'code is required and cannot be empty';
    
    this.trackingScriptUrl = 'https://api.myunidays.com/offer/tracking/v1.0/redemption/js';

    this._validateTimestamp = function(timestamp) {

        if(timestamp === undefined) {
            return '';
        }

        if(timestamp === null) {
            console.error("Timestamp provided is invalid, generating query with no timestamp");
            return '';
        }

        var date = new Date(timestamp);
        if(date == 'Invalid Date') {
            console.error("Timestamp provided is invalid, generating query with no timestamp");
            return '';
        }
        return date.toISOString();
    }

    this._generateQuery = function (timestamp) {
        var validatedTimestamp = this._validateTimestamp(timestamp);

        return '?partnerId=' + encodeURIComponent(this.partnerId) +
            '&transactionId=' + encodeURIComponent(this.transactionId) +
            '&code=' + encodeURIComponent(this.code) +
            (validatedTimestamp.length > 0 ? '&timestamp=' + this._validateTimestamp(timestamp) : '')
    };

    this._makeRequest = function (url, tag) {
        (function (e, u) {
            var t = e.getElementsByTagName(tag)[0],
                n = e.createElement(tag);
            n.async = true;
            n.src = u;
            t.parentNode.insertBefore(n, t);
        })(document, url);
    }

    /**
     * A function to retreive a URL that can be used to make an API request to UNiDAYS.
     * @param {string} [timestamp] An optional UNIX timestamp denoting when the transaction occurred.
     * @returns {string} A URL that can be used to perform an API call to UNiDAYS.
     */

    this.createScriptUrl = function (timestamp) {
        var query = this._generateQuery(timestamp);

        return this.trackingScriptUrl + query;
    }

    /**
     * A function used to make an API request to UNiDAYS.
     * @param {string} [timestamp] An optional UNIX timestamp denoting when the transaction occurred.
     */
    this.trackingScriptRequest = function (timestamp) {
        var query = this._generateQuery(timestamp);
        var url = this.trackingScriptUrl + query;

        this._makeRequest(url, 'script');
    }
}