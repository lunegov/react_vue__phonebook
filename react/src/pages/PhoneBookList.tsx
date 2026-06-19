import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhoneBook } from '../hooks/usePhoneBook';
import PhoneBookTable from '../components/PhoneBookTable';
import ConfirmDialog from '../components/ConfirmDialog';
import ViewContactModal from '../components/ViewContactModal';
import type { PhoneBookRecord } from '../types';
import './PhoneBookList.css';

export default function PhoneBookList() {
  const { records, loading, loadAll, remove } = usePhoneBook();
  const navigate = useNavigate();

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewRecord, setViewRecord] = useState<PhoneBookRecord | null>(null);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const confirmDelete = useCallback((id: number) => {
    setDeleteTargetId(id);
    setShowConfirm(true);
  }, []);

  const executeDelete = useCallback(async () => {
    if (deleteTargetId !== null) {
      await remove(deleteTargetId);
    }
    setShowConfirm(false);
    setDeleteTargetId(null);
  }, [deleteTargetId, remove]);

  const openView = useCallback((record: PhoneBookRecord) => {
    setViewRecord(record);
    setShowViewModal(true);
  }, []);

  const closeView = useCallback(() => {
    setShowViewModal(false);
    setViewRecord(null);
  }, []);

  return (
    <div className="page">
      <div className="header">
        <h1>Контакты</h1>
        <button className="add-btn" onClick={() => navigate('/create')} title="Новая запись">+</button>
      </div>
      {loading && <p>Загрузка...</p>}
      {!loading && records.length === 0 && <p>Записи не найдены.</p>}
      {!loading && records.length > 0 && (
        <PhoneBookTable
          records={records}
          loading={loading}
          onEdit={(id) => navigate(`/edit/${id}`)}
          onDelete={confirmDelete}
          onView={openView}
        />
      )}
      <ConfirmDialog
        visible={showConfirm}
        message="Удалить эту запись?"
        onConfirm={executeDelete}
        onCancel={() => setShowConfirm(false)}
      />
      <ViewContactModal
        visible={showViewModal}
        record={viewRecord}
        onClose={closeView}
      />
    </div>
  );
}
