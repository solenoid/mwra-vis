import * as Plot from '@observablehq/plot'
import { useEffect, useRef } from 'react'

type Props = {
  options: any
}
// Inspired by https://github.com/iddan/plot-react/blob/main/src/PlotFigure.tsx
export default function PlotChart({ options }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      const child = element.children[0]
      if (child) {
        child.remove()
      }
      element.appendChild(Plot.plot(options))
    }
  }, [ref, options])

  return <div ref={ref} />
}
