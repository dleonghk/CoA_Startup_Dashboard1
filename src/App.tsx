import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Card, Metric, Text, Title, LineChart } from '@tremor/react';
import InvestorView from './investorView'; 
import UserView from './userView'; 
import './App.css';
import ErrorPage from './errorPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="text-left">
        <Routes>
          <Route path="/" element={
            <>
              <div className="flex justify-between items-end mb-8">
                <h1 className="text-3xl font-bold text-indigo-600">
                  Atlanta Tech Ecosystem Dashboard
                </h1>
                <div>
                  <Link to="/investorView">
                    <button className="bg-indigo-500 text-white p-2 rounded mr-4">Investor View</button>
                  </Link>
                  <Link to="/userView">
                    <button className="bg-indigo-500 text-white p-2 rounded">Regular User View</button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <Card className="max-w-xs mx-auto mb-6" decoration="top" decorationColor="indigo">
                    <Text>Total Jobs Created</Text>
                    <Metric>120</Metric>
                  </Card>
                </div>
                <div>
                  <Card className="max-w-xs mx-auto mb-6" decoration="top" decorationColor="indigo">
                    <Text>Total New Startups</Text>
                    <Metric>80</Metric>
                  </Card>
                </div>
              </div>
              <Card className="mt-8">
                <Title>Annual Growth</Title>
                <LineChart
                  className="mt-6"
                  data={[
                    { year: '2018', 'Jobs Created': 220},
                    { year: '2019', 'Jobs Created': 250},
                    { year: '2020', 'Jobs Created': 280},
                    { year: '2021', 'Jobs Created': 240},
                    { year: '2022', 'Jobs Created': 320},
                    { year: '2023', 'Jobs Created': 380},
                    { year: '2024', 'Jobs Created': 350},
                  ]}
                  index="year"
                  categories={["Jobs Created"]}
                  colors={["pink", "gray"]}
                  yAxisWidth={120}
                />
              </Card>
            </>
          } />
          <Route path="/investorView" element={<InvestorView/>} />
          <Route path="/userView" element={<UserView/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
