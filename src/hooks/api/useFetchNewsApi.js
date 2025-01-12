import { useState } from "react";

const useFetchNewsApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "f64c11605bc24fa78ed366b76c10f6f6"; // API key

  // Function to fetch data when called
  const fetchNewsData = async (selectedCategory = "All") => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetch(
        `https://newsapi.org/v2/everything?q=${selectedCategory}&from=2025-01-09&to=2025-01-09&sortBy=popularity&apiKey=${apiKey}`
      );
      const response = await data.json();

      if (response?.articles) {
        setDatas(response.articles);
      } else {
        setError("No articles found.");
      }
    } catch (error) {
      setError("Error fetching data: " + error.message);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, datas, error, fetchNewsData };
};

export default useFetchNewsApi;
