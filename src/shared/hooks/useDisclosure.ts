import { useState } from "react";

const useDisclosure = (initialState = false) => {
  const [isOpen, setOpen] = useState<boolean>(initialState);

  const onOpen = () => setOpen(true);

  const onToogle = () => setOpen((prev) => !prev);

  const onClose = () => setOpen(false);

  return {
    isOpen,
    onOpen,
    onToogle,
    onClose,
  };
};

export default useDisclosure;
