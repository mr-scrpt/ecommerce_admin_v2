"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

export interface CounterProps {
  max: number;
  value: number;
  onChange: (value: number) => void;
  setReached: (value: boolean) => void;
}
const Counter = (props: CounterProps) => {
  const { max, value, onChange, setReached } = props;
  const [currentValue, setValue] = useState(value);

  useEffect(() => {
    onChange(currentValue);
  }, [currentValue, onChange]);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const increment = () => {
    setValue(currentValue + 1);
    if (currentValue + 1 >= max) {
      setReached(true);
      return;
    } else {
      setReached(false);
    }
  };

  const decrement = () => {
    setValue(currentValue - 1);
    if (currentValue - 1 <= 0) {
      setReached(true);
      return;
    } else {
      setReached(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <Button onClick={decrement} disabled={currentValue <= 1}>
          -
        </Button>
        <Input
          name="counter"
          value={currentValue}
          className="w-16"
          onChange={(e) => {
            setReached(false);
            const value = Number(e.target.value);
            if (Number.isNaN(value)) {
              return;
            }
            if (value >= max) {
              setReached(true);
              setValue(max);
              return;
            }
            setValue(value);
            onChange(value);
          }}
        />
        <Button onClick={increment} disabled={currentValue === max}>
          +
        </Button>
      </div>
    </div>
  );
};

export default Counter;
