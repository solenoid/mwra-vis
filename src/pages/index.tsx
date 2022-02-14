import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useEffect } from 'react'
import NorthernChart from 'src/components/NorthernChart'
import SouthernChart from 'src/components/SouthernChart'
import { useJsonApi } from 'src/loaders/json'
import { useTextApi } from 'src/loaders/text'
import { parseCsvData } from 'src/utils/csv'

function IndexPage() {
  const { jsonData } = useJsonApi('/data/latest.json')
  const { textData, setUrl } = useTextApi('')
  const csvUrl = jsonData?.latest
  useEffect(() => {
    if (csvUrl) {
      setUrl(csvUrl)
    }
  }, [setUrl, csvUrl])
  const shapedData = parseCsvData(textData)
  return (
    <div>
      <Breadcrumb
        borderBottomColor="gray.500"
        borderBottomWidth={1}
        paddingBottom={3}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading as="h1" size="xl" marginY={3}>
        MWRA Data Vis
      </Heading>
      {shapedData.length > 0 ? (
        <section>
          Data sourced from{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.mwra.com/biobot/biobotdata.htm"
          >
            biobot
          </a>{' '}
          using the data behind the graph.
          <NorthernChart data={shapedData} />
          <SouthernChart data={shapedData} />
        </section>
      ) : null}
    </div>
  )
}

export default IndexPage
