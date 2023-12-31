import { Modal } from "@mantine/core";

export interface DialogProps {
  title: string;
  children: React.ReactNode;
  opened: boolean;
  onClose: () => void;
  classNames?: string;
}

export const Dialog = ({
  title,
  children,
  opened,
  onClose,
  classNames,
}: DialogProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
      className={classNames}
    >
      {children}
    </Modal>
  );
};
