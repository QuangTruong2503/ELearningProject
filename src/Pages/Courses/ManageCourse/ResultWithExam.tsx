import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import { fetchGetStudentsStatus } from '../../../API/examsAPI';

interface Student {
  studentId: string;
  fullName: string;
  email: string;
  hasSubmitted: boolean;
  submissionScore: number | null;
  submittedAt: string | null;
  submissionID: string | null;
};

const StudentTable = () => {
  const {examID} = useParams();
  const [students, setStudents] = useState<Student[]>([]);

  const [filter, setFilter] = useState<'all' | 'completed' | 'notCompleted'>('all');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as 'all' | 'completed' | 'notCompleted');
  };

  const filteredStudents = students.filter(student => {
    if (filter === 'completed') return student.hasSubmitted;
    if (filter === 'notCompleted') return !student.hasSubmitted;
    return true; // 'all'
  });
  useEffect(() =>{
    const handleFetchData = async () =>{
      const result = await fetchGetStudentsStatus(examID)
      if(result !== null){
        setStudents(result)
      }
    }
    handleFetchData();
  },[examID])
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Thông tin bài kiểm tra</h2>

      {/* Filter Dropdown */}
      <div className="mb-3 text-center d-flex justify-content-end align-items-center">
        <label htmlFor="filterSelect" className="me-2">Lọc theo trạng thái:</label>
        <select
          id="filterSelect"
          className="form-select d-inline w-auto"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">Tất cả</option>
          <option value="completed">Hoàn thành</option>
          <option value="notCompleted">Chưa hoàn thành</option>
        </select>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Điểm</th>
            <th>Thời gian nộp</th>
            <th>Trạng thái</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.studentId}>
              <td>{index + 1}</td>
              <td>{student.fullName}</td>
              <td >{student.email}</td>
              <td>{student.submissionScore !== null ? student.submissionScore : 'N/A'}</td>
              <td className='w-auto'>
                {student.submittedAt
                  ? new Date(student.submittedAt).toLocaleString()
                  : 'N/A'}
              </td>
              <td
                style={{
                  color: student.hasSubmitted ? 'green' : 'red',
                }}
              >
                {student.hasSubmitted ? 'Hoàn thành' : 'Trống'}
              </td>
              <td className='w-auto'>
                {student.hasSubmitted ? (<NavLink to={`/exam/${examID}/result/${student.submissionID}`} className='btn btn-outline-primary fs-6'>Xem</NavLink>) : (<></>)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentTable;
