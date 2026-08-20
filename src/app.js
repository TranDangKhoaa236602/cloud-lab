const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Dữ liệu giả lập danh sách sinh viên
let students = [
  { id: "236602", name: "Tran Dang Khoa", class: "DH23TIN08" }
];

// 1. GET: Lấy danh sách sinh viên
app.get('/api/students', (req, res) => {
  res.status(200).json(students);
});

// 2. POST: Thêm mới sinh viên
app.post('/api/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json({ message: "Thêm thành công", student: newStudent });
});

// 3. DELETE: Xóa sinh viên theo ID
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  students = students.filter(s => s.id !== id);
  res.status(200).json({ message: `Đã xóa sinh viên có ID: ${id}` });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Express REST API running on port ${PORT}`));