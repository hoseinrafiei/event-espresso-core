import { renderHook } from '@testing-library/react-hooks';

import usePrices from '../usePrices';
import { ApolloMockedProvider } from '../../../../context';
import { nodes } from './data';
import useInitPriceTestCache from './useInitPriceTestCache';

describe('usePrices()', () => {
	const wrapper = ApolloMockedProvider();
	it('checks for the empty prices', () => {
		const { result } = renderHook(() => usePrices(), { wrapper });

		expect(result.current.length).toBe(0);
	});

	it('checks for the updated prices cache', () => {
		const { result } = renderHook(
			() => {
				useInitPriceTestCache();
				return usePrices();
			},
			{ wrapper }
		);

		const { current: cachedPrices } = result;

		expect(cachedPrices).toEqual(nodes);

		expect(cachedPrices.length).toEqual(nodes.length);

		expect(cachedPrices[0].id).toEqual(nodes[0].id);

		expect(cachedPrices[0].name).toEqual(nodes[0].name);
	});

	it('returns the prices limitted to the supplied ids', () => {
		const filteredPriceIds = [nodes[1].id, nodes[2].id];
		const filteredPrices = nodes.filter(({ id }) => filteredPriceIds.includes(id));
		const { result } = renderHook(
			() => {
				useInitPriceTestCache();
				return usePrices(filteredPriceIds);
			},
			{ wrapper }
		);

		const { current: cachedPrices } = result;

		expect(cachedPrices).toEqual(filteredPrices);

		expect(cachedPrices.length).toEqual(filteredPrices.length);

		expect(cachedPrices.length).toBeLessThanOrEqual(nodes.length);

		expect(cachedPrices[0].id).toEqual(filteredPrices[0].id);

		expect(cachedPrices[0].name).toEqual(filteredPrices[0].name);
	});
});
