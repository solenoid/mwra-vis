import * as Plot from '@observablehq/plot'
import PlotChart from 'src/components/PlotChart'

type Props = {
  maxY: number
  minX: number
  maxX: number
  data: Array<any>
}

export default function NorthernChart({ maxY, minX, maxX, data }: Props) {
  return data.length > 0 ? (
    <PlotChart
      options={{
        x: {
          domain: [minX, maxX],
          type: 'time',
          ticks: 10,
          // tickFormat: '%b %y',
          label: 'Sample Date →',
          labelOffset: 35,
        },
        y: {
          domain: [0, maxY],
          grid: true,
          label: '↑ North System Copies / mL',
        },
        width: 1000,
        height: 250,
        margin: 45,
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
          padding: '0 10px 10px',
        },
      }}
    />
  ) : null
}
