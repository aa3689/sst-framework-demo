import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { onError } from '../lib/errorLib';
import { API } from 'aws-amplify';
import './NewCourse.css';

export default function NewCourse() {
  const nav = useNavigate();
  const [courseName, setcourseName] = useState('');
  const [courseScope, setcourseScope] = useState('');
  const [courseGrade, setcourseGrade] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return courseName.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createCourse({ courseName, courseScope, courseGrade });
      nav('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createCourse(course) {
    console.log('course', course);
    return API.post('courses', '/courses', {
      body: course,
    });
  }

  return (
    <div className="NewCourse">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="courseName">
          Kurssin nimi
          <Form.Control
            value={courseName}
            as="input"
            onChange={(e) => setcourseName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="courseScope">
          Kurssin laajuus
          <Form.Control
            value={courseScope}
            as="input"
            onChange={(e) => setcourseScope(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="courseGrade">
          Kurssin arvosana
          <Form.Control
            value={courseGrade}
            as="input"
            onChange={(e) => setcourseGrade(e.target.value)}
          />
        </Form.Group>

        <LoaderButton
          block
          type="submit"
          size="sm"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Lisää
        </LoaderButton>
      </Form>
    </div>
  );
}
