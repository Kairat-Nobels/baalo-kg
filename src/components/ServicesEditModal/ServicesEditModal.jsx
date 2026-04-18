import React, { useEffect, useState } from 'react'
import { Modal, Form, Button, Input, SelectPicker } from 'rsuite'

const emptyCategory = {
  name: '',
  type: '',
  description: '',
  count: '',
  image: ''
}

const typeOptions = [
  { label: 'Общественное питание', value: 'Общественное питание' },
  { label: 'Красота и уход', value: 'Красота и уход' },
  { label: 'Автоуслуги', value: 'Автоуслуги' },
  { label: 'Магазины', value: 'Магазины' },
  { label: 'Медицина', value: 'Медицина' },
  { label: 'Образование', value: 'Образование' },
  { label: 'Услуги', value: 'Услуги' },
  { label: 'Другое', value: 'Другое' }
]

const ServiceEditModal = ({ open, onClose, serviceData, onSubmit }) => {
  const [formData, setFormData] = useState(emptyCategory)

  const isEdit = !!serviceData

  useEffect(() => {
    if (serviceData) {
      setFormData({
        name: serviceData.name || serviceData.title || '',
        type: serviceData.type || '',
        description: serviceData.description || '',
        count: serviceData.count || serviceData.companyCount || '',
        image: serviceData.image || ''
      })
    } else {
      setFormData(emptyCategory)
    }
  }, [serviceData])

  const handleChange = (value, key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    onSubmit(
      {
        ...formData,
        count: formData.count ? Number(formData.count) : ''
      },
      serviceData?.id
    )
  }

  const isDisabled = !formData.name || !formData.type || !formData.description

  return (
    <Modal open={open} onClose={onClose} size="md" className="category-modal">
      <Modal.Header>
        <Modal.Title>
          {isEdit ? 'Редактировать категорию' : 'Добавить категорию'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form fluid className="category-modal__form">
          <Form.Group>
            <Form.ControlLabel>Название категории</Form.ControlLabel>
            <Input
              value={formData.name}
              onChange={(val) => handleChange(val, 'name')}
              placeholder="Например, Кафе и рестораны"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Тип</Form.ControlLabel>
            <SelectPicker
              data={typeOptions}
              value={formData.type}
              onChange={(val) => handleChange(val || '', 'type')}
              placeholder="Выберите тип"
              style={{ width: '100%' }}
              searchable={false}
              cleanable
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Описание</Form.ControlLabel>
            <Input
              as="textarea"
              rows={5}
              value={formData.description}
              onChange={(val) => handleChange(val, 'description')}
              placeholder="Кратко опишите категорию"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Количество компаний</Form.ControlLabel>
            <Input
              type="number"
              value={formData.count}
              onChange={(val) => handleChange(val, 'count')}
              placeholder="Например, 24"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Ссылка на изображение</Form.ControlLabel>
            <Input
              value={formData.image}
              onChange={(val) => handleChange(val, 'image')}
              placeholder="https://..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleSave} appearance="primary" disabled={isDisabled}>
          Сохранить
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ServiceEditModal