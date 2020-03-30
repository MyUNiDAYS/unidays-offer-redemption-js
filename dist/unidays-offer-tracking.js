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
        if(timestamp) {
            var date = new Date(timestamp);
            if(date != 'Invalid Date') {
                return '&timestamp=' + date.toISOString();
            }
            console.error("Timestamp provided is invalid, generating query with no timestamp");
            return '';
        }
        return '';
    }

    this._generateQuery = function (timestamp) {
        return '?partnerId=' + encodeURIComponent(this.partnerId) +
            '&transactionId=' + encodeURIComponent(this.transactionId) +
            '&code=' + encodeURIComponent(this.code) +
            (timestamp ? this._validateTimestamp(timestamp) : '')
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

    this.createScriptUrl = function (timestamp) {
        var query = this._generateQuery(timestamp);

        return this.trackingScriptUrl + query;
    }

    this.trackingScriptRequest = function (timestamp) {
        var query = this._generateQuery(timestamp);
        var url = this.trackingScriptUrl + query;

        this._makeRequest(url, 'script');
    }
}