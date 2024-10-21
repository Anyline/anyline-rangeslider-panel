import extractRange from './extractRange';

const isValidRangeFormat = (value: string): boolean => {
  try {
    return !!extractRange(value);
  } catch {
    return false;
  }
};

export interface RangeVariable {
  current: {
    value: string;
  };
}

export const isValidVariable = (v: any): v is RangeVariable => {
  if (v === null || v === undefined) {
    return false;
  }

  if (!v.current || v.current === null) {
    return false;
  }

  if (typeof v.current.value !== 'string') {
    return false;
  }

  return isValidRangeFormat(v.current.value);
};
