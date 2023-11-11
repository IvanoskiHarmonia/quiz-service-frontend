import { useState, useEffect } from 'react';
import axios from 'axios';

function useAllQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/questions/all')
      .then(response => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { questions, loading, error };
}

export default useAllQuestions;