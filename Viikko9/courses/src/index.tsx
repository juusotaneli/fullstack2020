import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  courseName: string;
}
interface ContentProps {
  courses: Array<CoursePart>;
}
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartBase2 extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBase2 {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase2 {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartBase2 {
  name: "How to become best TypeScript programmer in the universe";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;


// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "How to become best TypeScript programmer in the universe",
    exerciseCount: 14,
    description: "yolo"
  }
];

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.courseName}</h1>;
};
const Content: React.FC<ContentProps> = (props) => {
  return (
    <>
      {props.courses.map(c => (
        <Part key={c.name} course={c} />


      ))}


    </>
  );

};
const Total: React.FC<ContentProps> = (props) => {
  return <> Number of exercises{" "}{props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}</>;
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Part = ({ course }: { course: CoursePart }) => {

  switch (course.name) {
    case "Fundamentals":
      return (
        <div>
          <b>{course.name}</b>
          <p>description: {course.description} </p>
          <p>exercises: {course.exerciseCount}</p>
        </div>
      );
      case "How to become best TypeScript programmer in the universe":
      return (
        <div>
          <b>{course.name}</b>
          <p>description: {course.description} </p>
          <p>exercises: {course.exerciseCount}</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <b>{course.name}</b>
          <p>project count: {course.groupProjectCount} </p>
          <p>exercises: {course.exerciseCount}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <b>{course.name}</b>
          <p>description: {course.description}</p>
          <p>submission link: {course.exerciseSubmissionLink}</p>
          <p>exercises: {course.exerciseCount}</p>
        </div>
      );
    default:
      return null;
  }
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));