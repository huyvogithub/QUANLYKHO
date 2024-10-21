import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS cho react-datepicker
import './UserLogin.css'; // Import file CSS tùy chỉnh

const initialSchema = {
  title: 'NHẬP XUẤT HÀNG HÓA',
  type: 'object',
  required: ['item', 'action', 'quantity', 'reason', 'signer'],
  properties: {
    item: {
      type: 'string',
      title: 'Chọn mặt hàng',
      enum: [
        'Đầu dò Spo2 (trẻ em)',
        'Đầu dò Spo2 (người lớn)',
        'Đầu dò Spo2 (sơ sinh)',
        'Cáp nối dài Spo2',
        'Cảm biến nhiệt độ BT770',
        'Cảm biến nhiệt độ BT750',
        'Cảm biến nhiệt độ BT500 + 550',
        'Lọc không khí BT500',
        'Che mắt dùng 1 lần BT400',
        'UC BT300',
        'Bánh xe BT500',
        'Pin BT350 (chính hãng)',
        'UC BT350',
        'DOP 300',
        'DOP 350',
        'Nắp cao su UC',
        'Dây DOP BT350',
        'Dây UC 300',
        'Hộp đưng nâng hạ BT500',
        'Jack sự kiện',
        'Đầu dò BT250',
      ],
    },
    action: {
      type: 'string',
      title: 'Nhập/Xuất',
      enum: ['Nhập', 'Xuất'],
    },
    quantity: { type: 'number', title: 'Số lượng' },
    reason: { type: 'string', title: 'Ghi lý do nhập xuất', format: 'textarea' },
    signer: {
      type: 'string',
      title: 'Ký tên',
      enum: ['Thanh Sơn', 'Thanh Huy', 'Phi Hải'],
    },
  },
};

const InventoryForm = () => {
  const [formData, setFormData] = useState({});
  const [submitCount, setSubmitCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State để lưu trữ ngày chọn

  const handleSubmit = async ({ formData }) => {
    try {
      console.log('Dữ liệu gửi đi:', { ...formData, date: selectedDate });

      const response = await axios.post(
        'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-tqlme/endpoint/NHAPXUATHANG',
        { ...formData, date: selectedDate } // Gửi ngày đã chọn
      );

      console.log('Kết quả từ server:', response.data);
      alert('DỮ LIỆU ĐÃ ĐƯỢC LƯU LẠI CẢM ƠN BẠN ĐÃ SỬ DỤNG');
      setFormData({}); // Reset form sau khi submit thành công
      setSelectedDate(new Date()); // Reset ngày đã chọn
      setSubmitCount(submitCount + 1);
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
    }
  };

  return (
    <div className="auth-form-container">
      <Form
        schema={initialSchema}
        validator={validator}
        formData={formData}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="date">Chọn ngày</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy" // Định dạng ngày
            className="datepicker" // Thêm class cho CSS tùy chỉnh
          />
        </div>
        {/* Nút Submit */}
        <button type="submit" className="submit-button">
          Gửi
        </button>
      </Form>
    </div>
  );
};

export default InventoryForm;
