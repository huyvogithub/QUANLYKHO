import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; // Import CSS tùy chỉnh

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState(''); // Trạng thái cho loại lọc (nhập/xuất)
  const [searchTerm, setSearchTerm] = useState(''); // Trạng thái cho tên mặt hàng
  const [suggestions, setSuggestions] = useState([]); // Trạng thái cho gợi ý

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-tqlme/endpoint/LICHSUNHAPXUAT'
      );
      setUserData(response.data);
      setError(null);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  const handleFilter = () => {
    // Có thể tùy chỉnh thêm logic lọc ở đây nếu cần
  };

  const filteredData = userData.filter(item => {
    // Lọc theo tên mặt hàng
    const matchesSearchTerm = item.item.toLowerCase().includes(searchTerm.toLowerCase());

    // Lọc theo loại nhập/xuất nếu có
    const matchesFilterType = filterType ? item.action === filterType : true;

    return matchesSearchTerm && matchesFilterType;
  });

  // Tạo gợi ý dựa trên tên mặt hàng
  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = userData
        .map(item => item.item)
        .filter(itemName => itemName.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]); // Ẩn gợi ý sau khi chọn
  };

  const handleResetFilters = () => {
    setFilterType('');
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="container">
      <h2 className="title">DANH SÁCH NHẬP XUẤT HÀNG HÓA</h2>
      <div className="button-container">
        <button onClick={handleRefresh} disabled={loading} className="refresh-button">
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
        <button onClick={handleResetFilters} className="reset-button">Bỏ lọc</button> {/* Nút Bỏ lọc */}
      </div>
      <div className="filter-container">
        <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
          <option value="">Tất cả</option>
          <option value="Nhập">Nhập</option>
          <option value="Xuất">Xuất</option>
        </select>
        <input 
          type="text" 
          placeholder="Tìm kiếm theo tên mặt hàng" 
          value={searchTerm} 
          onChange={handleSearchTermChange} 
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleFilter} className="filter-button">Lọc</button>
      </div>
      {error && <p className="error-text">{error}</p>}
      <div className="data-table-container"> {/* Khung cuộn ngang */}
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mặt hàng</th>
              <th>Hành động</th>
              <th>Số lượng</th>
              <th>Lý do</th>
              <th>Người ký</th>
              <th>Ngày</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item._id.$oid}>
                <td>{index + 1}</td>
                <td>{item.item}</td>
                <td>{item.action}</td>
                <td>{item.quantity}</td>
                <td>{item.reason}</td>
                <td>{item.signer}</td>
                <td>{new Date(item.date).toLocaleString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
