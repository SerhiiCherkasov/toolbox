import { MagicWandIcon, CheckIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { Input } from "src/components/Input";
import { SmallText } from "src/components/typography";

type EditableLabelProps = {
  label?: string;
  editableLabel?: boolean;
  onLabelEdit?: (label: string) => void;
};

export const EditableLabel = ({
  label,
  editableLabel,
  onLabelEdit,
}: EditableLabelProps) => {
  const [currentLabel, setCurrentLabel] = useState(label);
  const [editLabel, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editLabel) {
      inputRef.current?.focus();
    }
  }, [editLabel]);

  useEffect(() => {
    onLabelEdit && onLabelEdit(currentLabel || "");
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
            wrapperClassName="text-xs p-0 border-none"
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
          <SmallText>{currentLabel || label || ""}</SmallText>
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
