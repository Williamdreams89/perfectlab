import { BarChart, DonutChart, Sparkline } from '@mantine/charts';
import { ActionIcon, Center, RingProgress, rem } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import {} from "@mantine/core"

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
    <div className='ml-[2rem] flex flex-col gap-3 ' style={{minWidth:"100vw", height:"100%"}}>
      <div><h2 className=' text-3xl font-bold'>Welcome back, {localStorage.getItem("username")}</h2></div>
      <div className=" flex justify-between w-[70%] items-center">
        <div className=" flex flex-col items-center">
        <RingProgress
        size={200}
        thickness={25}
        sections={[{ value: 40, color: 'teal' }]} 
        label={
          <Center>
            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
              <IconUser style={{ width: rem(32), height: rem(32) }} />
            </ActionIcon>
          </Center>
        }
        />
        <h4>Insured & Non-insured Clients</h4>
        </div>
        <div className="">
        <DonutChart paddingAngle={10} size={180} thickness={25} data={data} />;
        <h4>Diagnostic Test Types</h4>
        </div>
        <div className="">
        <Sparkline
        w={200}
        h={60}
        data={[10, 20, 40, 20, 40, 10, 50, 5, 10]}
        trendColors={{ positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' }}
        fillOpacity={0.2}
      />
      <h2>Lab Client Progression Status</h2>
        </div>
      </div>
      <div className=' w-[900px] h-[400px] barchart'>

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
    </div>
  )
}

export default MyDashboard