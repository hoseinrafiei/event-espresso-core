import diff from '../../diff';

describe('diff.calendarISOWeeks', () => {
	it('returns the number of calendar ISO weeks between the given dates', () => {
		const result = diff(
			'calendarISOWeeks',
			new Date(2014, 6 /* Jul */, 8, 18, 0),
			new Date(2014, 5 /* Jun */, 29, 6, 0)
		);
		expect(result).toBe(2);
	});

	it('returns a negative number if the time value of the first date is smaller', () => {
		const result = diff(
			'calendarISOWeeks',
			new Date(2014, 5 /* Jun */, 29, 6, 0),
			new Date(2014, 6 /* Jul */, 8, 18, 0)
		);
		expect(result).toBe(-2);
	});

	it('accepts timestamps', () => {
		const result = diff(
			'calendarISOWeeks',
			new Date(2014, 6 /* Jul */, 12).getTime(),
			new Date(2014, 6 /* Jul */, 2).getTime()
		);
		expect(result).toBe(1);
	});

	describe('edge cases', () => {
		it('the difference is less than an ISO week, but the given dates are in different calendar ISO weeks', () => {
			const result = diff('calendarISOWeeks', new Date(2014, 6 /* Jul */, 7), new Date(2014, 6 /* Jul */, 6));
			expect(result).toBe(1);
		});

		it('the same for the swapped dates', () => {
			const result = diff('calendarISOWeeks', new Date(2014, 6 /* Jul */, 6), new Date(2014, 6 /* Jul */, 7));
			expect(result).toBe(-1);
		});

		it('the days of weeks of the given dates are the same', () => {
			const result = diff('calendarISOWeeks', new Date(2014, 6 /* Jul */, 9), new Date(2014, 6 /* Jul */, 2));
			expect(result).toBe(1);
		});

		it('the given dates are the same', () => {
			const result = diff(
				'calendarISOWeeks',
				new Date(2014, 8 /* Sep */, 5, 0, 0),
				new Date(2014, 8 /* Sep */, 5, 0, 0)
			);
			expect(result).toBe(0);
		});

		it('does not return -0 when the given dates are the same', () => {
			function isNegativeZero(x: number): boolean {
				return x === 0 && 1 / x < 0;
			}

			const result = diff(
				'calendarISOWeeks',
				new Date(2014, 8 /* Sep */, 5, 0, 0),
				new Date(2014, 8 /* Sep */, 5, 0, 0)
			);

			const resultIsNegative = isNegativeZero(result);
			expect(resultIsNegative).toBe(false);
		});
	});

	it('returns NaN if the first date is `Invalid Date`', () => {
		const result = diff('calendarISOWeeks', new Date(NaN), new Date(2017, 0 /* Jan */, 1));
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns NaN if the second date is `Invalid Date`', () => {
		const result = diff('calendarISOWeeks', new Date(2017, 0 /* Jan */, 1), new Date(NaN));
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns NaN if the both dates are `Invalid Date`', () => {
		const result = diff('calendarISOWeeks', new Date(NaN), new Date(NaN));
		expect(isNaN(Number(result))).toBe(true);
	});
});
