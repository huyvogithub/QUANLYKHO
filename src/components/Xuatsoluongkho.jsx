import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Xuatsoluongkho.css'; // Import CSS tùy chỉnh

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-tqlme/endpoint/LAYDULIEUSOLUONG'
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
      <div className="data-table-container"> {/* Khung cuộn ngang */}
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mặt hàng</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {userData.reduce((acc, item) => {
              // Lấy tất cả các mặt hàng trừ _id
              const quantities = Object.entries(item).filter(([key]) => key !== '_id');
              // Lưu số lượng mặt hàng cho mỗi item
              const itemCount = quantities.length;

              quantities.forEach(([key, value], index) => {
                acc.push({
                  stt: acc.length + 1, // Số thứ tự
                  name: key,           // Tên mặt hàng
                  quantity: value      // Số lượng
                });
              });

              return acc;
            }, []).map(({ stt, name, quantity }) => (
              <tr key={name}>
                <td>{stt}</td>       {/* Hiển thị số thứ tự */}
                <td>{name}</td>      {/* Hiển thị tên mặt hàng */}
                <td>{quantity}</td>  {/* Hiển thị số lượng */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
