import { Card, Metric, Text, Title, LineChart } from '@tremor/react';
import './App.css'

function App() {
  return (
<div className="text-left">
  <div className="grid grid-cols-2 gap-12">
    <div>
      <Card className="max-w-xs mx-auto mb-6" decoration="top" decorationColor="indigo">
        <Text>Total Jobs Created</Text>
        <Metric>120</Metric> {/* Example total jobs created */}
      </Card>
    </div>
    <div>
      <Card className="max-w-xs mx-auto mb-6" decoration="top" decorationColor="indigo">
        <Text>Total New Startups</Text>
        <Metric>80</Metric> {/* Example total new startups */}
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
</div>

  );
}


export default App
