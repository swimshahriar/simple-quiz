'use client';

import React, { useEffect, useRef } from 'react';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
};

const Modal = ({ title, children, onClose }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <form
          method="dialog"
          onSubmit={() => {
            setTimeout(onClose);
          }}
        >
          <h3 className="font-bold text-lg pt-2 pb-4">{title}</h3>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <div>{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
