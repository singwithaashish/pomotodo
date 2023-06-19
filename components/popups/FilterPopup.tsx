import { Box, Button, Heading, Layer, Select, Text } from 'grommet';
import React from 'react'
import { useAppState } from '../context/appStateContext';
import { Filter as FLT, Task } from "@/typings";

// <FilterPopup setFilterMenu={() => setFilterMenu(false)}  />
interface FilterPopupProps {
    setFilterMenu: (show: boolean) => void;
}
function FilterPopup({setFilterMenu}: FilterPopupProps) {
    const {state, dispatch} = useAppState();
  return (
    <Layer
              onEsc={() => setFilterMenu(false)}
              onClickOutside={() => setFilterMenu(false)}
              style={{
                overflow: "auto",
              }}
            >
              <Box pad="medium" gap="small" width="medium">
                <Heading level={3} margin="none">
                  Apply Filter
                </Heading>
                <Text>Filter by</Text>
                <Select
                  options={["all", "overdue", "completed"]}
                  value={state.appliedFilters?.show}
                  onChange={({ option }) => {
                    dispatch({
                      type: "SET_FILTERS",
                      filters: {
                        ...state.appliedFilters,
                        show: option,
                      } as FLT,
                    });
                  }}
                />
                <Text>Sort by</Text>
                <Select
                  options={["all", "created", "updated", "due", "priority"]}
                  value={state.appliedFilters?.sort}
                  onChange={({ option }) => {
                    dispatch({
                      type: "SET_FILTERS",
                      filters: {
                        ...state.appliedFilters,
                        sort: option,
                      } as FLT,
                    });
                  }}
                />
                <Text>Order</Text>
                <Select
                  options={["asc", "desc"]}
                  value={state.appliedFilters?.order}
                  onChange={({ option }) => {
                    dispatch({
                      type: "SET_FILTERS",
                      filters: {
                        ...state.appliedFilters,
                        order: option,
                      } as FLT,
                    });
                  }}
                />
                <Button label="close" onClick={() => setFilterMenu(false)} />
              </Box>
            </Layer>
  )
}

export default FilterPopup