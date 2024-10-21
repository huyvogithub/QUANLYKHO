import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; // Import CSS tùy chỉnh

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="container">
      <h2 className="title">DANH SÁCH NHẬP XUẤT HÀNG HÓA</h2>
      <div className="button-container">
        <button onClick={handleRefresh} disabled={loading} className="refresh-button">
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
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
          {userData.map((item, index) => (
            <tr key={item._id.$oid}>
              <td>{index + 1}</td>
              <td>{item.item}</td>
              <td>{item.action}</td>
              <td>{item.quantity.$numberDouble}</td>
              <td>{item.reason}</td>
              <td>{item.signer}</td>
              <td>{new Date(item.date).toLocaleString('vi-VN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
