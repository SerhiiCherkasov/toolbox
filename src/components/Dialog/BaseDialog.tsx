import { ReactNode } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from ".";
import { Button } from "../Button";
import { DialogProps } from "@radix-ui/react-dialog";
import { Divider } from "../Divider";

type BaseDialogProps = DialogProps & {
  trigger: ReactNode;
  children?: ReactNode;
  title?: string;
  description?: string;
  action?: () => void;
  actionName?: string;
  actionDisabled?: boolean;
  hideControls?: boolean;
};

export const BaseDialog = ({
  trigger,
  title,
  description,
  action,
  actionName,
  children,
  actionDisabled,
  hideControls,
  ...rest
}: BaseDialogProps) => {
  return (
    <DialogRoot {...rest}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
          {children && children}
          {!hideControls && (
            <>
              <Divider className="bg-gray-500" />
              <div className="flex gap-4 items-center justify-center">
                <DialogClose>
                  {action && (
                    <Button
                      onClick={action}
                      size="partial"
                      disabled={actionDisabled}
                    >
                      {actionName || "Ok"}
                    </Button>
                  )}
                </DialogClose>
                <DialogClose>
                  <Button variant="outlined" size="partial">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
