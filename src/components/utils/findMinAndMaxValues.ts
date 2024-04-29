export default function findMinAndMaxValues(variableValue: string) {
  const regex = /^.*?(-?\d+).*?(-?\d+)[^\d]*$/;
  const matches = variableValue?.match(regex);

  if (matches && matches.length >= 3) {
    return { minValue: matches[1].toString(), maxValue: matches[2].toString() };
  } else {
    throw new Error('Could not find min and max values');
  }
}
