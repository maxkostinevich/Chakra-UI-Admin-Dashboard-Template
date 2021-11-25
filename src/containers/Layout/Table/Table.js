import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import { FaEllipsisV } from "react-icons/fa";

import "./Table.scss";

export default function CustomTable({
  headers = [],
  items = [],
  selected = [],
  selectable = false,
  bg = "secondary.card",
  color = "gray.800",
}) {
  let itemsIds = items.map((item) => item.id);
  let [localSelected, setLocalSelected] = useState(selected);
  const setCheckedItems = (isChecked) => {
    setLocalSelected([]);
    if (isChecked === true) {
      setLocalSelected(itemsIds);
    }
  };

  const setCheckedItem = (item, isChecked) => {
    isChecked
      ? setLocalSelected([...localSelected, item])
      : setLocalSelected(localSelected.filter((i) => i !== item));
  };
  return (
    <Box
      className="custom-table-container"
      width="100%"
      bg={bg}
      color={color}
      rounded="lg"
      p={5}
    >
      <Table>
        <Thead>
          <Tr>
            {selectable ? (
              <Th data-column="global-selector">
                <Checkbox
                  isChecked={localSelected.length === itemsIds.length}
                  onChange={(e) => setCheckedItems(e.target.checked)}
                />
              </Th>
            ) : (
              ""
            )}

            {headers.map((head, i) => (
              <Th key={i} data-column={head.id}>
                {head.title}
              </Th>
            ))}
            <Th data-column="item-actions"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, i) => (
            <Tr key={i}>
              {selectable ? (
                <Td data-column="global-selector">
                  <Checkbox
                    defaultIsChecked={selected.includes(item.id)}
                    isChecked={localSelected.includes(item.id)}
                    onChange={(e) => setCheckedItem(item.id, e.target.checked)}
                  />
                </Td>
              ) : (
                ""
              )}

              {Object.keys(item).map((column, c) => (
                <Td key={c} data-column={headers[c]}>
                  {item[headers[c].id]}
                </Td>
              ))}
              <Td data-column="item-actions">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FaEllipsisV />}
                  ></MenuButton>
                  <MenuList>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
