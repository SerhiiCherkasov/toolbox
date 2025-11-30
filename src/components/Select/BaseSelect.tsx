import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from ".";
import { EditableLabel } from "src/components/typography";
import { CheckIcon } from "@phosphor-icons/react";

type BaseSelectProps = {
  label?: string;
  value: string | undefined;
  setValue: (newValue: string | undefined) => void;
  options: Array<{
    slug: string;
    caption: string;
  }>;
  editableLabel?: boolean;
  onLabelEdit?: (label: string) => void;
};

export const BaseSelect = ({
  label,
  value,
  setValue,
  options,
  editableLabel,
  onLabelEdit,
}: BaseSelectProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <EditableLabel
          editableLabel={editableLabel}
          label={label}
          onLabelEdit={onLabelEdit}
        />
      )}
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue aria-label={value}>
            {options.find((opt) => opt.slug === value)?.caption}
          </SelectValue>
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectViewport>
              {options.map((opt) => (
                <SelectItem
                  key={opt.slug}
                  value={opt.slug}
                  className="flex gap-2 items-center justify-between"
                >
                  <div className="flex gap-2 items-center">
                    <SelectItemIndicator>
                      <CheckIcon size={14} />
                    </SelectItemIndicator>
                    <SelectItemText>{opt.caption}</SelectItemText>
                  </div>
                </SelectItem>
              ))}
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  );
};
