import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { PaginationResponse } from 'types'
import { useQueryWithFilters } from 'common/hooks/useQueryWithFilters'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 130 },
]

type QueryType = {
  ordering?: string
  offset: number
  limit: number
}

type Todo = PaginationResponse<{ id: string; title: string }>

export default function Home() {
  const result = useQueryWithFilters<Todo, QueryType>(['todos'], '', { offset: 0, limit: 7 })

  return (
    <DataGrid
      rows={result.data?.results || []}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: result.filters.limit - result.filters.offset },
        },
      }}
      disableColumnFilter
      sortingMode="server"
      onSortModelChange={([column]) => {
        switch (column?.sort) {
          case 'asc':
            result.addFilters({ ordering: column.field })
            break
          case 'desc':
            result.addFilters({ ordering: `-${column.field}` })
            break
          default:
            result.addFilters({ ordering: undefined })
        }
      }}
    />
  )
}
