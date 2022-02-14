import * as Plot from '@observablehq/plot'
import PlotChart from 'src/components/PlotChart'

type Props = {
  data: Array<any>
}

export default function NorthernChart({ data }: Props) {
  return data.length > 0 ? (
    <PlotChart
      options={{
        x: {
          type: 'utc',
          ticks: 40,
          tickFormat: '%b %y',
          label: 'Sample Date',
        },
        y: {
          domain: [0, 1500],
          grid: true,
          label: 'Northern Copies / mL',
        },
        width: 1200,
        height: 200,
        marks: [
          Plot.dot(data, {
            x: 'sampleDate',
            y: 'northernCopies',
            fill: '#0806',
          }),
          Plot.line(data, {
            x: 'sampleDate',
            y: 'northern7DayAvg',
          }),
        ],
        style: {
          background: '#4444',
          padding: '5px 10px 10px',
        },
      }}
    />
  ) : null
}
