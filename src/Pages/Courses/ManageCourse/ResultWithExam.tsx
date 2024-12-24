import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

interface Student {
  studentId: string;
  fullName: string;
  email: string;
  hasSubmitted: boolean;
  submissionScore: number | null;
  submittedAt: string | null;
};


const StudentTable = () => {
  const [students, setStudents] = useState<Student[]| undefined>(
    [
      {
        "studentId": "26170aa8-b947-47e5-9f7b-3823780fd224",
        "fullName": "Pham Tuan",
        "email": "tuan.pham@example.com",
        "hasSubmitted": false,
        "submissionScore": null,
        "submittedAt": null
      },
      {
        "studentId": "a518d14b-3a8c-4e07-b164-2e00eb781d12",
        "fullName": "Trần Vũ Quang Trường",
        "email": "trutruong2503@gmail.com",
        "hasSubmitted": false,
        "submissionScore": null,
        "submittedAt": null
      },
      {
        "studentId": "b1ed946f-7fcd-11ef-bd20-f29452305c34",
        "fullName": "Trần Vũ Quang Trường",
        "email": "quangtruong123@gmail.com",
        "hasSubmitted": true,
        "submissionScore": 0,
        "submittedAt": "2024-12-24T09:58:22+00:00"
      },
      {
        "studentId": "e4ce441e-d292-46db-b1d5-c3e581b41c8e",
        "fullName": "Nguyen Minh",
        "email": "minh.nguyen@example.com",
        "hasSubmitted": false,
        "submissionScore": null,
        "submittedAt": null
      },
      {
        "studentId": "f5f09406-7b24-4320-9edc-e78df60a11c4",
        "fullName": "Tran Vu Quang Truong",
        "email": "quangtruong1234@gmail.com",
        "hasSubmitted": false,
        "submissionScore": null,
        "submittedAt": null
      }
    ]
  )
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Thông tin</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Điểm</th>
            <th>Thời gian nộp</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
  {students !== undefined &&
    students.map((student, index) => (
      <tr key={student.studentId}>
        <td>{index + 1}</td>
        <td>{student.fullName}</td>
        <td>{student.email}</td>
        <td>{student.submissionScore !== null ? student.submissionScore : 'N/A'}</td>
        <td>
          {student.submittedAt
            ? new Date(student.submittedAt).toLocaleString()
            : 'N/A'}
        </td>
        <td
          style={{
            color: student.hasSubmitted ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {student.hasSubmitted ? 'Hoàn thành' : 'Chưa hoàn thành'}
        </td>
      </tr>
    ))}
</tbody>

      </Table>
    </div>
  );
};

export default StudentTable;
