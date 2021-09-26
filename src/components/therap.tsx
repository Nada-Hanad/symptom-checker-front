import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import TherapDisplayer from "./therapCard";

export default function Therap() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3002/therapeutics")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : isError ? (
        <h1>No data available.</h1>
      ) : (
        <div className="therap">
          {data.map((e: any) => {
            console.log(e);
            return <TherapDisplayer data={e}></TherapDisplayer>;
          })}
        </div>
      )}
    </>
  );
}
