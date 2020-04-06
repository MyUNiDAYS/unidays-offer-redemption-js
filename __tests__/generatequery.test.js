const unidaysOfferTracking = global.unidaysOfferTracking;

describe('When calling generateQuery', () => {

	describe('When calling generateQuery directly', () => {
		let tracking;

		beforeEach(async () => {
			tracking = new unidaysOfferTracking('0LTio6iVNaKj861RM9azJQ==', 'Order123', 'ABC123');
		});

		test('With no timestamp set - The query should contain the corresponding parameters', () => {
			let query = tracking._generateQuery();

			expect(query).toBe('?partnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&transactionId=Order123&code=ABC123');
		});

		test('With null timestamp set - The query should contain the corresponding parameters', () => {
			let query = tracking._generateQuery(null);

			expect(query).toBe('?partnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&transactionId=Order123&code=ABC123');
		});

		test('With valid timestamp set - The query should contain the corresponding parameters', () => {
			let timestamp = new Date('2020-01-01T00:00:00.000Z').getTime();
			let query = tracking._generateQuery(timestamp);

			expect(query).toBe('?partnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&transactionId=Order123&code=ABC123&timestamp=2020-01-01T00:00:00.000Z');
		});

		test('With invalid timestamp set - The query should contain the corresponding parameters', () => {
			let timestamp = 'foo';
			let query = tracking._generateQuery(timestamp);
			expect(query).toBe('?partnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&transactionId=Order123&code=ABC123');
		});
	});
});
