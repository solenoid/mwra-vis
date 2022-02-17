import * as Plot from '@observablehq/plot'
import PlotChart from 'src/components/PlotChart'

type Props = {
  maxY: number
  data: Array<any>
}

export default function SouthernChart({ maxY, data }: Props) {
  return data.length > 0 ? (
    <PlotChart
      options={{
        x: {
          type: 'utc',
          ticks: 40,
          tickFormat: '%b %y',
          label: 'Sample Date →',
          labelOffset: 35,
        },
        y: {
          domain: [0, maxY],
          grid: true,
          label: '↑ South System Copies / mL',
        },
        width: 1000,
        height: 250,
        margin: 45,
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
          padding: '0 10px 10px',
        },
      }}
    />
  ) : null
}
