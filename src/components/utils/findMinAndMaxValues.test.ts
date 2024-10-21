import findMinAndMaxValues from './findMinAndMaxValues';

describe('findMinAndMaxValues', () => {
  it('should find min and max values with delimiter " - "', () => {
    const result = findMinAndMaxValues('[10 - 90]');
    expect(result).toEqual({ minValue: '10', delimiter: '-', maxValue: '90' });
  });

  it('should find min and max values with delimiter "-"', () => {
    const result = findMinAndMaxValues('[10-90]');
    expect(result).toEqual({ minValue: '10', delimiter: '-', maxValue: '90' });
  });

  it('should find min and max values with delimiter "TO"', () => {
    const result = findMinAndMaxValues('[10TO90]');
    expect(result).toEqual({ minValue: '10', delimiter: 'TO', maxValue: '90' });
  });

  it('should find min and max values with delimiter " TO "', () => {
    const result = findMinAndMaxValues('[10 TO 90]');
    expect(result).toEqual({ minValue: '10', delimiter: 'TO', maxValue: '90' });
  });

  it('should find min and max values with different brackets', () => {
    expect(findMinAndMaxValues('{10TO90}')).toEqual({ minValue: '10', delimiter: 'TO', maxValue: '90' });
    expect(findMinAndMaxValues('(10TO90)')).toEqual({ minValue: '10', delimiter: 'TO', maxValue: '90' });
    expect(findMinAndMaxValues('(10-90)')).toEqual({ minValue: '10', delimiter: '-', maxValue: '90' });
    expect(findMinAndMaxValues('{10-90}')).toEqual({ minValue: '10', delimiter: '-', maxValue: '90' });
  });

  it('should find min and max values with no brackets', () => {
    expect(findMinAndMaxValues('10TO90')).toEqual({ minValue: '10', delimiter: 'TO', maxValue: '90' });
    expect(findMinAndMaxValues('10TO90')).toEqual({ minValue: '10', delimiter: 'TO', maxValue: '90' });
    expect(findMinAndMaxValues('10-90')).toEqual({ minValue: '10', delimiter: '-', maxValue: '90' });
    expect(findMinAndMaxValues('10-90')).toEqual({ minValue: '10', delimiter: '-', maxValue: '90' });
  });

  it('should throw an error when no min and max values are found', () => {
    expect(() => findMinAndMaxValues('[10]')).toThrow('Could not find min and max values');
    expect(() => findMinAndMaxValues('[10-to]')).toThrow('Could not find min and max values');
  });
});
