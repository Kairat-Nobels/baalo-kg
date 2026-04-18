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
              src={rowData.img || rowData.image}
              alt={rowData.name}
              style={{
                width: 64,
                height: 64,
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
          )}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1.2}>
        <Table.HeaderCell>Имя</Table.HeaderCell>
        <Table.Cell dataKey="name" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Должность</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.position || rowData.subject || 'Тренер'}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1.3}>
        <Table.HeaderCell>Специализация</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.specialization || rowData.education || 'Не указана'}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={0.8}>
        <Table.HeaderCell>Стаж</Table.HeaderCell>
        <Table.Cell dataKey="experience" />
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
                  <MdEdit color="#1caf68" size={20} />
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
