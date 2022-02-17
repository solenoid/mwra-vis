import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
  Heading,
  Link,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import NorthernChart from 'src/components/NorthernChart'
import SouthernChart from 'src/components/SouthernChart'
import { useJsonApi } from 'src/loaders/json'
import { useTextApi } from 'src/loaders/text'
import { parseCsvData } from 'src/utils/csv'

const publicData = (pathPart: string) =>
  `${process.env.NEXT_PUBLIC_BASE}/data/${pathPart}`
function IndexPage() {
  const { jsonData } = useJsonApi(publicData('latest.json'))
  const { textData } = useTextApi(publicData('latest.csv'))
  const shapedData = parseCsvData(textData)
  const [maxY, setMaxY] = useState(1000)
  return (
    <div>
      <Breadcrumb borderBottomColor="gray.500">
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Divider />
      <Heading as="h1" size="l" marginY={3}>
        Wastewater COVID-19 Tracking
      </Heading>
      {shapedData.length > 0 ? (
        <Box>
          <Stack marginY={3} spacing={5}>
            <Text>
              Alternative data vis for the Massachusetts Water Resources
              Authority sourced from{' '}
              <Link
                href="https://www.mwra.com/biobot/biobotdata.htm"
                color="teal.500"
                isExternal
              >
                Biobot Data
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
            <Text>Samples submitted through {jsonData?.submitted}</Text>
          </Stack>
          <Flex>
            <Box padding={3}>
              <Slider
                aria-label="slider-ex-3"
                defaultValue={maxY}
                orientation="vertical"
                minH="32"
                min={250}
                max={10000}
                onChange={setMaxY}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box paddingY={3}>
              <NorthernChart maxY={maxY} data={shapedData} />
              <SouthernChart maxY={maxY} data={shapedData} />
            </Box>
          </Flex>
        </Box>
      ) : null}
    </div>
  )
}

export default IndexPage
