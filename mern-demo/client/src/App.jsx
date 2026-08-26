import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  // Câu 47: Lấy dữ liệu danh sách sinh viên bằng fetch()
  const fetchStudents = async () => {
    try {
      const res = await fetch('https://ideal-happiness-x5x65qxxwq6jhprxp-5000.app.github.dev/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.log("Lỗi tải dữ liệu", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Câu 49: Gửi dữ liệu sinh viên mới lên Backend POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://ideal-happiness-x5x65qxxwq6jhprxp-5000.app.github.dev/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({ studentId: '', name: '', email: '' }); // Xóa trắng form
      fetchStudents(); // Tải lại danh sách
    } catch (error) {
      console.log("Lỗi thêm sinh viên", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Quản lý Sinh Viên</h2>
      
      {/* Câu 48: Form nhập thông tin */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="MSSV" value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})} required style={{ marginRight: '10px' }} />
        <input type="text" placeholder="Họ tên" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ marginRight: '10px' }} />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required style={{ marginRight: '10px' }} />
        <button type="submit">Thêm Sinh Viên</button>
      </form>

      {/* Giao diện bảng danh sách Câu 47 */}
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr><th>MSSV</th><th>Họ tên</th><th>Email</th></tr>
        </thead>
        <tbody>
          {students.map((s, index) => (
            <tr key={index}>
              <td>{s.studentId}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;