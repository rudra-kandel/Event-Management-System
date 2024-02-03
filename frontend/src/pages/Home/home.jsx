import NavbarC from "@components/Partials/NavbarC";
import Card from "@components/Card";
import { useEffect, useState } from "react";
import httpClient from "@services/service-axios";

const useDataFetch = (url, page) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    httpClient
      .get(url)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [url]);

  return [isLoading, data];
};
const Home = () => {
  const [page, setPage] = useState(1);
  const [isLoading, data] = useDataFetch("api/card", page);
  return (
    <>
      <NavbarC />
      {/* <Card /> */}
      <div className="flex gap-4 flex-wrap pt-6 justify-center">
        {Array.from({ length: 10 }, () => 1).map(() => (
          <Card />
        ))}
      </div>
    </>
  );
};
export default Home;
