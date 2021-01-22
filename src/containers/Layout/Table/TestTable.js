import { Table, TableCaption, Thead, Tbody, Tr, Td, Th } from '@chakra-ui/react'
import React from 'react'
import "../../Users/Users.scss";

export default function TestTable() {
    return (
        <Table variant="simple" className="chakra-ui-table">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
                <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                </Tr>
            </Tbody>
        </Table>
    )
}
