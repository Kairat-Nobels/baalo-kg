import React from 'react'
import { Table, Button, Whisper, Tooltip } from 'rsuite'
import { MdDeleteOutline } from 'react-icons/md'

const RecordsTable = ({ data, onDelete }) => {
  return (
    <Table
      bordered
      cellBordered
      data={data}
      autoHeight
      wordWrap="break-word"
      locale={{
        emptyMessage: 'Заявок пока нет',
      }}
    >
      <Table.Column width={70} align="center">
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey="id" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Имя</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.fullName || rowData.name || '—'}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={160}>
        <Table.HeaderCell>Телефон</Table.HeaderCell>
        <Table.Cell dataKey="phone" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Название компании</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.companyName || '—'}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Категория</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.category || '—'}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1.2}>
        <Table.HeaderCell>Адрес</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.address || '—'}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={120}>
        <Table.HeaderCell>Статус</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.status || 'Новая'}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Комментарий</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <span
              style={{
                display: 'block',
                maxWidth: 320,
                whiteSpace: 'pre-line',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {rowData.comment || '—'}
            </span>
          )}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={100} align="center" fixed="right">
        <Table.HeaderCell>Действия</Table.HeaderCell>
        <Table.Cell className="deleteBtnTable">
          {(rowData) => (
            <Whisper
              trigger="hover"
              placement="top"
              speaker={<Tooltip>Удалить</Tooltip>}
            >
              <Button onClick={() => onDelete(rowData)} appearance="subtle">
                <MdDeleteOutline color="rgb(210 54 54)" size={20} />
              </Button>
            </Whisper>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  )
}

export default RecordsTable
