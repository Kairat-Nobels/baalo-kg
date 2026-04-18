import { Table, Button, Whisper, Tooltip } from 'rsuite'
import { MdEdit, MdDeleteOutline } from 'react-icons/md'

const DoctorsTable = ({ data, onEdit, onDelete }) => {
  return (
    <Table bordered cellBordered data={data} autoHeight wordWrap="break-word">
      <Table.Column width={70} align="center">
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey="id" />
      </Table.Column>

      <Table.Column width={110} fixed>
        <Table.HeaderCell>Фото</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <img
              src={
                rowData.img ||
                rowData.image ||
                'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=300&q=80'
              }
              alt={rowData.name}
              style={{
                width: 64,
                height: 64,
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          )}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1.2}>
        <Table.HeaderCell>Название</Table.HeaderCell>
        <Table.Cell dataKey="name" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Категория</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.category || rowData.subject || 'Не указана'}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1.2}>
        <Table.HeaderCell>Адрес</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.address || 'Не указан'}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Телефон</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.phone || 'Не указан'}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={110} align="center">
        <Table.HeaderCell>Рейтинг</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => `⭐ ${rowData.rating || '4.5'}`}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={120} align="center" fixed="right">
        <Table.HeaderCell>Действия</Table.HeaderCell>
        <Table.Cell className="deleteBtnTable">
          {(rowData) => (
            <div className="actionButtons">
              <Whisper
                placement="top"
                trigger="hover"
                speaker={<Tooltip>Редактировать</Tooltip>}
              >
                <Button onClick={() => onEdit(rowData)} appearance="subtle">
                  <MdEdit color="#2563eb" size={20} />
                </Button>
              </Whisper>

              <Whisper
                placement="top"
                trigger="hover"
                speaker={<Tooltip>Удалить</Tooltip>}
              >
                <Button onClick={() => onDelete(rowData)} appearance="subtle">
                  <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                </Button>
              </Whisper>
            </div>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  )
}

export default DoctorsTable
