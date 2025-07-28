import { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";

interface CalendlyPopupProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CalendlyPopup = ({ isOpen, setIsOpen }: CalendlyPopupProps) => {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.getElementById("root"));
  }, []);

  if (!rootElement) return null;

  return (
    <PopupModal
      url="https://calendly.com/fahadkhanhere49/30min"
      onModalClose={() => setIsOpen(false)}
      open={isOpen}
      rootElement={rootElement}
    />
  );
};

export default CalendlyPopup;
