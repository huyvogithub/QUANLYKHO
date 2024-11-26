import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import thư viện xuất Excel
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

  const exportToExcel = () => {
    const now = new Date();
    const fileName = `SOLUONGKHO_${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}.xlsx`;

    // Chuyển đổi dữ liệu thành định dạng mảng 2D
    const excelData = [
      ['STT', 'Mặt hàng', 'Số lượng'], // Tiêu đề cột
      ...userData.reduce((acc, item) => {
        const quantities = Object.entries(item).filter(([key]) => key !== '_id');
        quantities.forEach(([key, value]) => {
          acc.push([acc.length + 1, key, value]); // Thêm vào dòng mới
        });
        return acc;
      }, [])
    ];

    // Tạo workbook và sheet
    const worksheet = XLSX.utils.aoa_to_sheet(excelData); // Chuyển mảng 2D thành sheet
    const workbook = XLSX.utils.book_new(); // Tạo workbook mới
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DanhSach'); // Thêm sheet vào workbook

    // Ghi file Excel
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="container">
      <h2 className="title">DANH SÁCH NHẬP XUẤT HÀNG HÓA</h2>
      <div className="button-container">
        <button onClick={handleRefresh} disabled={loading} className="refresh-button">
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
        <button onClick={exportToExcel} className="export-button">
          Xuất Excel
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
              const quantities = Object.entries(item).filter(([key]) => key !== '_id');
              quantities.forEach(([key, value]) => {
                acc.push({
                  stt: acc.length + 1,
                  name: key,
                  quantity: value
                });
              });
              return acc;
            }, []).map(({ stt, name, quantity }) => (
              <tr key={name}>
                <td>{stt}</td>
                <td>{name}</td>
                <td>{quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
