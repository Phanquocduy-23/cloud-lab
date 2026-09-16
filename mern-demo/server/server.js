require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Gán trực tiếp chuỗi kết nối để chạy ổn định trong Docker Container
const MONGO_URI = "mongodb+srv://phanquocduy:duy235019@cluster0.bgjdza7.mongodb.net/cloud_lab?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Ket noi MongoDB Atlas thanh cong!"))
    .catch((error) => console.log("Loi ket noi MongoDB:", error));

// Câu 36: GET - Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Lỗi server" });
    }
});

// Câu 37: POST - Thêm sinh viên
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: "Lỗi thêm sinh viên" });
    }
});

// Câu 38: PUT - Cập nhật sinh viên
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ error: "Lỗi cập nhật" });
    }
});

// Câu 39: DELETE - Xóa sinh viên
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Đã xóa sinh viên" });
    } catch (error) {
        res.status(400).json({ error: "Lỗi xóa sinh viên" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});