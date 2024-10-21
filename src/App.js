// App.js
import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import UserList from './components/UserList';
import EmbeddedDashboard from './components/EmbeddedDashboard';
import SmallFrame from './components/SmallFrame';
import Gauge from './components/Gauge_edit';
import Search from './components/Search';
import ThreeJSComponent from './components/ThreeJSComponent';
import MyImage from './components/logotdtu.png';
import TETS from './components/tets';
//import GET from './components/GET';
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('form'); // Để xác định trang hiện tại

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // Đóng menu khi chọn một trang
  };
  return (
    <div className="App">

      <header>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="menu-line" />
          <div className="menu-line" />
          <div className="menu-line" />
          <div className="menu-line" />
          <div className="menu-line" />
        </div>
        <h1 className="app-title">QUẢN LÝ KHO HÀNG CỦA CASTVN</h1>
        <div className="image-container">
          <img src={MyImage} alt="Avatar" className="avatar-image" />
        </div>
      </header>
      <main>
        <div className={`form-container ${currentPage === 'form' ? 'visible' : 'hidden'}`}>
          <Form />


        </div>
        <div className={`user-list-container ${currentPage === 'userList' ? 'visible' : 'hidden'}`}>
        <UserList />
        </div>
        <div className={`chartmongo-container ${currentPage === 'userList2' ? 'visible' : 'hidden'}`}>
        <Form />
        </div>

        {currentPage === 'PAGE4' && (
          <div className="user-list-container">
           <Form />
          </div>
        )
        }
        {currentPage === 'CHUNG' && (
          <div className="user-list-container">

<Form />
          </div>
        )
        }
      </main>
      <aside className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => handleMenuClick('form')}>NHẬP THÔNG TIN XUẤT NHẬP KHO</li>
          <li onClick={() => handleMenuClick('userList')}>LỊCH SỬ NHẬP XUẤT</li>
          <li onClick={() => handleMenuClick('userList2')}>CHƯA LÀM KỊP</li> {/* Thêm mục mới */}
          <li onClick={() => handleMenuClick('PAGE4')}>CHƯA LÀM KỊP</li>
          <li onClick={() => handleMenuClick('CHUNG')}>CHƯA LÀM KỊP</li>
        </ul>
      </aside>
    </div>
  );
}

export default App;
