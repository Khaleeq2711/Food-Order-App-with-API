import { useCallback, useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const httpRequest = useCallback(async (reqConfig, httpDataHandler) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(reqConfig.url, {
        method: reqConfig.method ? reqConfig.method : "GET",
        body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
        headers: reqConfig.headers ? reqConfig.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      httpDataHandler(data);
      // debugger;
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setLoading(false);
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////////////
  return {
    loading: loading,
    error: error,
    httpRequest,
  };
};

export default useHttp;
