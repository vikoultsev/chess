import hasPath from '../src/index';

describe('add',() => {
	test('Has path', () => {
		expect(hasPath({x: 0, y: 0}, 6)).toBe(true);
	});

	test('No path', () => {
		expect(hasPath({x: 0, y: 0}, 2)).toBe(false);
	});
});