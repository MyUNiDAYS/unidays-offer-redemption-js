const _eval = require('eval');
const fs = require('fs');
const path = require('path');

let unidaysOfferTrackingScript = fs.readFileSync(path.join(__dirname, '../src/unidays-offer-tracking.js'), 'utf8');
unidaysOfferTrackingScript += "module.exports.UnidaysOfferTracking = module.exports = UnidaysOfferTracking;";
global.unidaysOfferTracking = _eval(unidaysOfferTrackingScript);