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

      <Table.Column width={110}>
        <Table.HeaderCell>Иконка</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <img
              src={
                rowData.image ||
                'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=300&q=80'
              }
              alt={rowData.name}
              style={{
                width: 60,
                height: 60,
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          )}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1.4}>
        <Table.HeaderCell>Название</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.name || rowData.title || '—'}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Тип</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.type || 'Не указан'}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1.8}>
        <Table.HeaderCell>Описание</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.description || '—'}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={140}>
        <Table.HeaderCell>Компаний</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.count || rowData.companyCount || '—'}
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
                  <MdEdit color="#2563eb" size={18} />
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
