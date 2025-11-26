import React from "react";
import { isNumber } from "src/utils";
import { inputProps, Input } from ".";

export const NumberInput = ({ onChange, ...rest }: inputProps) => {
  const safeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      event.target.value = "0";
    }
    if (isNumber(value)) {
      const trimmed = value.replace(/^(0(?=\d)|0$)+/, "");
      event.target.value = trimmed;
    }
    if (onChange) {
      onChange(event);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === "0") {
      event.target.value = "";
    }
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      event.target.value = "0";
    }
  };

  return (
    <Input
      {...rest}
      type="number"
      onChange={safeOnChange}
      onFocus={handleFocus}
      onBlur={handleOnBlur}
    />
  );
};
