import React from 'react';
import useAllQuestions from '../../hooks/useAllQuestions';

function QuestionsList() {
 const {questions, loading, error} = useAllQuestions();

 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error loading questions!</p>;

 return (
   <div>
     <h2>All Questions</h2>
     <ul>
       {questions.map(question => (
         <li key={question.id}>{question.text}</li>
       ))}
     </ul>
   </div>
 );
}

export default QuestionsList;