import { Modal } from "@mantine/core";

export interface DialogProps {
  title: string;
  children: React.ReactNode;
  opened: boolean;
  onClose: () => void;
}

export const Dialog = ({ title, children, opened, onClose }: DialogProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      {children}
    </Modal>
  );
};
