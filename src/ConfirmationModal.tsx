import React from 'react'

type confirmModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<confirmModalProps> = ({message, onConfirm, onCancel}) => {
  return (
    <div>
      <p>{ message }</p>
      <div>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  )
}

export default ConfirmationModal