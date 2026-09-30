import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.log("Lỗi tải dữ liệu", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({ studentId: '', name: '', email: '' }); 
      fetchStudents(); 
    } catch (error) {
      console.log("Lỗi thêm sinh viên", error);
    }
  };

  // Câu 78: Hàm Xóa sinh viên
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' });
      fetchStudents();
    } catch (error) {
      console.log("Lỗi xóa", error);
    }
  };

  // Câu 77: Hàm Cập nhật sinh viên
  const handleUpdate = async (id) => {
    const newName = prompt("Nhập tên mới cho sinh viên này:");
    if (!newName) return;
    try {
      await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      });
      fetchStudents();
    } catch (error) {
      console.log("Lỗi cập nhật", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Quản lý Sinh Viên V2.0</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="MSSV" value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})} required style={{ marginRight: '10px' }} />
        <input type="text" placeholder="Họ tên" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ marginRight: '10px' }} />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required style={{ marginRight: '10px' }} />
        <button type="submit">Thêm Sinh Viên</button>
      </form>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr><th>MSSV</th><th>Họ tên</th><th>Email</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.studentId}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => handleUpdate(s._id)} style={{ marginRight: '5px' }}>Sửa</button>
                <button onClick={() => handleDelete(s._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;