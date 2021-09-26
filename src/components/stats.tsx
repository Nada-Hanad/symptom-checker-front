import Map from "./map";
import CountrySelect from "./countrySelector";
import GlobalChart from "./globalChart";
import VaccChart from "./vaccChart";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";

export default function Stats() {
  const [globalData, setGlobalData] = useState(null);
  const [vaccData, setVaccData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const [isError, setIsError] = useState(false);
  const url = "http://localhost:3002";
  const [country, setCountry] = useState<any>({
    code: "",
    label: "Choose country",
    phone: "",
  });
  useEffect(() => {
    axios
      .get(url + "/map")
      .then((response) => {
        setMapData(response.data);
      })
      .catch((err) => {
        setMapError(true);
      })
      .finally(() => {
        setMapLoading(false);
      });
    Promise.all([axios.get(url + "/global"), axios.get(url + "/vaccination")])
      .then((response) => {
        setGlobalData(response[0].data);
        setVaccData(response[1].data);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const updateChartByCountry = (choosenCountry: any) => {
    setLoading(true);
    setIsError(false);
    Promise.all([
      axios.get(url + `/data-by-country`, {
        params: { iso: choosenCountry },
      }),
      axios.get(url + `/vacc-by-country`, {
        params: { iso: choosenCountry },
      }),
    ])
      .then((response) => {
        setGlobalData(response[0].data);
        setVaccData(response[1].data);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="stats">
      <div className="search">
        <CountrySelect
          updateChartByCountry={updateChartByCountry}
          country={country}
          setCountry={setCountry}
        ></CountrySelect>
      </div>
      <div className="stats-elements">
        {mapLoading ? (
          <div className="map">
            <CircularProgress></CircularProgress>
          </div>
        ) : mapError ? (
          <h1>The map is currently unavailable.</h1>
        ) : (
          <Map mapData={mapData}></Map>
        )}
        {loading ? (
          <div className="charts-part">
            <CircularProgress></CircularProgress>
          </div>
        ) : isError ? (
          <div className="charts-part">
            <h1>Data is currently unavailable.</h1>
          </div>
        ) : (
          <>
            <div className="charts-part">
              <GlobalChart chartData={globalData}></GlobalChart>
              <VaccChart chartData={vaccData}></VaccChart>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
