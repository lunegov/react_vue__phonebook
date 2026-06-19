import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePhoneBookRecord } from '../hooks/usePhoneBookRecord';
import PhoneBookForm from '../components/PhoneBookForm';
import type { PhoneBookRecord } from '../types';

export default function PhoneBookEdit() {
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const { record, loading, load, save } = usePhoneBookRecord();

  const id = idParam ? Number(idParam) : null;

  useEffect(() => {
    if (id) {
      load(id);
    }
  }, [id, load]);

  const handleSave = async (data: PhoneBookRecord) => {
    await save(data);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="page">
      <h1>{id ? 'Редактировать контакт' : 'Новый контакт'}</h1>
      {loading && <p>Загрузка...</p>}
      {!loading && (
        <PhoneBookForm record={record} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
}
