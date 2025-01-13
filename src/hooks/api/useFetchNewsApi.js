import { useState, useEffect } from "react";

export const useFetchNewsData = (selectedCategory, endDate, source) => {
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setDatas] = useState([]);

  const fetchNewsData = async (url, parseResponse) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      parseResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedCategory || !endDate || !source) return;

    const API_KEYS = {
      NewsOrg: "f64c11605bc24fa78ed366b76c10f6f6",
      NewsCred: "f64c11605bc24fa78ed366b76c10f6f6",
      TheGuardians: "5f10bad3-ff1b-4c2f-904c-7de1b0bd2f93",
    };

    if (source === "NewsOrg") {
      const url = `https://newsapi.org/v2/everything?q=${selectedCategory}&from=2025-01-09&to=${endDate}&sortBy=popularity&apiKey=${API_KEYS.NewsOrg}`;
      fetchNewsData(url, (data) => setDatas(data?.articles || []));
    } else if (source === "NewsCred") {
      const url = `https://newsapi.org/v2/top-headlines?q=${selectedCategory}&from=2025-01-09&to=${endDate}&sortBy=popularity&apiKey=${API_KEYS.NewsCred}`;
      fetchNewsData(url, (data) => setDatas(data?.articles || []));
    } else if (source === "TheGuardians") {
      const url = `https://content.guardianapis.com/search?q=${selectedCategory}&from-date=${endDate}&api-key=${API_KEYS.TheGuardians}`;
      fetchNewsData(url, (data) => setDatas(data?.response?.results || []));
    }
  }, [selectedCategory, endDate, source]);

  return { datas, isLoading };
};
