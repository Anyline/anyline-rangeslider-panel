import React, { useEffect, useState, useCallback } from 'react';
import { PanelProps } from '@grafana/data';
import MultiRangeSlider from 'multi-range-slider-react';
import { getTemplateSrv, locationService } from '@grafana/runtime';
import { SimpleOptions } from '../types';
import findMinAndMaxValues from './utils/findMinAndMaxValues';
import { DEFAULT_MAX_THRESHOLD, DEFAULT_MIN_THRESHOLD } from './constants';

type RangeChangeEvent = {
  minValue: number;
  maxValue: number;
};

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
    (e: RangeChangeEvent) => {
      let { minValue, maxValue } = e;

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
    const updateVariableValue = () => {
      const variable = getTemplateSrv()
        .getVariables()
        .find((v) => v.name === variableName);

      if (!variable || !('current' in variable)) {
        return;
      }

      const newValue = variable.current.value as string;

      if (newValue === panelState.selectedVariableValue) {
        return;
      }

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
        updatePanelState({
          selectedVariableValue: newValue,
          hasErrored: true,
        });
      }
    };

    updateVariableValue();

    const subscription = locationService.getHistory().listen(updateVariableValue);

    return () => {
      subscription();
    };
  }, [variableName, updatePanelState, panelState.selectedVariableValue]);

  if (!variableName) {
    return <div style={{ padding: '8px' }}>Please select a variable from panel options.</div>;
  }

  if (panelState.hasErrored) {
    return <div style={{ padding: '8px' }}>Please ensure variable {variableName} has correct syntax.</div>;
  }

  if (panelState.isInvalidRange) {
    return <div style={{ padding: '8px' }}>Please ensure minimum threshold is less than maximum threshold.</div>;
  }

  return (
    <div style={{ padding: '8px' }}>
      <p>{variableLabel}</p>
      <MultiRangeSlider
        min={minThreshold}
        max={maxThreshold}
        step={1}
        ruler={false}
        label={true}
        preventWheel={false}
        minValue={panelState.minValue}
        maxValue={panelState.maxValue}
        onInput={handleSliderInput}
      />
    </div>
  );
};

export default SimplePanel;
