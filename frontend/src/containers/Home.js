import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAppContext } from '../lib/contextLib';
import { onError } from '../lib/errorLib';
import { API } from 'aws-amplify';
import { BsPencilSquare } from 'react-icons/bs';
import { LinkContainer } from 'react-router-bootstrap';
import { Spinner } from 'react-bootstrap';
import './Home.css';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const courses = await loadCourses();
        setCourses(courses);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadCourses() {
    return API.get('courses', '/courses');
  }

  function renderCoursesList(courses) {
    //console.log(courses);
    return (
      <>
        <LinkContainer to="/courses/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ms-2 fw-bold">Lisää kurssi</span>
          </ListGroup.Item>
        </LinkContainer>
        {courses.map(({ courseName, courseScope, courseGrade }) => (
          <LinkContainer key={courseName} to={`/courses/${courseName}`}>
            <ListGroup.Item action className="text-nowrap text-truncate">
              <span className="fw-bold">{courseName}</span>
              <br />
              <span>Laajuus: {courseScope}</span>
              <br />
              <span>Arvosana: {courseGrade}</span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Suoritetut kurssit</h1>
        <p className="text-muted">Kirjaudu sisään lisätäksesi kursseja</p>
      </div>
    );
  }

  function renderCourses() {
    return (
      <div className="courses">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Suoritetut kurssit</h2>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Ladataan...</span>
          </Spinner>
        ) : (
          <>
            <ListGroup>{renderCoursesList(courses)}</ListGroup>
            <span className="text-muted">
              Valitse kurssi muokatakseksi sitä
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderCourses() : renderLander()}
    </div>
  );
}
