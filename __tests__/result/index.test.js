import { Result } from '../../src';

describe('Result.of', () => {
  it('returns Ok', () => {
    const result = Result.of(42);

    expect(result.isOk()).toBe(true);
    expect(result.value).toBe(42);
  });
});
