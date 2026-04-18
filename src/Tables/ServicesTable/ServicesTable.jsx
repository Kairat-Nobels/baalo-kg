import React from 'react'
import { Table, Button, Whisper, Tooltip } from 'rsuite'
import { MdEdit, MdDeleteOutline } from 'react-icons/md'

const ServicesTable = ({ data, onEdit, onDelete }) => {
  return (
    <Table bordered cellBordered data={data} autoHeight wordWrap="break-word">
      <Table.Column width={70} align="center">
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey="id" />
      </Table.Column>

      <Table.Column width={140}>
        <Table.HeaderCell>День</Table.HeaderCell>
        <Table.Cell dataKey="day" />
      </Table.Column>

      <Table.Column flexGrow={1.4}>
        <Table.HeaderCell>Программа</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.program || rowData.title || '—'}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Тренер</Table.HeaderCell>
        <Table.Cell dataKey="trainer" />
      </Table.Column>

      <Table.Column width={140}>
        <Table.HeaderCell>Время</Table.HeaderCell>
        <Table.Cell>
          {(rowData) =>
            rowData.startTime && rowData.endTime
              ? `${rowData.startTime} - ${rowData.endTime}`
              : '—'
          }
        </Table.Cell>
      </Table.Column>

      <Table.Column width={120}>
        <Table.HeaderCell>Зал</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.hall || rowData.room || '—'}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={140}>
        <Table.HeaderCell>Уровень</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.level || '—'}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={120}>
        <Table.HeaderCell>Длительность</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.duration || '—'}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={120} align="center" fixed="right">
        <Table.HeaderCell>Действия</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <div className="actionButtons">
              <Whisper
                placement="top"
                trigger="hover"
                speaker={<Tooltip>Редактировать</Tooltip>}
              >
                <Button appearance="subtle" onClick={() => onEdit(rowData)}>
                  <MdEdit color="#1caf68" size={18} />
                </Button>
              </Whisper>

              <Whisper
                placement="top"
                trigger="hover"
                speaker={<Tooltip>Удалить</Tooltip>}
              >
                <Button appearance="subtle" onClick={() => onDelete(rowData)}>
                  <MdDeleteOutline color="rgb(210 54 54)" size={18} />
                </Button>
              </Whisper>
            </div>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  )
}

export default ServicesTable
