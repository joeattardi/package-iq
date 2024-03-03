import { useFetcher } from '@remix-run/react';
import { Chart, ChartWrapperOptions } from 'react-google-charts';

export default function DownloadCharts({ downloads }) {
  const series = downloads.downloads.map(record => [
    record.day, record.downloads
  ]);

  const data = [
    ['Date', 'Downloads'],
    ...series
  ];

  const options: Partial<ChartWrapperOptions> = {
    legend: 'none',
    hAxis: {
      textPosition: 'none'
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold">Downloads (past 30 days)</h3>
      <Chart
        chartType="LineChart"
        width="100%"
        data={data}
        options={options}
      />
    </div>
  );
}