import React from 'react'
import SectionTitle from '../../components/admin/typography/SectionTitle'
import { Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Pagination } from "@windmill/react-ui"

function Tables() {
  <p>ffffffffffffffffffffffffffffffffffffff</p>
  return (
    <>
   
      {/* <PageTitle>Tables</PageTitle>

      <CTA /> */}

      <SectionTitle>Simple table</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {/* Empty table body, no data */}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination />
        </TableFooter>
      </TableContainer>

      <SectionTitle>Table with actions</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {/* Empty table body, no data */}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination />
        </TableFooter>
      </TableContainer>
    </>
  )
}
export default Tables
