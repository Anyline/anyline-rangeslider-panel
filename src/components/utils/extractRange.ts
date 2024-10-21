interface ExtractedRange {
  minValue: string;
  delimiter: string;
  maxValue: string;
}

const extractRange = (value: string): ExtractedRange | null => {
  const numberRegex = /(-?\d+)/;
  const firstNumberMatch = numberRegex.exec(value);

  if (!firstNumberMatch) {
    return null;
  }

  const firstNumber = firstNumberMatch[1];
  const restOfString = value.slice(firstNumberMatch.index + firstNumber.length);

  const delimiterRegex = /(.+?)(-?\d+)([^\d]*)$/;
  const delimiterMatch = delimiterRegex.exec(restOfString);

  if (!delimiterMatch || delimiterMatch.length < 3) {
    return null;
  }

  return {
    minValue: firstNumber,
    delimiter: delimiterMatch[1].trim(),
    maxValue: delimiterMatch[2],
  };
};

export default extractRange;
