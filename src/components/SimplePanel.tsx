import React, { useEffect, useState, useCallback } from 'react';
import { PanelProps } from '@grafana/data';
import { locationService } from '@grafana/runtime';
import { SimpleOptions } from '../types';
import findMinAndMaxValues from './utils/findMinAndMaxValues';
import { DEFAULT_MAX_THRESHOLD, DEFAULT_MIN_THRESHOLD } from './constants';
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider';
import { debouncedVariableCheck } from './debouncedVariableCheck';

interface Props extends PanelProps<SimpleOptions> {}

const SimplePanel: React.FC<Props> = ({ options }) => {
  const {
    variableName,
    variableLabel,
    variableMinimumThreshold,
    variableMaximumThreshold,
    rangePrefix,
    rangeSuffix,
    rangeDelimiter,
    shouldHaveDelimiterSpace,
  } = options;

  const [panelState, setPanelState] = useState({
    selectedVariableValue: '',
    hasErrored: false,
    isInvalidRange: false,
    minValue: DEFAULT_MIN_THRESHOLD,
    maxValue: DEFAULT_MAX_THRESHOLD,
  });

  const minThreshold = Number(variableMinimumThreshold);
  const maxThreshold = Number(variableMaximumThreshold);

  const updatePanelState = useCallback((newState: Partial<typeof panelState>) => {
    setPanelState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  const handleSliderInput = useCallback(
    (minValue: number, maxValue: number) => {
      minValue = Math.max(minThreshold, Math.min(minValue, maxThreshold));
      maxValue = Math.max(minValue, Math.min(maxValue, maxThreshold));

      updatePanelState({ minValue, maxValue, isInvalidRange: false });

      const variableValue = `${rangePrefix ?? ''}${minValue}${shouldHaveDelimiterSpace ? ' ' : ''}${rangeDelimiter}${
        shouldHaveDelimiterSpace ? ' ' : ''
      }${maxValue}${rangeSuffix ?? ''}`;

      locationService.partial({ [`var-${variableName}`]: variableValue }, true);
    },
    [
      minThreshold,
      maxThreshold,
      rangePrefix,
      rangeSuffix,
      rangeDelimiter,
      shouldHaveDelimiterSpace,
      variableName,
      updatePanelState,
    ]
  );

  useEffect(() => {
    const handleSuccess = (newValue: string) => {
      try {
        const { minValue, maxValue } = findMinAndMaxValues(newValue);
        const newMinValue = Number(minValue);
        const newMaxValue = Number(maxValue);

        if (newMinValue > newMaxValue) {
          updatePanelState({
            selectedVariableValue: newValue,
            isInvalidRange: true,
            hasErrored: false,
          });
          return;
        }

        updatePanelState({
          selectedVariableValue: newValue,
          minValue: newMinValue,
          maxValue: newMaxValue,
          isInvalidRange: false,
          hasErrored: false,
        });
      } catch (err) {
        console.error('anyline-rangeslider-plugin', err);
        updatePanelState({
          selectedVariableValue: newValue,
          hasErrored: true,
        });
      }
    };

    const handleError = () => {
      updatePanelState({ hasErrored: true });
    };

    debouncedVariableCheck(variableName, handleSuccess, handleError);
  }, [variableName, updatePanelState]);

  if (!variableName) {
    return <div style={{ padding: '8px' }}>Please select a variable from panel options</div>;
  }

  if (panelState.hasErrored) {
    return <div style={{ padding: '8px' }}>Variable {variableName} has incorrect range syntax</div>;
  }

  if (panelState.isInvalidRange) {
    return <div style={{ padding: '8px' }}>Minimum value should be less than maximum value</div>;
  }

  if (maxThreshold < panelState.minValue) {
    return (
      <div style={{ padding: '8px' }}>
        Maximum threshold {maxThreshold} should be lower than {panelState.minValue}
      </div>
    );
  }

  if (minThreshold > panelState.maxValue) {
    return (
      <div style={{ padding: '8px' }}>
        Minimum threshold {minThreshold} cannot be higher than {panelState.maxValue}
      </div>
    );
  }

  return (
    <div style={{ padding: '8px' }}>
      <p>{variableLabel}</p>
      <MultiRangeSlider
        min={minThreshold}
        max={maxThreshold}
        onChange={({ min, max }: { min: number; max: number }) => handleSliderInput(min, max)}
      />
    </div>
  );
};

export default SimplePanel;
