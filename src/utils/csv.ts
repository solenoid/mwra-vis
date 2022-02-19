import * as d3 from 'd3'

const numberOrAbsent = (
  inName: string,
  outName: string,
  input: { [key: string]: string }
) =>
  input[inName] && input[inName] !== ''
    ? { [outName]: Number(input[inName]) }
    : {}

const parseDate = (date: string) => {
  const [month, day, year] = date.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

type rowType = {
  sampleDate: string
  northernCopies?: number
  southernCopies?: number
  northern7DayAvg?: number
  southern7DayAvg?: number
}

export const parseCsvData = (csv: string) =>
  d3
    .csvParse(csv, (row) => {
      return {
        // ...row,
        sampleDate: parseDate(row['Sample Date']),
        ...numberOrAbsent('Northern (copies/mL)', 'northernCopies', row),
        ...numberOrAbsent('Southern (copies/mL)', 'southernCopies', row),
        ...numberOrAbsent('Northern 7 day avg', 'northern7DayAvg', row),
        ...numberOrAbsent('Southern 7 day avg', 'southern7DayAvg', row),
      } as rowType
    })
    .filter((d) => d.northernCopies || d.southernCopies)
