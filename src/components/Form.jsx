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
        'ADAPTER 18V',  
'ADAPTER 18V CHINA',  
'APDATER 410',  
'BAO ĐO HUYẾT ÁP',  
'BAO TRÙM ĐÈN BT400',  
'BÁNH XE 550',  
'BÓNG ĐÈN 410A',  
'BÓNG ĐÈN 410F',  
'BỘ BẢN LỀ TRƯỚC BT500',  
'BỘ BẢN LỀN SAU BT500',  
'BỘ CHÌA KHÓA HAPPY CART',  
'BUỒNG ĐỐT BT500',  
'CB NHIỆT ĐỘ DA',  
'CB NHIỆT ĐỘ DA 770',  
'CB SPO2 NGUOI LON',  
'CB SPO2 NGUOI LON (CHINA)',  
'CB SPO2 SO SINH',  
'CB SPO2 SO SINH (CHINA)',  
'CB SPO2 SƠ SINH ( DÙNG 1 LẦN )',  
'CB SPO2 TRE EM',  
'CB SPO2 TRE EM (CHINA)',  
'CÁP NỐI DÀI SPO2',  
'CÁP NỐI DÀI SPO2 ( CHINA )',  
'CẢM BIẾN CỬA BT500',  
'CẢM BIẾN SPO2 DÙNG 1 LẦN 3-40KG',  
'CONTROL BOX BT500',  
'CỌC TRUYỀN DỊCH BT500',  
'CỌC TRUYỀN DỊCH BT550',  
'CPU 350L',  
'DÂY CÁP IPB BT770',  
'DÂY DAI',  
'DÂY DẪN KHÍ ETCO2 BT750"SIDE STREAM"',  
'DÂY DẪN KHÍ ETCO2 BT770"SIDE STREAM"',  
'DÂY DO ECG 5ĐC (CHINA)',  
'DÂY DOP 300',  
'DÂY DOP 350',  
'DÂY NGUỒN',  
'DÂY NỐI DÀI HUYẾT ÁP',  
'DÂY UC 300',  
'DÂY UC 350',  
'DOP 300',  
'DOP 350',  
'ĐÈN EXTRA LAMP',  
'ĐÈN THĂM KHÁM BT 550',  
'GEL SIÊU ÂM (BIG)',  
'GEL SIÊU ÂM (SMALL)',  
'GIÁ ĐỰNG ĐỒ BT500',  
'GIÁ ĐỰNG ĐỒ BT550',  
'GIÁ TREO ĐẦU DÒ (CẶP)',  
'JACK SỰ KIỆN',  
'KÍNH LÚP BT 410',  
'KIT IPB',  
'KHAY NƯỚC BT500',  
'LOA MÁY 300 350',  
'MAIN BT710',  
'MAIN ĐÈN BT400',  
'MAINBOARD 300',  
'MAINBOARD 350L',  
'MÁY IN 300',  
'MÁY IN 770',  
'MIẾNG DÁN MẮT BT400',  
'MODULE CẢM BIẾN BT500',  
'MODULE IPB',  
'MODULE TẠO ẨM BT500',  
'NẮP CAO SU UC',  
'NẮP PIN BT200L',  
'PIN 350',  
'PIN 410',  
'TẮM LỌC KK BT500',  
'TẤM IV PALET 500',  
'TẤM IV PALET 550',  
'THANH IN NHIỆT 300',  
'THANH IN NHIỆT 350L',  
'UC 300',  
'UC 350'
        
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
