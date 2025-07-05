import type { Timestamp } from "firebase/firestore"

export interface Courses {
    id: number
    title: string
    description: string
    duration: string
    category: string
    experience: string
}

export type Students = {
  docID?: string; 
  id: number; 
  name: string;
  email: string;
  course: string;
  courseID: number;
  registeredAt: Timestamp;
  progress: number
};

export const Exercises: Record<number, string[]> = {
  
  "1": [
    "What does HTML stand for?",
    "How do you create a link in HTML?",
    "What is the difference between class and id in CSS?",
    "What is the purpose of the `<head>` tag in HTML?",
    "Write a CSS rule to style all `<p>` elements in red.",
    "How do you include external CSS in an HTML file?",
    "What is the use of the box model in CSS?",
    "How do you declare a JavaScript variable?",
    "What is the difference between == and === in JavaScript?",
    "Create a button that shows an alert when clicked."
  ],
  "2": [
    "What are TypeScript generics?",
    "How do you define a functional component with props in TypeScript?",
    "What is a custom React hook?",
    "How do you share global state using Context API?",
    "Create a hook that toggles a boolean state.",
    "How does TypeScript improve type safety in React?",
    "What is the use of useReducer?",
    "What is the difference between type and interface in TypeScript?",
    "How do you type an event in React (e.g., onChange)?",
    "Create a typed form using React Hook Form."
  ],
  "3": [
    "What is the purpose of Pandas in Python?",
    "How do you read a CSV file in Pandas?",
    "What is the difference between `loc` and `iloc`?",
    "How do you handle missing data in Pandas?",
    "How do you group data in a DataFrame?",
    "Create a bar plot using Matplotlib.",
    "How do you merge two DataFrames?",
    "What is data normalization?",
    "How do you sort a DataFrame by a column?",
    "Write a function to visualize a correlation matrix."
  ],
  "4": [
    "What are the key principles of UX design?",
    "What is a wireframe?",
    "What tools are commonly used for UI design?",
    "Explain the concept of usability testing.",
    "What is the difference between low-fidelity and high-fidelity prototypes?",
    "How do you conduct a heuristic evaluation?",
    "What is user-centered design?",
    "Define accessibility in UI/UX.",
    "How do you create a persona?",
    "What is an affinity diagram?"
  ],
  "5": [
    "What does MERN stand for?",
    "How do you connect React with a Node backend?",
    "What is JSX?",
    "Explain the role of Express.js in a MERN app.",
    "What is the purpose of MongoDB?",
    "Create a REST API with Express and MongoDB.",
    "How do you fetch data in React using Axios?",
    "What is the difference between useEffect and useState?",
    "How do you deploy a MERN app?",
    "Write a schema using Mongoose."
  ],
  "6": [
    "What is supervised learning?",
    "Explain the difference between classification and regression.",
    "How do you split a dataset for training and testing?",
    "What is overfitting?",
    "How do you evaluate a model’s performance?",
    "What is scikit-learn used for?",
    "Implement a linear regression model in Python.",
    "What is a confusion matrix?",
    "How do you normalize data for ML?",
    "Explain cross-validation."
  ],
  "7": [
    "What is CI/CD?",
    "What is Docker and why is it used?",
    "Create a simple Dockerfile.",
    "What are Docker volumes?",
    "Explain continuous integration in a DevOps pipeline.",
    "How do you deploy a container to AWS?",
    "What is the use of GitHub Actions?",
    "What is container orchestration?",
    "Explain the role of Jenkins in CI/CD.",
    "What are some best practices in DevOps?"
  ],
  "8": [
    "What is the difference between Flexbox and Grid?",
    "How do you center content using Flexbox?",
    "Create a responsive grid with CSS Grid.",
    "What is a media query?",
    "How do you hide an element on small screens?",
    "Create a responsive navbar layout.",
    "What is mobile-first design?",
    "How do you use auto-fill and auto-fit in Grid?",
    "How can you test responsive design?",
    "What is the rem unit in CSS?"
  ],
  "9": [
    "What is a primary key in SQL?",
    "How do you perform a LEFT JOIN?",
    "Create a table with three columns in SQL.",
    "What is normalization in databases?",
    "What is a foreign key?",
    "Write a query to retrieve data using GROUP BY.",
    "How do you update a row in SQL?",
    "What is the difference between DELETE and TRUNCATE?",
    "How do you design a one-to-many relationship?",
    "What is an index in a database?"
  ],
  "10": [
    "What is a threat model?",
    "How does encryption work?",
    "What is the difference between symmetric and asymmetric encryption?",
    "What is a firewall?",
    "Name 3 common types of cyberattacks.",
    "How do you protect against SQL injection?",
    "What is multi-factor authentication?",
    "What is phishing?",
    "Define penetration testing.",
    "What are some best practices for password security?"
  ]
}
