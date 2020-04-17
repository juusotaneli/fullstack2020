import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  courseName: string;
}
interface ContentProps {
  courses: Array<Course>;
}
interface Course {
  name: string;
  exerciseCount: number;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.courseName}</h1>;
};
const Content: React.FC<ContentProps> = (props) => {
  return <>{props.courses.map(c => <p key={c.name}>{c.name} {c.exerciseCount}</p>)}</>;
};
const Total: React.FC<ContentProps> = (props) => {
  return <> Number of exercises{" "}{props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}</>;
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName = {courseName} />
      <Content courses = {courseParts} />
      <Total courses = {courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));