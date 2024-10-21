import React, { ChangeEvent, FC, useCallback, useEffect, useState, useRef, useMemo } from 'react';
import classnames from 'classnames';
import './multiRangeSlider.css';
import useDebounce from './hooks/useDebounce';

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: Function;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const debouncedOnChange = useDebounce((min: number, max: number) => onChange({ min, max }), 250);

  const getPercent = useMemo(() => {
    return (value: number) => Math.round(((value - min) / (max - min)) * 100);
  }, [min, max]);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    debouncedOnChange(minVal, maxVal);
  }, [minVal, maxVal, debouncedOnChange]);

  const handleMinInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(+event.target.value, maxVal - 1);
      setMinVal(value);
      event.target.value = value.toString();
    },
    [maxVal]
  );

  const handleMaxInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(+event.target.value, minVal + 1);
      setMaxVal(value);
      event.target.value = value.toString();
    },
    [minVal]
  );

  const leftValueStyle = useMemo(() => ({ left: `${getPercent(minVal)}%` }), [getPercent, minVal]);
  const rightValueStyle = useMemo(() => ({ left: `${getPercent(maxVal)}%` }), [getPercent, maxVal]);

  return (
    <div className="mrs-container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={handleMinInputChange}
        className={classnames('thumb thumb--zindex-3', {
          'thumb--zindex-5': minVal > max - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={handleMaxInputChange}
        className="thumb thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
        <div className="slider__left-value" style={leftValueStyle}>
          {minVal}
        </div>
        <div className="slider__right-value" style={rightValueStyle}>
          {maxVal}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
