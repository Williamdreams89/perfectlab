import { BarChart, DonutChart, Sparkline } from '@mantine/charts';
import { ActionIcon, Center, RingProgress, rem } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { LineChart } from 'recharts';

const MyDashboard = () => {
  const data = [
    { name: 'USA', value: 400, color: 'indigo.6' },
    { name: 'India', value: 300, color: 'yellow.6' },
    { name: 'Japan', value: 100, color: 'teal.6' },
    { name: 'Other', value: 200, color: 'gray.6' },
  ];

  const linedata = [
    { month: 'January', "Malaria Tests": 1200, "DNA Test": 900, "Test for STDs": 200 },
    { month: 'February', "Malaria Tests": 1900, "DNA Test": 1200, "Test for STDs": 400 },
    { month: 'March', "Malaria Tests": 400, "DNA Test": 1000, "Test for STDs": 200 },
    { month: 'April', "Malaria Tests": 1000, "DNA Test": 200, "Test for STDs": 800 },
    { month: 'May', "Malaria Tests": 800, "DNA Test": 1400, "Test for STDs": 1200 },
    { month: 'June', "Malaria Tests": 750, "DNA Test": 600, "Test for STDs": 1000 },
  ]
  return (
    <div className='flex flex-col gap-6'>
      <div><h2>Welcome back, William</h2></div>
      <div className=" flex gap-4">
        <div className="">
        <RingProgress
        sections={[{ value: 40, color: 'teal' }]} 
        label={
          <Center>
            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
              <IconUser style={{ width: rem(22), height: rem(22) }} />
            </ActionIcon>
          </Center>
        }
        />
        Users (Insured & NonInsured)
        </div>
        <div className="">Ring Progress</div>
        <div className="">
        <Sparkline
        w={200}
        h={60}
        data={[10, 20, 40, 20, 40, 10, 50, 5, 10]}
        trendColors={{ positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' }}
        fillOpacity={0.2}
      />
        </div>
      </div>
      <BarChart
      h={300}
      data={linedata}
      dataKey="month"
      withLegend
      series={[
        { name: 'Malaria Tests', color: 'violet.6' },
        { name: 'DNA Test', color: 'blue.6' },
        { name: 'Test for STDs', color: 'teal.6' },
      ]}
    />
    </div>
  )
}

export default MyDashboard