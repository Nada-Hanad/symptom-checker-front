import React from "react";
import { Line } from "react-chartjs-2";
import FadeIn from "react-fade-in";
import Vacc from "./icons/vacc";

const VaccChart = ({ chartData }: any) => {
  var data = {
    labels: Object.keys(chartData) ?? [],
    datasets: [
      {
        label: "Candidates",
        data: Object.values(chartData) ?? [],
        fill: true,
        backgroundColor: "rgb(88, 202, 217,0.3)",
        borderColor: "#58CAD9",
        borderWidth: 1.5,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="globalChart">
      <FadeIn>
        <div className="title-chart">
          <Vacc></Vacc>
          <h2
            style={{
              paddingLeft: 20,
            }}
          >
            Variations of vaccine candidates
          </h2>
        </div>
        <div
          className="chart-content"
          style={{
            flexDirection: "row-reverse",
          }}
        >
          <div className="chart">
            <Line
              style={{
                height: 400,
                width: 550,
              }}
              data={data}
              options={options}
            />
          </div>
          <p
            style={{
              fontSize: 24,
            }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
            accusamus hic dolorem nostrum nisi fugiat optio praesentium quae
            corrupti! Aliquam ab ducimus vel corrupti rem fugiat. Sunt assumenda
            officia harum!
          </p>
        </div>
      </FadeIn>
    </div>
  );
};

export default VaccChart;
