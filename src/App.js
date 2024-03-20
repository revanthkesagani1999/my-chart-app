import React, { useState } from "react"; // Add useState here
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import './App.css';

// Sample data for Traffic Signal Conditions
const trafficSignalData = {
  labels: ["Good", "Fair", "Poor"],
  datasets: [
    {
      data: [841, 881, 1064],
      backgroundColor: ["#46BFBD", "#FDB45C", "#F7464A"],
      hoverBackgroundColor: ["#5AD3D1", "#FFC870", "#FF5A5E"],
    },
  ],
};

// Sample data for Sign Inventory and Conditions
const signInventoryData = {
  labels: [
    "Extruded Aluminum - Good",
    "Extruded Aluminum - Fair",
    "Extruded Aluminum - Poor",
    "Sheet Aluminum - Good",
    "Sheet Aluminum - Fair",
    "Sheet Aluminum - Poor",
  ],
  datasets: [
    {
      data: [3412, 2600, 4987, 69077, 28718, 140203],
      backgroundColor: [
        "#4D5360",
        "#949FB1",
        "#D4CCC5",
        "#46BFBD",
        "#FDB45C",
        "#F7464A",
      ],
      hoverBackgroundColor: [
        "#616774",
        "#A8B3C5",
        "#E2EAE9",
        "#5AD3D1",
        "#FFC870",
        "#FF5A5E",
      ],
    },
  ],
};

const trafficTableData = trafficSignalData.labels.map((label, index) => ({
  Condition: label,
  Quantity: trafficSignalData.datasets[0].data[index]
}));

const signTableData = signInventoryData.labels.map((label, index) => ({
  Type: label,
  Quantity: signInventoryData.datasets[0].data[index]
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.label;
          let value = context.raw;
          return `${label}: ${value}`;
        },
      },
    },
  },
};

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "traffic":
      return <Pie data={trafficSignalData} options={chartOptions} />;
    case "signs":
      return <Pie data={signInventoryData} options={chartOptions} />;
    default:
      return <div>Please select a tab.</div>;
  }
};

const Table = ({ data, columns }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("traffic");
  const getTabButtonClassName = (tabName) => {
    return `tabButton ${activeTab === tabName ? 'tabButtonActive' : ''}`;
  };
  return (
    <div className="container">
      <div className="tabContainer">
        <button
          onClick={() => setActiveTab("traffic")}
          className={getTabButtonClassName("traffic")}
        >
          Traffic Signal Inventory and Conditions
        </button>
        <button
          onClick={() => setActiveTab("signs")}
          className={getTabButtonClassName("signs")}
        >
          Sign Inventory and Conditions
        </button>
      </div>

      <div className="chartContainer">
        <TabContent activeTab={activeTab} />
        <div className={activeTab === "traffic" ? "show" : "hide"}>
        <Table data={trafficTableData} columns={["Condition", "Quantity"]} />
      </div>
      <div className={activeTab === "signs" ? "show" : "hide"}>
        <Table data={signTableData} columns={["Type", "Quantity"]} />
      </div>
      </div>
      
    </div>
  );
};

export default App;
