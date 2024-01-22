import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import MultiRangeSlider from 'multi-range-slider-react';
import { locationService } from '@grafana/runtime';
import { SimpleOptions } from '../types';

const DEFAULT_PREFIX = "["
const DEFAUT_DELIMITER = "TO"
const DEFAULT_SUFFIX = "]"

type RangeChangeEvent = {
  minValue: number;
  maxValue: number;
};

interface Props extends PanelProps<SimpleOptions> {}

const SimplePanel: React.FC<Props> = ({ options }) => {

  const [_minValue, setMinValue] = useState(0);
  const [_maxValue, setMaxValue] = useState(0);


  const handleInput = (e: RangeChangeEvent) => {
    let { minValue, maxValue } = e;
    let variableValue;

    if(minValue < options.variableMinimumThreshold || minValue > options.variableMaximumThreshold) {
      minValue = options.variableMinimumThreshold;
    }

    if(maxValue > options.variableMaximumThreshold || maxValue < options.variableMinimumThreshold) {
      maxValue = options.variableMaximumThreshold;
    }

    setMinValue(minValue);
    setMaxValue(maxValue);

    if (minValue === maxValue) {
      variableValue = `${minValue}`;
    } else {
      variableValue = `${options.rangePrefix || DEFAULT_PREFIX}${minValue} ${options.rangeDelimiter || DEFAUT_DELIMITER} ${maxValue}${options.rangeSuffix || DEFAULT_SUFFIX}`;
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
        minValue={_minValue || options.variableDefaultMinimumValue}
        maxValue={_maxValue || options.variableDefaultMaximumValue}
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
