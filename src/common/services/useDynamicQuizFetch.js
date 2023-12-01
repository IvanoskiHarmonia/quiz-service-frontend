import { useState, useEffect } from 'react';
import axios from 'axios';

function useDynamicQuizFetch() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = 'http://localhost:8000/api/quizzes/random10';

    axios
      .get(url)
      .then(response => {
        const sortedQuestions = response.data.sort((a, b) => a.id - b.id);
        setQuestions(sortedQuestions);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { questions, loading, error };
}

export default useDynamicQuizFetch;
