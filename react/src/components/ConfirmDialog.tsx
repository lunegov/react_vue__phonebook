import './ConfirmDialog.css';

interface Props {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ visible, message, onConfirm, onCancel }: Props) {
  if (!visible) return null;

  return (
    <div className="overlay" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="btn btn-danger" onClick={onConfirm}>Да</button>
          <button className="btn btn-secondary" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
}
