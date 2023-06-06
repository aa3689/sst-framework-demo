import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewCourse from './containers/NewCourse';
import Course from './containers/Course';

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />;
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/courses/new" element={<NewCourse />} />
      <Route path="/courses/:courseName" element={<Course />} />
    </Routes>
  );
}
