import { useState, useEffect } from "react";
import axios from "axios";

function useDynamicQuestionFetch(category, difficulty, type) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = "http://localhost:8000/questions";

    if (category && difficulty && type) {
      url += `/category-and-difficulty-and-type/${category}/${difficulty}/${type}`;
    } else if (category && difficulty) {
      url += `/category-and-difficulty/${category}/${difficulty}`;
    } else if (category) {
      url += `/category/${category}`;
    } else {
      url += "/all";
    }

    axios
      .get(url)
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [category, difficulty, type]); // Dependency array

  return { questions, loading, error };
}

export default useDynamicQuestionFetch;