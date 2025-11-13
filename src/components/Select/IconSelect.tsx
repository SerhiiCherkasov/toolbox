import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from ".";
import { EditableLabel } from "src/components/typography";

type IconSelectProps = {
  label?: string;
  value: string | undefined;
  setValue: (newValue: string | undefined) => void;
  options: Array<{
    slug: string;
    caption: string;
    icon: ReactNode;
  }>;
  editableLabel?: boolean;
  onLabelEdit?: (label: string) => void;
};

export const IconSelect = ({
  label,
  value,
  setValue,
  options,
  editableLabel,
  onLabelEdit,
}: IconSelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <EditableLabel
          editableLabel={editableLabel}
          label={label}
          onLabelEdit={onLabelEdit}
        />
      )}
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-9.5 items-center justify-center cursor-pointer">
          <SelectValue aria-label={value}>
            {options.find((opt) => opt.slug === value)?.icon}
          </SelectValue>
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectViewport>
              {options.map((opt) => (
                <SelectItem
                  key={opt.slug}
                  value={opt.slug}
                  className="flex items-center gap-2"
                >
                  {opt.icon}
                  <div>
                    <SelectItemText>{opt.caption}</SelectItemText>
                    <SelectItemIndicator>…</SelectItemIndicator>
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
