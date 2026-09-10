const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./models/Student");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Kết nối MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// API kiểm tra Backend
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Backend is running"
  });
});

// Câu 36: API GET danh sách sinh viên
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách sinh viên",
      error: error.message
    });
  }
});

// Câu 37: API POST thêm sinh viên
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm sinh viên",
      error: error.message
    });
  }
});
// Câu 38: API PUT cập nhật sinh viên
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Không tìm thấy sinh viên"
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật sinh viên",
      error: error.message
    });
  }
});
// Câu 39: API DELETE xóa sinh viên
app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Không tìm thấy sinh viên"
      });
    }

    res.json({
      message: "Xóa sinh viên thành công",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa sinh viên",
      error: error.message
    });
  }
});