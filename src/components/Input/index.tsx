import React, { forwardRef } from "react";
import { cn } from "src/utils";
import { EditableLabel } from "src/components/typography/EditableLabel";

export type inputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  wrapperClassName?: string;
  editableLabel?: boolean;
  onLabelEdit?: (label: string) => void;
};

export const Input = forwardRef<HTMLInputElement, inputProps>(
  (
    { className, label, editableLabel, wrapperClassName, onLabelEdit, ...rest },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
        {editableLabel && (
          <EditableLabel
            label={label}
            onLabelEdit={onLabelEdit}
            editableLabel={editableLabel}
            className="max-w-[180px] truncate cursor-default"
          />
        )}
        <div
          className={cn(
            "bg-[var(--background-low)] p-1.5 rounded-lg border border-[var(--border-base)]",
            wrapperClassName
          )}
        >
          <input
            ref={ref}
            {...rest}
            className={cn(
              "w-full border-none p-0 m-0 shadow-none outline-none text-inherit font-inherit hide-number-input-arrows",
              className
            )}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';
