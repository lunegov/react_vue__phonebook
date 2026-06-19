import type { PhoneBookRecord } from '../types';
import './ViewContactModal.css';

interface Props {
  visible: boolean;
  record: PhoneBookRecord | null;
  onClose: () => void;
}

export default function ViewContactModal({ visible, record, onClose }: Props) {
  if (!visible || !record) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h2>Контакт</h2>
        <div className="fields">
          <div className="field">
            <span className="field-label">ID</span>
            <span className="field-value">{record.id}</span>
          </div>
          <div className="field">
            <span className="field-label">Телефон</span>
            <span className="field-value">{record.phone}</span>
          </div>
          <div className="field">
            <span className="field-label">Имя</span>
            <span className="field-value">{record.name}</span>
          </div>
          {record.surname && (
            <div className="field">
              <span className="field-label">Фамилия</span>
              <span className="field-value">{record.surname}</span>
            </div>
          )}
          {record.secondName && (
            <div className="field">
              <span className="field-label">Отчество</span>
              <span className="field-value">{record.secondName}</span>
            </div>
          )}
          {record.email && (
            <div className="field">
              <span className="field-label">Email</span>
              <span className="field-value">{record.email}</span>
            </div>
          )}
          {record.description && (
            <div className="field">
              <span className="field-label">Описание</span>
              <span className="field-value">{record.description}</span>
            </div>
          )}
        </div>
        <div className="dialog-actions">
          <button className="btn btn-secondary" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}
