import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PhoneBookList from './pages/PhoneBookList';
import PhoneBookEdit from './pages/PhoneBookEdit';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhoneBookList />} />
          <Route path="/create" element={<PhoneBookEdit />} />
          <Route path="/edit/:id" element={<PhoneBookEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
