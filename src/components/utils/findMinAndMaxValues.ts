import extractRange from './extractRange';

export default function findMinAndMaxValues(variableValue: string) {
  const extracted = extractRange(variableValue);

  if (!extracted) {
    throw new Error('Could not find min and max values');
  }

  return extracted;
}
