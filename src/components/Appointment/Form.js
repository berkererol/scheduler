import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button"

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer}
         />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}








































// import React, { useState } from 'react';
// import Button from '../Button';
// import InterviewerList from '../InterviewerList';

// export default function Form(props) {
//   const { interviewers, onCancel, onSave } = props;

//   const [name, setName] = useState(props.name || '');
//   const [interviewer, setInterviewer] = useState(props.interviewer || null);
//   const [error, setError] = useState("");

//   const reset = () => {
//     setName('');
//     setInterviewer(null);
//     setError("");
//   }

//   const cancel = () => {
//     reset();
//     onCancel();
//   }

//   const validate = () => {
//     if (name === "") {
//       setError("Student name cannot be blank");
//       return;
//     }

//     setError("");
//     onSave(name, interviewer);
//   }

//   return (
//     <main className="appointment__card appointment__card--create">
//       <section className="appointment__card-left">
//         <form autoComplete="off" onSubmit={event => event.preventDefault()}>
//           <input
//             className="appointment__create-input text--semi-bold"
//             name="name"
//             type="text"
//             value={name}
//             placeholder="Enter Student Name"
//             onChange={event => setName(event.target.value)}
//           />
//         </form>
//         <InterviewerList
//           interviewers={interviewers}
//           value={interviewer}
//           onChange={setInterviewer}
//         />
//       </section>
//       <section className="appointment__card-right">
//         <section className="appointment__actions">
//           <Button danger onClick={cancel}>Cancel</Button>
//           <Button confirm onClick={validate}>Save</Button>
//         </section>
//       </section>
//     </main>
//   );
// }

