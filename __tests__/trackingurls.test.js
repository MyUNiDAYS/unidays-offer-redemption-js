const unidaysOfferTracking = global.unidaysOfferTracking;

describe('When creating a tracking url', () => {
    let tracking;

    beforeEach(async () => {
        tracking = new unidaysOfferTracking('0LTio6iVNaKj861RM9azJQ==', 'Order123', 'ABC123');
    });

    test('With a script route and all parameters set - The url should contain the corresponding parameters', () => {
        let timestamp = new Date('2020-01-01T00:00:00.000Z').getTime();
        let url = tracking.createScriptUrl(timestamp);

        expect(url).toBe('https://api.myunidays.com/offer/tracking/v1.0/redemption/js?partnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&transactionId=Order123&code=ABC123&timestamp=2020-01-01T00:00:00.000Z');
    });

    test('With a script route and no timestamp set - The url should contain the corresponding parameters', () => {
        let url = tracking.createScriptUrl(null);

        expect(url).toBe('https://api.myunidays.com/offer/tracking/v1.0/redemption/js?partnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&transactionId=Order123&code=ABC123');
    });

    test('With a script route and invalid timestamp set - The url should contain the corresponding parameters', () => {
        let timestamp = 'foo';
        let url = tracking.createScriptUrl(timestamp);

        expect(url).toBe('https://api.myunidays.com/offer/tracking/v1.0/redemption/js?partnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&transactionId=Order123&code=ABC123');
    });
});