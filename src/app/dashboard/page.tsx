"use client";
import React, { Fragment, useState, useEffect } from "react";
import { createStyles, Table, ScrollArea, rem, Radio } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  fetchFileVisualDataAction,
  fetchProcessedFilesMetadataAction,
  praanReducer,
} from "../store/reducer";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



function Dashboard() {
  const dispatch = useDispatch();
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState<number|null>(null);
  const processedFilesMetadata = useSelector(
    (state: any) => state[praanReducer].processedFilesMetadata
  );
  const fileVisualsData = useSelector((state:any) => state[praanReducer].fileVisualsData);


  let newArr = fileVisualsData?.fileDataJSON?.filter((value:any, index:number, Arr:any) => index % 750 == 0);
  let labels = newArr?.map((val:any) => val?.t);

  console.log('newArr',newArr);
  console.log('label',labels);

  useEffect(() => {
    dispatch(fetchProcessedFilesMetadataAction());
  }, []);

  useEffect(() => {
    if (processedFilesMetadata?.length > 0) {
      setSelectedRadio(processedFilesMetadata[0].fileId);
      dispatch(fetchFileVisualDataAction({fileId: processedFilesMetadata[0].fileId}));
    }
  }, [processedFilesMetadata]);
  
  const handleRadioSelect = (fileId:number) => {
    setSelectedRadio(fileId);
    dispatch(fetchFileVisualDataAction({fileId}));
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Particle 1',
        data: newArr?.map((val:any) => val.p1),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Particle 10',
        data: newArr?.map((val:any) => val.p10),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Particle 25',
        data: newArr?.map((val:any) => val.p25),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const rows = processedFilesMetadata?.map((row: any, index: number) => {
    return (
      <tr key={index}>
        <td><Radio label={row?.fileId} checked={row?.fileId === selectedRadio} onChange={() => handleRadioSelect(row?.fileId)}/></td>
        <td>{row?.fileName}</td>
        <td>CSV</td>
        <td>{new Date(row?.createdAt)?.toLocaleString()}</td>
      </tr>
    );
  });

  return (
    <Fragment>
      <div style={{ margin: "100px" }}>
        {processedFilesMetadata && (
          <ScrollArea
            h={300}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          >
            <Table miw={700}>
              <thead
                className={cx(classes.header, { [classes.scrolled]: scrolled })}
              >
                <tr>
                  <th>ID</th>
                  <th>File Name</th>
                  <th>File Type</th>
                  <th>Date / Time</th>
                </tr>
              </thead>
              <tbody>
                {rows}
                </tbody>
            </Table>
          </ScrollArea>
        )}
        <br /><br />
      {newArr?.length > 0 && <Bar options={options} data={data} />}
      </div>
    </Fragment>
  );
}

export default Dashboard;
