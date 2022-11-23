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
import { useEffect, useState } from 'react'
import NorthernChart from 'src/components/NorthernChart'
import SouthernChart from 'src/components/SouthernChart'
import { useTextApi } from 'src/loaders/text'
import { parseCsvData } from 'src/utils/csv'

const publicData = (pathPart: string) =>
  `${process.env.NEXT_PUBLIC_BASE}/data/${pathPart}`
function IndexPage() {
  const { textData } = useTextApi(publicData('latest.csv'))
  const shapedData = parseCsvData(textData)
  const [maxX, setMaxX] = useState(0)
  const [minX, setMinX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [nearMaxX, setNearMaxX] = useState(1)
  useEffect(() => {
    if (shapedData[0]?.sampleDate) {
      // in practice the last date is the max
      const maxDate = shapedData[shapedData.length - 1]?.sampleDate
      const minDate = shapedData[0].sampleDate
      const nearMaxDate = shapedData[shapedData.length - 7]?.sampleDate
      setMaxX(new Date(maxDate).getTime())
      setMinX(new Date(minDate).getTime())
      setCurrentX(new Date(minDate).getTime())
      setNearMaxX(new Date(nearMaxDate).getTime())
    }
  }, [textData])
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
          <Stack>
            <Text>
              Unofficial Alternative data vis for the Massachusetts Water
              Resources Authority sourced from{' '}
              <Link
                href="https://www.mwra.com/biobot/biobotdata.htm"
                color="teal.500"
                isExternal
              >
                Biobot Data
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
            <Text>
              Samples submitted through {new Date(maxX).toDateString()}
            </Text>
          </Stack>
          <Flex>
            <Box padding={3}>
              <Slider
                aria-label="Maximum Copies Scale"
                defaultValue={maxY}
                orientation="vertical"
                minH="32"
                step={100}
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
              <Stack>
                <NorthernChart
                  maxY={maxY}
                  minX={currentX}
                  maxX={maxX}
                  data={shapedData}
                />
                <Slider
                  aria-label="Date Range Scale"
                  defaultValue={currentX}
                  orientation="horizontal"
                  step={1000 * 60 * 60 * 24 * 3}
                  min={minX}
                  max={nearMaxX}
                  onChange={setCurrentX}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <SouthernChart
                  maxY={maxY}
                  minX={currentX}
                  maxX={maxX}
                  data={shapedData}
                />
              </Stack>
            </Box>
          </Flex>
        </Box>
      ) : null}
    </div>
  )
}

export default IndexPage
