<p align="center">
  <img src="https://assets1.unidays.world/v5/main/assets/images/logo_v003.svg" width="50%"/>
</p>
<br/>

# Offer Redemption Tracking

JavaScript helper-library for tracking Offer Redemption events with UNiDAYS. This should be used for UNiDAYS Offers which provide Codes to UNiDAYS Members. The following documentation describes how to use this helper-library.

## Contents

[Get started](#get-started)

[Parameters](#parameters)

[Example usages](#example-usages)

- [Creating a UNiDAYS tracking URL to send manually](#create-script-url)

- [Sending an Offer Redemption to UNiDAYS using the library](#tracking-script-request)

- [Retrieve the UNiDAYS library via our CDN (with a tag manager example usage)](#cdn-and-tag-managers)

[API request/reponse](#api-request/response)

[Unit Tests](#unit-tests)

[Contributing](#contributing)

----

### Get started

1. - Download the contents of `dist/`, choosing between a regular or minified version of the script.
    - _Alternatively_, pull the package from [npm](https://www.npmjs.com/package/unidays-offer-redemption-js), choosing between a regular or minified version of the script within the created modules directory.

2. Include this on the post-payment/order-success page of your web project / e-commerce store.

3. See the [example usages](#example-usages) section below in order to choose your preferred way to begin tracking your UNiDAYS Offer Redemptions.

**Note: Only transactions associated with UNiDAYS Offers should be tracked to the UNiDAYS API.**

----

## Parameters

A description of what information is required to create a UNiDAYS Offer Redemption event.

### Mandatory

| Parameter | Description | Data Type | Example |
|---|---|---|---|
| partnerId | Your partnerId as provided by UNiDAYS. | base64-encoded guid | XaxptFh0sK8Co6pI== |
| transactionId | The unique ID for the transaction in your system | string | order123 |
| code | The UNiDAYS Offer Code redeemed in the transaction | string | UNI-C4RLB45KN |

### Optional

| Parameter | Description | Data Type | Example |
|---|---|---|---|
| timestamp | A timestamp denoting when the transaction occurred | string (unix timestamp) | 1577836800000 |

Note: If you have a `Date` object available for when the transaction occured, a UNIX timestamp can be obtained as follows: `var unixTimestamp = myDateObject.getTime();`. Alternatively, if you wish to obtain a UNIX timestamp of the current time, you can use: `var unixTimestamp = Date.now();`.

## Example usages

### Create script URL

This function should be used if you intend to make the request to the UNiDAYS API within a `<script>` element, or by using your own client. Using this function correctly will return a complete URL which can be used to track Offer Redemption events with UNiDAYS.

#### Using the createScriptUrl() function

The function to get the URL to make a client-to-server request with is `.createScriptUrl()`. To implement this function, you first need to ensure that you have access to all required [transaction information](#parameters).

Once you have access to this transaction information, create a `UnidaysOfferTracking` object, providing the [mandatory parameters](#mandatory-parameters) as arguments.

e.g.

```javascript
var unidays = new UnidaysOfferTracking(partnerId, transactionId, code);
```

There are two approaches to creating a script URL - with or without a [timestamp](#optional-parameters) denoting when the transaction occurred.

To specify your own timestamp, simply include your UNIX timestamp as an argument for the function call.

e.g.

```javascript
var url = unidays.createScriptUrl(timestamp);
```

To let the UNiDAYS helper-library generate a timestamp for you, simply omit any arguments in the function call.

e.g.

```javascript
var url = unidays.createScriptUrl();
```

#### Full usage example

```html
<script type='text/javascript' src='unidays-offer-tracking.js'></script>

<script type='text/javascript'>
    (function (window) {
        // UNiDAYS will provide your partnerId.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction.
        var transactionId = 'Order123';
        var code = 'ABC123';

        // Create a reference to the UnidaysOfferTracking object, passing in your partnerId, transactionId and code.
        var unidays = new UnidaysOfferTracking(partnerId, transactionId, code);

        // Get the UNIX timestamp for the date of the transaction. In this case, it is the current time.
        var timestamp = Date.now();

        // Call the createScriptUrl function to obtain a URL.
        var url = unidays.createScriptUrl(timestamp);

        // You now have a URL which can be used within a <script> element to call the UNiDAYS API.
    }(window));
</script>
```

----

### Tracking script request

This function should be used if you would prefer for the UNiDAYS helper-library to track your Offer Redemption events for you. Using this function correctly will build the Offer Redemption event and asychronously call the UNiDAYS API to track the event.

#### Using the trackingScriptRequest() function

The method to call the API with a client-script request is `trackingScriptRequest()`. To implement this function, you first need to ensure that you have access to all required [transaction information](#parameters).

Once you have access to this transaction information, create a `UnidaysOfferTracking` object, providing the [mandatory parameters](#mandatory-parameters) as arguments.

e.g.

```javascript
var unidays = new UnidaysOfferTracking(partnerId, transactionId, code);
```

There are two approaches to performation a request to the API - with or without a [timestamp](#optional-parameters) denoting when the transaction occurred.

To specify your own timestamp, simply include your UNIX timestamp as an argument for the function call.

e.g.

```javascript
unidays.trackingScriptRequest(timestamp);
```

To let the UNiDAYS helper-library generate a timestamp for you, simply omit any arguments in the function call.

e.g.

```javascript
unidays.trackingScriptRequest();
```

#### Full usage example

```html
<script type='text/javascript' src='unidays-offer-tracking.js'></script>

<script type='text/javascript'>
    (function (window) {
        // UNiDAYS will provide your partnerId.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction.
        var transactionId = 'Order123';
        var code = 'ABC123';

        // Create a reference to the UnidaysOfferTracking object, passing in your partnerId, transactionId and code.
        var unidays = new UnidaysOfferTracking(partnerId, transactionId, code);

        //get the UNIX timestamp for the date of the transaction. In this case, it is the current time
        var timestamp = Date.now();

        // Call the trackingScriptRequest function.
        // The function will build and perform the request to the API asychronously within a script element.
        unidays.trackingScriptRequest(timestamp);
    }(window));
</script>
```

----

### CDN and tag managers

This section describes how to use the UNiDAYS CDN to pull in the helper-library into your project/application, as an alternative to installing it. This includes an example of implementation with a tag manager (such as Google Tag Manager).

Note: We have included the SHA384 in the example below; file integrity is guaranteed, so you can be assured that you are always pulling in the official UNiDAYS JavaScript helper.

#### Using the helper-library

The method to call the API with a client-script request is `trackingScriptRequest()`. To implement this function, you first need to ensure that you have access to all required [transaction information](#parameters). In Google Tag Manager, for example, all of the required transaction information should be already available within the Data Layer for your online store. If any required information is not already available within the Data Layer for your online store, please contact your Development team and ensure this data is added.

Once you have access to this transaction information, create a `UnidaysOfferTracking` object, providing the [mandatory parameters](#mandatory-parameters) as arguments.

e.g.

```javascript
var unidays = new UnidaysOfferTracking(partnerId, transactionId, code);
```

There are two approaches to performation a request to the API - with or without a [timestamp](#optional-parameters) denoting when the transaction occurred.

To specify your own timestamp, simply include your UNIX timestamp as an argument for the function call.

e.g.

```javascript
unidays.trackingScriptRequest(timestamp);
```

To let the UNiDAYS helper-library generate a timestamp for you, simply omit any arguments in the function call.

e.g.

```javascript
unidays.trackingScriptRequest();
```

#### Full usage example

```html
<script src="https://cdn.unidays.world/unidays-offer-tracking.min.js"
    integrity="sha384-DkOq5vfv7gkXxqwMm/0/l/PbozRqYHTRIc6uy1uN1BRCXPhhIoxb0n88dXuKbwZA"
    crossorigin="anonymous"></script>

<script type='text/javascript'>
    (function (window) {
        // UNiDAYS will provide your partnerId and signingKey.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction. (e.g. For Google Tag Manager, please reference your Data Layer)
        var transactionId = 'Order123';
        var code = 'ABC123';

        // Create a reference to the UnidaysOfferTracking object, passing in your partnerId, transactionId and code.
        var unidays = new UnidaysOfferTracking(partnerId, transactionId, code);

        //get the UNIX timestamp for the date of the transaction. In this case, it is the current time
        var timestamp = Date.now()

        // Call the trackingScriptRequest method. The method will build the request and perform it to our API within a script element.
        unidays.trackingScriptRequest(timestamp);
    }(window));
</script>
```

Notes:

- Most Tag Manangers (such as Google Tag Manager) requires you to reference Data Layer / User-Defined variables using `{{This Syntax}}` or something similar. If you are unsure, please contact your Development team associated with the Tag Manager platform you use.

- If your Tag Manager or CMS does not support the `integrity` attribute within `<script>` elements, simply remove the `integrity` and `crossorigin` attributes.

e.g.

```html
<script src="https://cdn.unidays.world/unidays-offer-tracking.min.js"></script>
```

----

## API request/response

After making a request to the UNiDAYS API, you will receive either a 200 or 400 HTTP status code in the response.

**200 OK** - The request to the UNiDAYS API was successful and we have begun processing your event. You can also expect a single whitespace character returned in the response body.

**400 Bad Request** - The request contained missing or badly-formed parameters. You can also expect an array of details about the parameters which have caused problems in the response body (see below).

### Error details

```json
[
  {
    "field": "PartnerId",
    "error": "PartnerId is invalid",
    "value": "invalidpartnerid"
  },
  {
    "field": "Code",
    "error": "Code is missing",
    "value": null
  },
  {
    "field": "TransactionId",
    "error": "TransactionId is missing",
    "value": ""
  }
]
```

----

### Unit tests

We use [Jest](https://jestjs.io/) for our Unit Tests

#### Installation

To install the Jest test-runner and all dependencies for this project, run `npm install` from your terminal at the root of the project directory.

#### Running the tests

To run the tests, run `npm test` from your terminal at the root of the project directory.

## Contributing

This project is set up as an open source project. As such, if there are any suggestions that you have for features, for improving the code itself, or you have come across any problems; you can raise them and/or suggest changes in implementation.

If you are interested in contributing to this codebase, please follow the [contributing guidelines](./.github/contributing.md). This contains guides on both contributing directly and raising feature requests or bug reports. Please adhere to our [code of conduct](./CODE_OF_CONDUCT.md) when doing any of the above.
