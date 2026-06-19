import { useEffect, useRef, useState } from 'react';
import type { PhoneBookRecord } from '../types';
import './PhoneBookTable.css';

interface Props {
  records: PhoneBookRecord[];
  loading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (record: PhoneBookRecord) => void;
}

export default function PhoneBookTable({ records, loading, onEdit, onDelete, onView }: Props) {
  const [openId, setOpenId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  if (loading || !records.length) return null;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Телефон</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="contact-row" onClick={() => onView(r)}>
              <td>{r.id}</td>
              <td>{r.phone}</td>
              <td>{r.name}</td>
              <td>{r.surname}</td>
              <td>{r.email}</td>
              <td className="actions-cell" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown" data-id={r.id}>
                  <button className="dots-btn" onClick={() => setOpenId(openId === r.id ? null : r.id!)}>⋮</button>
                  {openId === r.id && (
                    <div className="dropdown-menu" ref={menuRef}>
                      <button className="dropdown-item dropdown-item_edit" onClick={() => onEdit(r.id!)}>Редактировать</button>
                      <button className="dropdown-item dropdown-item_remove" onClick={() => onDelete(r.id!)}>Удалить</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
