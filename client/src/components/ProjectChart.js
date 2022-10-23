import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { enGB } from "date-fns/locale";
import { getRandomColor } from "../utils/randomColourGenerator";

ChartJS.register(...registerables);

const ProjectChart = ({
  projectId,
  rawHourEstimates,
  modifiedWeekEstimates,
}) => {
  console.log(rawHourEstimates);
  console.log(modifiedWeekEstimates);

  // get current date
  // change modifiedWeekEstimates into weeks from now
  // for each ---> push to an array twice, once for the data and again for the datasets

  const options = {
    animation: false,
    spanGaps: true,
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Estimated time to complete feature (hours)",
        },
        grid: {
          display: false,
        },
      },
      x: {
        adapters: {
          date: {
            locale: enGB,
          },
        },
        type: "time",
        distribution: "linear",
        time: {
          parser: "yyyy-MM-dd",
          unit: "week",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
    },
    plugins: {
      legend: { position: "right" },
    },
  };

  const data = {
    datasets: [
      {
        label: "Annie",
        data: [
          { x: 0, y: 40 },
          { x: 0.75, y: 0 },
        ],
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor(),
        showLine: true,
      },
      {
        label: "Anh",
        data: [
          { x: 0, y: 20 },
          { x: 1, y: 0 },
        ],
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor(),
        showLine: true,
      },
      {
        label: "Annabelle",
        data: [
          { x: 0, y: 10 },
          { x: 0.9, y: 0 },
        ],
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor(),
        showLine: true,
      },
    ],
  };

  return (
    <>
      <h3>Projection</h3>
      <p>
        Only taking "must-have" features into consideration, it's estimated that
        this project will be complete on <b>this date</b>.
      </p>
      <Container>
        <Line
          options={options}
          data={data}
          style={{ vh: 50 }}
          datasetIdKey="id"
        />
      </Container>
      <br />
      <h3>Numbers not what you need?</h3>
      <p>
        Go back and edit your project. Consider changing features from "must
        have" to "nice to have", and/or changing the assignees on different
        features.
      </p>
      <Link className="btn" to={`/myprojects/${projectId}/features`}>
        Edit project
      </Link>
    </>
  );
};

export default ProjectChart;
