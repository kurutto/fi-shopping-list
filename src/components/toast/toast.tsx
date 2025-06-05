import Paragraph from "../ui/paragraph";
import Modal from "../ui/modal";
interface DeleteConfirmProps {
  isOpen: boolean;
  handleOpen: () => void;
  toastText: string;
}
const Toast = ({ isOpen, handleOpen, toastText }: DeleteConfirmProps) => {
  return (
    <Modal
      isOpen={isOpen}
      handleOpen={handleOpen}
      boxW="w-md"
      className="text-center"
      closeButton={false}
    >
      <Paragraph>{toastText}</Paragraph>
    </Modal>
  );
};

export default Toast;
