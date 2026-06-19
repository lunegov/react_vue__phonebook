import { useEffect, useState } from 'react';
import type { PhoneBookRecord, PhoneBookFormData } from '../types';
import './PhoneBookForm.css';

interface Props {
  record: PhoneBookRecord | null;
  onSave: (data: PhoneBookRecord) => void;
  onCancel: () => void;
}

export default function PhoneBookForm({ record, onSave, onCancel }: Props) {
  const [form, setForm] = useState<PhoneBookFormData>({
    phone: '',
    name: '',
    surname: '',
    secondName: '',
    email: '',
    description: '',
  });

  useEffect(() => {
    if (record) {
      setForm({
        phone: record.phone,
        name: record.name,
        surname: record.surname || '',
        secondName: record.secondName || '',
        email: record.email || '',
        description: record.description || '',
      });
    }
  }, [record]);

  const isFormEnable = form.phone.trim().length > 0 && form.name.trim().length > 0;

  const handleChange = (field: keyof PhoneBookFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const maskPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+]/g, '');
    setForm((prev) => ({ ...prev, phone: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: PhoneBookRecord = { ...form };
    if (record?.id) payload.id = record.id;
    onSave(payload);
  };

  return (
    <form className="phone-form" onSubmit={submit}>
      <div className="field">
        <label>Телефон *</label>
        <input value={form.phone} required onChange={maskPhone} />
      </div>
      <div className="field">
        <label>Имя *</label>
        <input value={form.name} required onChange={handleChange('name')} />
      </div>
      <div className="field">
        <label>Фамилия</label>
        <input value={form.surname} onChange={handleChange('surname')} />
      </div>
      <div className="field">
        <label>Отчество</label>
        <input value={form.secondName} onChange={handleChange('secondName')} />
      </div>
      <div className="field">
        <label>Email</label>
        <input value={form.email} type="email" onChange={handleChange('email')} />
      </div>
      <div className="field">
        <label>Описание</label>
        <textarea value={form.description} rows={3} onChange={handleChange('description')} />
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!isFormEnable} className="btn">{record?.id ? 'Сохранить' : 'Создать'}</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
}
