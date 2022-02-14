import * as Plot from '@observablehq/plot'
import PlotChart from 'src/components/PlotChart'

type Props = {
  data: Array<any>
}

export default function SouthernChart({ data }: Props) {
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
          label: 'Southern Copies / mL',
        },
        width: 1200,
        height: 200,
        marks: [
          Plot.dot(data, {
            x: 'sampleDate',
            y: 'southernCopies',
            fill: '#8406',
          }),
          Plot.line(data, {
            x: 'sampleDate',
            y: 'southern7DayAvg',
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
