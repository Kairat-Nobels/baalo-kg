import React, { useEffect, useState, useRef } from 'react'
import { Modal, Button, Form, Schema, Uploader, Input } from 'rsuite'
import { useDispatch } from 'react-redux'
import { createDoctor, updateDoctor } from '../../redux/slices/doctorsSlice'

const { StringType, NumberType } = Schema.Types

const model = Schema.Model({
  name: StringType().isRequired('Укажите название компании'),
  category: StringType().isRequired('Укажите категорию'),
  address: StringType().isRequired('Укажите адрес'),
  phone: StringType().isRequired('Укажите телефон'),
  description: StringType().isRequired('Укажите описание'),
  rating: NumberType().isRequired('Укажите рейтинг'),
})

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
))

const DoctorModalForm = ({ open, onClose, doctorData }) => {
  const dispatch = useDispatch()
  const formRef = useRef()

  const [formValue, setFormValue] = useState({
    name: '',
    category: '',
    address: '',
    phone: '',
    rating: 5,
    description: '',
    website: '',
  })

  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    if (doctorData) {
      setFormValue({
        name: doctorData.name || '',
        category: doctorData.category || doctorData.subject || '',
        address: doctorData.address || '',
        phone: doctorData.phone || '',
        rating: Number(doctorData.rating || 5),
        description: doctorData.description || doctorData.about || '',
        website: doctorData.website || '',
      })
      setImgUrl(doctorData.image || doctorData.img || '')
    } else {
      setFormValue({
        name: '',
        category: '',
        address: '',
        phone: '',
        rating: 5,
        description: '',
        website: '',
      })
      setImgUrl('')
    }
  }, [doctorData])

  const handleSubmit = () => {
    if (!formRef.current.check()) return

    const payload = {
      ...formValue,
      image: imgUrl,
      img: imgUrl,
    }

    if (doctorData) {
      dispatch(updateDoctor({ id: doctorData.id, updatedData: payload }))
    } else {
      dispatch(createDoctor(payload))
    }

    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} size="md" className="doctor-modal">
      <Modal.Header>
        <Modal.Title>
          {doctorData ? 'Редактировать компанию' : 'Добавить компанию'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="doctor-modal__img">
          {imgUrl && (
            <img
              src={imgUrl}
              alt="company"
              style={{ width: '100%', borderRadius: 8 }}
            />
          )}

          <Uploader
            action="https://cb78bf6d31726098.mokky.dev/uploads"
            name="file"
            autoUpload
            style={{ marginTop: '15px' }}
            fileListVisible={false}
            onSuccess={(res) => {
              const url = res?.url
              if (url) setImgUrl(url)
            }}
          >
            <Button appearance="ghost">Загрузить фото</Button>
          </Uploader>

          <Input
            placeholder="Или вставьте ссылку на изображение"
            value={imgUrl}
            onChange={setImgUrl}
            style={{ marginTop: 10 }}
          />
        </div>

        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          fluid
          className="doctor-modal__form"
        >
          <Form.Group>
            <Form.ControlLabel>Название компании:</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Категория:</Form.ControlLabel>
            <Form.Control
              name="category"
              placeholder="Например, Кафе, Салон красоты, СТО"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Адрес:</Form.ControlLabel>
            <Form.Control
              name="address"
              placeholder="Например, г. Бишкек, ул. Киевская 95"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Телефон:</Form.ControlLabel>
            <Form.Control
              name="phone"
              placeholder="Например, +996 700 123 456"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Рейтинг:</Form.ControlLabel>
            <Form.Control
              name="rating"
              type="number"
              min={1}
              max={5}
              step={0.1}
              placeholder="Например, 4.8"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Сайт:</Form.ControlLabel>
            <Form.Control
              name="website"
              placeholder="Например, https://company.kg"
            />
          </Form.Group>

          <Form.Group className="doctor-modal__textarea">
            <Form.ControlLabel>Описание компании:</Form.ControlLabel>
            <Form.Control name="description" accepter={Textarea} rows={4} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          disabled={
            !formValue.name ||
            !formValue.category ||
            !formValue.address ||
            !formValue.phone ||
            !formValue.description
          }
          appearance="primary"
          onClick={handleSubmit}
        >
          {doctorData ? 'Сохранить изменения' : 'Добавить компанию'}
        </Button>

        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DoctorModalForm
