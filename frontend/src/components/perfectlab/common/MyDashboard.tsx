import { BarChart, DonutChart, Sparkline } from "@mantine/charts";
import { ActionIcon, Center, RingProgress, rem } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import {} from "@mantine/core";
import { useState } from "react";
import { LineChart, PieChart } from "@mui/x-charts";

const MyDashboard = () => {
  const data = [
    { name: "Malaria Test", value: 400, color: "indigo.6" },
    { name: "Blood Compatibility", value: 300, color: "yellow.6" },
    { name: "Blood group", value: 100, color: "teal.6" },
    { name: "Sperm Counts", value: 200, color: "gray.6" },
  ];

  const linedata = [
    {
      month: "January",
      "Malaria Tests": 1200,
      "DNA Test": 900,
      "Test for STDs": 200,
    },
    {
      month: "February",
      "Malaria Tests": 1900,
      "DNA Test": 1200,
      "Test for STDs": 400,
    },
    {
      month: "March",
      "Malaria Tests": 400,
      "DNA Test": 1000,
      "Test for STDs": 200,
    },
    {
      month: "April",
      "Malaria Tests": 1000,
      "DNA Test": 200,
      "Test for STDs": 800,
    },
    {
      month: "May",
      "Malaria Tests": 800,
      "DNA Test": 1400,
      "Test for STDs": 1200,
    },
    {
      month: "June",
      "Malaria Tests": 750,
      "DNA Test": 600,
      "Test for STDs": 1000,
    },
  ];

  const [] = useState<boolean>();
  return (
    <div
      className="ml-[2rem] flex flex-col gap-3 "
      style={{ minWidth: "100vw", height: "100%" }}
    >
      <div>
        <h2 className=" text-3xl font-bold">
          Welcome back, {localStorage.getItem("username")}
        </h2>
      </div>
      <div className=" flex justify-around h-[40vh] gap-8 w-[900px] items-center">
        <div className=" flex flex-col items-center">
          <DonutChart paddingAngle={16} size={180} thickness={25} data={[{ name: "Insured", value: 400, color: "indigo.6" },
    { name: "Non Insured", value: 300, color: "grey.6" },]} />
          <h4>Clients Information</h4>
        </div>
        <div className="">
          <DonutChart paddingAngle={10} size={180} thickness={25} data={data} />
          <h4>Diagnostic Test Types</h4>
        </div>
        <div className="">
          <LineChart
            xAxis={[{ data: ["2020", "2021", "2022", "2023", "2024", "2025"] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
          {/* <h2>Lab Client Progression Status</h2> */}
        </div>
      </div>
      <div className=" w-[900px] h-[400px] barchart">
        <BarChart
          h={300}
          data={linedata}
          dataKey="month"
          withLegend
          series={[
            { name: "Malaria Tests", color: "violet.6" },
            { name: "DNA Test", color: "blue.6" },
            { name: "Test for STDs", color: "teal.6" },
          ]}
        />
      </div>
    </div>
  );
};

export default MyDashboard;
