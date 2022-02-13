import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react'
import NextLink from 'next/link'

function IndexPage() {
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
      <Heading as="h1" size="2xl" marginY={3}>
        Welcome
      </Heading>
    </div>
  )
}

export default IndexPage
