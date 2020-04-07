<p align="center">
  <img src="https://assets1.unidays.world/v5/main/assets/images/logo_v003.svg" width="60%"/>
</p>
<br/>

# UNiDAYS JavaScript Library

This is the JavaScript library for integrating with UNiDAYS. The following documentation provides descriptions of the implementations and examples.

## Contents

[**How to use this code?**](#how-to-use-this-code)

[**Direct Tracking**](#direct-tracking)
- [Parameters](#parameters)
- [Example Usage](#example-usage)
    - [Create Script URL _(returns url for use in a script element)_](#create-script-url)
    - [Tracking Script Request _(performs the web request asynchronously within a script element)_](#tracking-script-request)
    - [Tag Managers and CDN _(use this package without including it as a file)_](#tag-managers-and-cdn)

[Unit Tests](#unit-tests)

[**Contributing**](#contributing)

## How to use this code

- Download the contents of `dist/`, choosing between a regular or minified version of the script.
- _Alternatively_, pull the package from [npm](https://www.npmjs.com/package/unidays-offer-redemption-js), choosing between a regular of minified version of the script within the created modules directory.
- Include this on the post-payment/order-success page of your web project.
- See the example usage section for the type of call you intend to use. Each of these contains an example.

## Direct Tracking

## Parameters

Here is a description of all available parameters. Which of these you provide are dependent on the agreed contract.

### Mandatory parameters

| Parameter | Description | Data Type | Example |
|---|---|---|---|
| partnerId | Your partnerId as provided by UNiDAYS. If you operate in multiple geographic regions you _may_ have a different partnerId for each region | Base64 Encoded Guid | XaxptFh0sK8Co6pI== |
| transactionId | A unique ID for the transaction in your system | String | Order123 |
| code | The UNiDAYS discount code used | String | ABC123 |

### Optional parameters

| Parameter | Description | Data Type | Example |
|---|---|---|---|--|
| timestamp | A timestamp denoting when the transaction occurred | String (UNIX Timestamp) | 1577836800000 |

Note: Assuming you have a JS `Date` object available, a UNIX timestamp can be obtained as follows:`var timestamp = myDate.getTime();`. If you wish to obtain a UNIX timestamp of the current time, use `var timestamp = Date.now();`.

## Example Usage

Below are examples of implementing the different types of integrations. These examples cover coded integrations and serve as a guideline for implementation.

- [Create Script URL _(returns url for use in a script element)_](#create-script-url)
- [Tracking Script Request _(performs the web request asynchronously within a script element)_](#tracking-script-request)

### Create Script URL

This is known as our client-script to server integration

#### Making the call

The method to get the URL to make a client-to-server request with is `.createScriptUrl()`. To implement this method, you first need to ensure that you have access to all required transaction details.

Once you have access to this transaction information, create a UnidaysOfferTracking object, providing the [mandatory parameters](#mandatory-parameters) as arguments `new UnidaysTracking(partnerId, transactionId, code)`.


There are two approaches to creating a script URL - with or without a [timestamp](#optional-parameters) denoting when the transaction occurred. If specifying your own timestamp, use the `.createScriptUrl(timestamp)`.

If opting to not specify a timestamp, call the method like so: `createScriptUrl()`. Using this approach will result in UNiDAYS generating the timestamp for you.

#### Return

A URL will be returned to you which can be used to call the API.

- If the request to the API is successful, a response with a single whitespace character a status code of 200 OK will be returned.
- If any of the [mandatory parameters](#mandatory-parameters) contained within the request are missing or malformed, a response with a status code of 400 Bad Request will be returned. The response will contain an array of the erroneous parameters and a statement to describe the problem e.g:

```json
Response:
[
  {
    "field": "PartnerId",
    "error": "PartnerId is invalid",
    "value": "error"
  },
  {
    "field": "Code",
    "error": "Code is missing",
    "value": null
  },
  {
    "field": "TransactionId",
    "error": "TransactionId is missing",
    "value": null
  }
]
```

Note: This will only work with `GET` requests.

#### Example

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

        // Call the createScriptUrl method to obtain a URL.
        var url = unidays.createScriptUrl(timestamp);

        // You now have a URL which can be used within a script element to call the API.
    }(window));
</script>
```

### Tracking Script Request

This will create the client-script URL and perform the request to the UNiDAYS Tracking API for you.

#### Making the call

The method to call the API with a client-script request is `trackingScriptRequest(args)`. To implement this method, you first need to ensure that you have access to all required transaction details.

Once you have access to this transaction information, create a UnidaysOfferTracking object, providing the mandatory parameters as arguments `new UnidaysOfferTracking(partnerId, transactionId, code)`.

There are two approaches to creating a script URL - with or without a [timestamp](#optional-parameters) denoting when the transaction occurred. If specifying your own timestamp, use the `.trackingScriptRequest(timestamp)`.

If opting to not specify a timestamp, call the method like so: `trackingScriptRequest()`. Using this approach will result in UNiDAYS generating the timestamp for you.

#### Return

A URL will be returned to you which can be used to call the API.

- If the request to the API is successful, a response with a single whitespace character a status code of 200 OK will be returned.
- If any of the [mandatory parameters](#mandatory-parameters) contained within the request are missing or malformed, a response with a status code of 400 Bad Request will be returned. The response will contain an array of the erroneous parameters and a statement to describe the problem e.g:

```json
Response:
[
  {
    "field": "PartnerId",
    "error": "PartnerId is invalid",
    "value": "error"
  },
  {
    "field": "Code",
    "error": "Code is missing",
    "value": null
  },
  {
    "field": "TransactionId",
    "error": "TransactionId is missing",
    "value": null
  }
]
```

#### Example

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

        // Call the trackingScriptRequest method. The method will build the request and perform it to our API within a script element.
        unidays.trackingScriptRequest(timestamp);
    }(window));
</script>
```

### Tag Managers and CDN

This will demonstrate how to use this Javascript helper within a Tag (e.g. Google Tag Manager or other similar CMS) and/or how to pull in the UNiDAYS Javascript client helper through our CDN.

Note: We have included the SHA384 in the example below; file integrity is guaranteed, so you can be assured that you are always pulling in the official UNiDAYS JavaScript helper.

**However**, if your Tag Manager or CMS does not support the `integrity` attribute within `<script>` elements, simply remove the `integrity` and `crossorigin` attributes.

e.g.

```html
<script src="https://cdn.unidays.world/unidays-offer-tracking.min.js"></script>
```

#### Making the call

The method to call the API with a client-script request is `trackingScriptRequest()`. To implement this method, you first need to ensure that you have access to all required transaction details. In Google Tag Manager, for example, all of the required transaction information should be already available within the Data Layer for your online store. If any required information is not already available within the Data Layer for your online store, please contact your Development team and ensure this information has been added.

Once you have access to this transaction information, create a UnidaysTracking object, providing the mandatory parameters as arguments `new UnidaysTracking(partnerId, transactionId, code)` and call `.trackingScriptRequest()`.

Note: Most Tag Manangers (such as Google Tag Manager) requires you to reference Data Layer / User-Defined variables using `{{This Syntax}}` or something similar. If you are unsure, please contact your Development team associated with the Tag Manager platform you use.

#### Return

A URL will be returned to you which can be used to call the API.

- If the request to the API is successful, a response with a single whitespace character a status code of 200 OK will be returned.
- If any of the [mandatory parameters](#mandatory-parameters) contained within the request are missing or malformed, a response with a status code of 400 Bad Request will be returned. The response will contain an array of the erroneous parameters and a statement to describe the problem e.g:

```json
Response:
[
  {
    "field": "PartnerId",
    "error": "PartnerId is invalid",
    "value": "error"
  },
  {
    "field": "Code",
    "error": "Code is missing",
    "value": null
  },
  {
    "field": "TransactionId",
    "error": "TransactionId is missing",
    "value": null
  }
]
```

#### Example

```html
<script src="https://cdn.unidays.world/unidays-offer-tracking.min.js"
    integrity="sha384-JEmfhKKRbcaBRGEgxbUtzA7pyWctEsPcVdw6QxjbVzmYEYtZsrh4hFRzosin018y"
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

## Unit Tests

We use [Jest](https://jestjs.io/) for our Unit Tests

### Installation

To install the Jest test-runner and all dependencies for this project, run `npm install` from your favourite terminal within the project directory.

### Running the tests

To run the tests, run `npm test` from your favourite terminal within the project directory.

## Contributing

This project is set up as an open source project. As such, if there are any suggestions that you have for features, for improving the code itself, or you have come across any problems; you can raise them and/or suggest changes in implementation.

If you are interested in contributing to this codebase, please follow the [contributing guidelines](./.github/contributing.md). This contains guides on both contributing directly and raising feature requests or bug reports. Please adhere to our [code of conduct](./CODE_OF_CONDUCT.md) when doing any of the above.