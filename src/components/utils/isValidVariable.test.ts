import { isValidVariable } from './isValidVariable';

describe('isValidVariable', () => {
  it('should return true for valid RangeVariable with valid range format', () => {
    const validVariable = { current: { value: '10-90' } };
    expect(isValidVariable(validVariable)).toBe(true);
  });

  it('should return false for RangeVariable with invalid range format', () => {
    const invalidVariable = { current: { value: 'invalid range' } };
    expect(isValidVariable(invalidVariable)).toBe(false);
  });

  it('should return false for RangeVariable with no value property', () => {
    const invalidVariable = { current: {} };
    expect(isValidVariable(invalidVariable)).toBe(false);
  });

  it('should return false for non-object input', () => {
    expect(isValidVariable(null)).toBe(false);
    expect(isValidVariable(undefined)).toBe(false);
    expect(isValidVariable('not an object')).toBe(false);
    expect(isValidVariable(123)).toBe(false);
  });

  it('should return false for RangeVariable where current is null', () => {
    const invalidVariable = { current: null };
    expect(isValidVariable(invalidVariable)).toBe(false);
  });

  it('should return false for RangeVariable where value is not a string', () => {
    const invalidVariable = { current: { value: 123 } };
    expect(isValidVariable(invalidVariable)).toBe(false);
  });
});
