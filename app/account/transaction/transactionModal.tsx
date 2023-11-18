import React, { ReactNode } from "react";

interface TransactionModalProps {
  children: ReactNode;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  children,
  showModal,
  setShowModal,
}) => {
  if (!showModal) return null;

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex"
      onClick={closeModal}
    >
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div className="flex justify-between items-center pb-3">
          <p className="text-2xl font-bold">Add Transaction</p>
          <div
            className="cursor-pointer z-50"
            onClick={() => setShowModal(false)}
          >
            <span className="text-3xl text-black">×</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default TransactionModal;
