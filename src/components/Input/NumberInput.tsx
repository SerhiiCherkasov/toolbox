import React, { forwardRef } from "react";
import { isNumber } from "src/utils";
import { inputProps, Input } from ".";

export const NumberInput = ({ onChange, ...rest }: inputProps) => {
  const safeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      event.target.value = "0";
      onChange && onChange(event);
    }
    if (isNumber(value)) {
      const trimmed = value.replace(/^(0(?=\d)|0$)+/, "");
      event.target.value = trimmed;
      onChange && onChange(event);
    }
  };

  return <Input {...rest} type="number" onChange={safeOnChange} />;
};
