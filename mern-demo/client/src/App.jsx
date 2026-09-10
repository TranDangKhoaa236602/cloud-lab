import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Lấy danh sách sinh viên
  const getStudents = async () => {
    try {
      const response = await fetch("/api/students");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sinh viên:", error);
    }
  };

  // Thêm sinh viên
  const addStudent = async () => {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          studentId: studentId,
          name: name,
          email: email
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      // Xóa dữ liệu trong form
      setStudentId("");
      setName("");
      setEmail("");

      // Tải lại danh sách sinh viên
      await getStudents();
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên:", error);
    }
  };

  // Gọi API khi mở trang
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Quản lý sinh viên</h1>

      <h2>Thêm sinh viên</h2>

      <div>
        <input
          type="text"
          placeholder="MSSV"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br />

      <button onClick={addStudent}>
        Thêm sinh viên
      </button>

      <hr />

      <h2>Danh sách sinh viên</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;