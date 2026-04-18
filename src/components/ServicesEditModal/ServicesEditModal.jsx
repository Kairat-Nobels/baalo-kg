import React, { useEffect, useState } from 'react'
import { Modal, Form, Button, Input, TimePicker, SelectPicker } from 'rsuite'

const emptyWorkout = {
  day: '',
  program: '',
  trainer: '',
  startTime: '',
  endTime: '',
  hall: '',
  level: '',
  duration: ''
}

const dayOptions = [
  { label: 'Понедельник', value: 'Понедельник' },
  { label: 'Вторник', value: 'Вторник' },
  { label: 'Среда', value: 'Среда' },
  { label: 'Четверг', value: 'Четверг' },
  { label: 'Пятница', value: 'Пятница' },
  { label: 'Суббота', value: 'Суббота' },
  { label: 'Воскресенье', value: 'Воскресенье' }
]

const levelOptions = [
  { label: 'Начальный', value: 'Начальный' },
  { label: 'Средний', value: 'Средний' },
  { label: 'Продвинутый', value: 'Продвинутый' },
  { label: 'Все уровни', value: 'Все уровни' },
  { label: 'Индивидуально', value: 'Индивидуально' }
]

const ServiceEditModal = ({ open, onClose, serviceData, onSubmit }) => {
  const [formData, setFormData] = useState(emptyWorkout)

  const isEdit = !!serviceData

  useEffect(() => {
    if (serviceData) {
      setFormData({
        day: serviceData.day || '',
        program: serviceData.program || serviceData.title || '',
        trainer: serviceData.trainer || '',
        startTime: serviceData.startTime || '',
        endTime: serviceData.endTime || '',
        hall: serviceData.hall || serviceData.room || '',
        level: serviceData.level || '',
        duration: serviceData.duration || ''
      })
    } else {
      setFormData(emptyWorkout)
    }
  }, [serviceData])

  const handleChange = (value, key) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    onSubmit(formData, serviceData?.id)
  }

  const isDisabled =
    !formData.day ||
    !formData.program ||
    !formData.trainer ||
    !formData.startTime ||
    !formData.endTime ||
    !formData.hall

  return (
    <Modal open={open} onClose={onClose} size={560}>
      <Modal.Header>
        <Modal.Title>
          {isEdit ? 'Редактировать тренировку' : 'Добавить тренировку'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form fluid className="sheduleForm">
          <Form.Group>
            <Form.ControlLabel>День</Form.ControlLabel>
            <SelectPicker
              data={dayOptions}
              value={formData.day}
              onChange={val => handleChange(val || '', 'day')}
              placeholder="Выберите день"
              style={{ width: '100%' }}
              searchable={false}
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Программа</Form.ControlLabel>
            <Input
              value={formData.program}
              onChange={val => handleChange(val, 'program')}
              placeholder="Например, Функциональный тренинг"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Тренер</Form.ControlLabel>
            <Input
              value={formData.trainer}
              onChange={val => handleChange(val, 'trainer')}
              placeholder="Например, Алина Осмонова"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel style={{ display: 'block', whiteSpace: 'nowrap' }}>
              Время начала
            </Form.ControlLabel>
            <TimePicker
              format="HH:mm"
              value={formData.startTime ? new Date(`1970-01-01T${formData.startTime}:00`) : null}
              onChange={val =>
                handleChange(val ? val.toTimeString().slice(0, 5) : '', 'startTime')
              }
              placeholder="08:00"
              style={{ width: '100%' }}
              cleanable
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel style={{ display: 'block', whiteSpace: 'nowrap' }}>
              Время окончания
            </Form.ControlLabel>
            <TimePicker
              format="HH:mm"
              value={formData.endTime ? new Date(`1970-01-01T${formData.endTime}:00`) : null}
              onChange={val =>
                handleChange(val ? val.toTimeString().slice(0, 5) : '', 'endTime')
              }
              placeholder="09:00"
              style={{ width: '100%' }}
              cleanable
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Зал</Form.ControlLabel>
            <Input
              value={formData.hall}
              onChange={val => handleChange(val, 'hall')}
              placeholder="Например, Зал A"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Уровень</Form.ControlLabel>
            <SelectPicker
              data={levelOptions}
              value={formData.level}
              onChange={val => handleChange(val || '', 'level')}
              placeholder="Выберите уровень"
              style={{ width: '100%' }}
              searchable={false}
              cleanable
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Длительность</Form.ControlLabel>
            <Input
              value={formData.duration}
              onChange={val => handleChange(val, 'duration')}
              placeholder="Например, 60 мин"
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
