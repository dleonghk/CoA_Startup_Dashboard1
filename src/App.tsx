import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  List,
  ListItem,
  Card,
  Legend,
  LineChart,
  DonutChart,
  BarChart,
  AreaChart,
} from "@tremor/react";
import Investors from "./Investors";
import Students from "./Students";
import AnnualReport from "./AnnualReport";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import ErrorPage from "./Error";
import Login from "./Login";
import "./App.css";
import './Login.css';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// some bs data i made up
const startupsByYear = [
  { year: "2018", startups: 120 },
  { year: "2019", startups: 150 },
  { year: "2020", startups: 180 },
  { year: "2021", startups: 200 },
  { year: "2022", startups: 230 },
  { year: "2023", startups: 250 },
];

const totalFundingByYear = [
  { date: "Jan 23", "Total Funding": 500, "Pre-Seed Funding": 100 },
  { date: "Feb 23", "Total Funding": 600, "Pre-Seed Funding": 120 },
  { date: "Mar 23", "Total Funding": 700, "Pre-Seed Funding": 130 },
  { date: "Apr 23", "Total Funding": 800, "Pre-Seed Funding": 140 },
  { date: "May 23", "Total Funding": 900, "Pre-Seed Funding": 150 },
  { date: "Jun 23", "Total Funding": 950, "Pre-Seed Funding": 160 },
  { date: "Jul 23", "Total Funding": 1000, "Pre-Seed Funding": 170 },
  { date: "Aug 23", "Total Funding": 1050, "Pre-Seed Funding": 180 },
  { date: "Sep 23", "Total Funding": 1100, "Pre-Seed Funding": 190 },
  { date: "Oct 23", "Total Funding": 1150, "Pre-Seed Funding": 200 },
  { date: "Nov 23", "Total Funding": 1200, "Pre-Seed Funding": 210 },
  { date: "Dec 23", "Total Funding": 1250, "Pre-Seed Funding": 220 },
];

const fundingByYearSummary = [
  {
    name: "Total Funding",
    value: 11200,
  },
  {
    name: "Pre-Seed Funding",
    value: 1970,
  },
];

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

const statusColor = {
  "Total Funding": "bg-blue-500",
  "Pre-Seed Funding": "bg-violet-500",
};

const startupsByIndustry = [
  { industry: "Technology", value: 40 },
  { industry: "Healthcare", value: 30 },
  { industry: "Finance", value: 15 },
  { industry: "Education", value: 10 },
  { industry: "Other", value: 5 },
];

const percentFormatter = (number: number) => {
  return number + "%";
};

const startupsBySize = [
  { size: "1-10", startups: 150 },
  { size: "11-50", startups: 100 },
  { size: "51-200", startups: 50 },
  { size: "201+", startups: 25 },
];

const cardData = [
  {
    name: "Ecosystem Value",
    stat: "$200.5 bn",
    change: "+12.5%",
    changeType: "positive",
  },
  {
    name: "Total Funding Rounds",
    stat: "2400",
    change: "+1.8%",
    changeType: "positive",
  },
  {
    name: "New Jobs Created",
    stat: "369",
    change: "+19.7%",
    changeType: "positive",
  },
  {
    name: "Average Software Engineer Salary",
    stat: "$104k",
    change: "+19.7%",
    changeType: "positive",
  },
];

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav className="bg-slate-900 text-white p-4">
          <ul className="flex space-x-10">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/investors">Investors</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/annual-report">Annual Report</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>
            <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="mb-8 flex justify-center w-full">
                  <h1 className="text-3xl font-bold text-cyan-200">
                    Atlanta Tech Ecosystem Dashboard
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {cardData.map((item) => (
                    <Card key={item.name} className="mb-5">
                      <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                        {item.name}
                      </p>
                      <div className="mt-2 flex items-baseline space-x-2.5">
                        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          {item.stat}
                        </p>
                        <span
                          className={classNames(
                            item.changeType === "positive"
                              ? "text-emerald-700 dark:text-emerald-500"
                              : "text-red-700 dark:text-red-500",
                            "text-tremor-default font-medium"
                          )}
                        >
                          {item.change}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2 text-cyan-200">
                      New Startups per Year
                    </h2>
                    <LineChart
                      data={startupsByYear}
                      index="year"
                      categories={["startups"]}
                    />
                    <div className="text-center mt-2 text-white">Year</div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-2 text-cyan-200">
                      Startups by Size
                    </h2>
                    <BarChart
                      data={startupsBySize}
                      index="size"
                      categories={["startups"]}
                    />
                    <div className="text-center mt-2 text-white">
                      Company Size
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2 text-cyan-200">
                      Total Funding (in millions)
                    </h3>
                    <AreaChart
                      data={totalFundingByYear}
                      index="date"
                      categories={["Total Funding", "Pre-Seed Funding"]}
                      colors={["blue", "violet"]}
                      valueFormatter={valueFormatter}
                      showLegend={false}
                      showYAxis={true}
                      showGradient={true}
                      startEndOnly={false}
                      className="mt-6 h-60"
                    />
                    <List className="mt-2">
                      {fundingByYearSummary.map((item) => (
                        <ListItem key={item.name}>
                          <div className="flex items-center space-x-2">
                            <span
                              className={classNames(
                                statusColor[item.name],
                                "h-0.5 w-3"
                              )}
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </div>
                          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            {valueFormatter(item.value)}
                          </span>
                        </ListItem>
                      ))}
                    </List>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-xl font-bold mb-4 text-cyan-200">
                      Startups by Industry
                    </h2>
                    <div className="w-64 h-64">
                      <DonutChart
                        data={startupsByIndustry}
                        category="value"
                        index="industry"
                        variant="pie"
                        valueFormatter={percentFormatter}
                        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                        className="mt-2 h-60"
                      />
                    </div>

                    <div>
                      <Legend
                        categories={[
                          "Technology",
                          "Healthcare",
                          "Finance",
                          "Education",
                          "Other",
                        ]}
                        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                        className="max-w-xs text-center"
                      />
                    </div>
                  </div>
                </div>
              </>
            }
          />
          <Route path="/investors" element={<Investors />} />
          <Route path="/students" element={<Students />} />
          <Route path="/annual-report" element={<AnnualReport />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
