export default function findMinAndMaxValues(variableValue: string) {
  const numberRegex = /(-?\d+)/;
  const firstNumberMatch = numberRegex.exec(variableValue);

  if (!firstNumberMatch) {
    throw new Error('Could not find any number');
  }

  const firstNumber = firstNumberMatch[1];
  const restOfString = variableValue.slice(firstNumberMatch.index + firstNumber.length);

  const delimiterRegex = /(.+?)(-?\d+)([^\d]*)$/;
  const delimiterMatch = delimiterRegex.exec(restOfString);

  if (delimiterMatch && delimiterMatch.length >= 3) {
    return {
      minValue: firstNumber,
      delimiter: delimiterMatch[1].trim(),
      maxValue: delimiterMatch[2],
    };
  } else {
    throw new Error('Could not find min and max values');
  }
}
