import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import MultiRangeSlider from 'multi-range-slider-react';
import { locationService } from '@grafana/runtime';
import { SimpleOptions } from '../types';
import findMinAndMaxValues from './utils/findMinAndMaxValues';

const DEFAULT_PREFIX = "["
const DEFAUT_DELIMITER = "TO"
const DEFAULT_SUFFIX = "]"

type RangeChangeEvent = {
  minValue: number;
  maxValue: number;
};

interface Props extends PanelProps<SimpleOptions> {}

const SimplePanel: React.FC<Props> = ({ options }) => {

  const urlParams = new URLSearchParams(window.location.search);

  const selectedVariableValue = urlParams.get(`var-${options.variableName}`);

  const { minValue, maxValue } = findMinAndMaxValues(selectedVariableValue);

  const [_minValue, setMinValue] = useState<string>(minValue);
  const [_maxValue, setMaxValue] = useState<string>(maxValue);


  const handleInput = (e: RangeChangeEvent) => {
    let { minValue, maxValue } = e;
    let variableValue;

    if(minValue < options.variableMinimumThreshold || minValue > options.variableMaximumThreshold) {
      minValue = options.variableMinimumThreshold;
    }

    if(maxValue > options.variableMaximumThreshold || maxValue < options.variableMinimumThreshold) {
      maxValue = options.variableMaximumThreshold;
    }

    setMinValue(minValue.toString());
    setMaxValue(maxValue.toString());

    if (minValue === maxValue) {
      variableValue = `${minValue}`;
    } else {
      variableValue = `${options.rangePrefix || DEFAULT_PREFIX}${minValue}${options.delimiterSpace ? ' ' : ''}${options.rangeDelimiter || DEFAUT_DELIMITER}${options.delimiterSpace ? ' ' : ''}${maxValue}${options.rangeSuffix || DEFAULT_SUFFIX}`;
    }

    locationService.partial({ [`var-${options.variableName}`]: variableValue }, true);
  };

  return (
    <div style={{ padding: '8px' }}>
      <p>{options.variableLabel}</p>
      <MultiRangeSlider
        min={options.variableMinimumThreshold}
        max={options.variableMaximumThreshold}
        step={1}
        ruler={false}
        label={true}
        preventWheel={false}
        minValue={_minValue}
        maxValue={_maxValue}
        onInput={(e) => {
          handleInput({
            minValue: e.minValue,
            maxValue: e.maxValue,
          });
        }}
      />
    </div>
  );
};

export default SimplePanel;
