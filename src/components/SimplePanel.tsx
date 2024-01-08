import React from 'react';
import { PanelProps } from '@grafana/data';
import MultiRangeSlider from 'multi-range-slider-react';
import { locationService } from '@grafana/runtime';
import { SimpleOptions } from '../types';

type RangeChangeEvent = {
  minValue: number;
  maxValue: number;
};

interface Props extends PanelProps<SimpleOptions> {}

const SimplePanel: React.FC<Props> = ({ options }) => {
  const handleInput = (e: RangeChangeEvent) => {
    const { minValue, maxValue } = e;
    let variableValue;

    if (minValue === maxValue) {
      variableValue = `${minValue}`;
    } else {
      variableValue = `${options.rangePrefix}${minValue} ${options.rangeDelimiter} ${maxValue}${options.rangeSuffix}`;
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
        minValue={options.variableDefaultMinimumValue}
        maxValue={options.variableDefaultMaximumValue}
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
