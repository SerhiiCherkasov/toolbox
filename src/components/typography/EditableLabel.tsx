import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { Input } from "src/components/Input";
import { SmallText } from "src/components/typography";
import { cn } from "src/utils";
import { Tooltip } from "src/components/Tooltip";

type EditableLabelProps = {
  label?: string;
  editableLabel?: boolean;
  onLabelEdit?: (label: string) => void;
  className?: string;
};

export const EditableLabel = ({
  label,
  editableLabel,
  onLabelEdit,
  className,
}: EditableLabelProps) => {
  const [currentLabel, setCurrentLabel] = useState(label);
  const [editLabel, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const trackCloseEditOnEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setEdit(false);
    }
  };

  useEffect(() => {
    if (editLabel) {
      inputRef.current?.focus();
      window.addEventListener("keydown", trackCloseEditOnEnter);
    } else {
      window.removeEventListener("keydown", trackCloseEditOnEnter);
    }
    return () => {
      window.removeEventListener("keydown", trackCloseEditOnEnter);
    };
  }, [editLabel]);

  useEffect(() => {
    if (onLabelEdit) {
      onLabelEdit(currentLabel || "");
    }
  }, [currentLabel]);

  useEffect(() => {
    setCurrentLabel(label);
  }, [label]);

  return (
    <div className="w-full">
      {editLabel ? (
        <div className="flex items-center gap-1">
          <Input
            ref={inputRef}
            wrapperClassName={cn("text-xs p-0 border-none", className)}
            onChange={(e) => setCurrentLabel(e.target.value)}
            onBlur={() => setEdit(false)}
            value={currentLabel}
          />
          <CheckIcon
            className="cursor-pointer"
            onClick={() => setEdit(false)}
          />
        </div>
      ) : (
        <div className="flex items-center gap-1 ">
          <Tooltip
            content={currentLabel || ""}
            disabled={!currentLabel?.length || currentLabel?.length <= 32}
          >
            <SmallText className={className}>{currentLabel || ""}</SmallText>
          </Tooltip>
          {editableLabel && (
            <Pencil1Icon
              fontSize={10}
              className="cursor-pointer"
              onClick={() => setEdit(true)}
            />
          )}
        </div>
      )}
    </div>
  );
};
