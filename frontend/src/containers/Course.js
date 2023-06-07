import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import { onError } from '../lib/errorLib';
import Form from 'react-bootstrap/Form';
import LoaderButton from '../components/LoaderButton';
import { Spinner } from 'react-bootstrap';
import './Course.css';

export default function Course() {
  const { courseName } = useParams();
  const nav = useNavigate();
  const [course, setCourse] = useState(null);
  const [courseScope, setCourseScope] = useState('');
  const [courseGrade, setCourseGrade] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCourseLoading, setIsCourseLoading] = useState(true);

  useEffect(() => {
    function loadCourse() {
      return API.get('courses', `/courses/${courseName}`);
    }

    async function onLoad() {
      try {
        setIsCourseLoading(true);
        const course = await loadCourse();
        const { courseScope, courseGrade } = course;

        setCourseScope(courseScope);
        setCourseGrade(courseGrade);
        setCourse(course);
        setIsCourseLoading(false);
      } catch (e) {
        onError(e);
        setIsCourseLoading(false);
      }
    }

    onLoad();
  }, [courseName]);

  function validateForm() {
    return courseName.length > 0;
  }

  function saveCourse(course) {
    return API.put('courses', `/courses/${courseName}`, {
      body: course,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await saveCourse({
        courseScope,
        courseGrade,
      });
      nav('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function deleteCourse() {
    return API.del('courses', `/courses/${courseName}`);
  }

  async function handleDelete(event) {
    event.preventDefault();
    setIsDeleting(true);

    try {
      await deleteCourse();
      nav('/');
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Course">
      {isCourseLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        course && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="courseName">
              Kurssin nimi
              <Form.Control value={courseName} input type="input" disabled />
            </Form.Group>
            <Form.Group controlId="courseScope">
              Kurssin laajuus
              <Form.Control
                value={courseScope}
                as="input"
                onChange={(e) => setCourseScope(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="courseGrade">
              Kurssin arvosana
              <Form.Control
                value={courseGrade}
                as="input"
                onChange={(e) => setCourseGrade(e.target.value)}
              />
            </Form.Group>
            <LoaderButton
              block="true"
              size="sm"
              type="submit"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Tallenna
            </LoaderButton>

            <LoaderButton
              block="true"
              size="sm"
              variant="danger"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Poista
            </LoaderButton>
          </Form>
        )
      )}
    </div>
  );
}
