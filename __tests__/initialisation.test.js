const unidaysOfferTracking = global.unidaysOfferTracking;

describe('When the unidaysOfferTracking method is called', () => {
	let tracking;

	test('With all parameters - The method should be defined', () => {
		function methodInit() {
			tracking = new unidaysOfferTracking('0LTio6iVNaKj861RM9azJQ==', 'Order123', 'ABC123');
		}

		expect(methodInit).toBeDefined();
	});

	test('With no partnerId - The method should throw an error', () => {
		function methodInit() {
			tracking = new unidaysOfferTracking(null, 'Order123', 'ABC123');
		}

		expect(methodInit).toThrowError('partnerId is required and cannot be empty');
	});

	test('With no transactionId - The method should throw an error', () => {
		function methodInit() {
			tracking = new unidaysOfferTracking('0LTio6iVNaKj861RM9azJQ==', null, 'ABC123');
		}

		expect(methodInit).toThrowError('transactionId is required and cannot be empty');
	});

	test('With no code - The method should throw an error', () => {
		function methodInit() {
			tracking = new unidaysOfferTracking('0LTio6iVNaKj861RM9azJQ==', 'Order123', null);
		}

		expect(methodInit).toThrowError('code is required and cannot be empty');
	});
});

