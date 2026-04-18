import React, { useEffect, useState, useRef } from 'react'
import {
  Modal,
  Button,
  Form,
  Schema,
  Uploader,
  Input,
} from 'rsuite'
import { useDispatch } from 'react-redux'
import { createDoctor, updateDoctor } from '../../redux/slices/doctorsSlice'

const { StringType } = Schema.Types

const model = Schema.Model({
  name: StringType().isRequired('Укажите имя'),
  position: StringType().isRequired('Укажите должность'),
  specialization: StringType().isRequired('Укажите специализацию'),
  experience: StringType().isRequired('Укажите стаж'),
  about: StringType().isRequired('Укажите описание'),
})

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
))

const DoctorModalForm = ({ open, onClose, doctorData }) => {
  const dispatch = useDispatch()
  const formRef = useRef()

  const [formValue, setFormValue] = useState({
    name: '',
    position: '',
    specialization: '',
    experience: '',
    about: '',
  })
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    if (doctorData) {
      setFormValue({
        name: doctorData.name || '',
        position: doctorData.position || doctorData.subject || '',
        specialization: doctorData.specialization || doctorData.education || '',
        experience: doctorData.experience || '',
        about: doctorData.about || '',
      })
      setImgUrl(doctorData.image || doctorData.img || '')
    } else {
      setFormValue({
        name: '',
        position: '',
        specialization: '',
        experience: '',
        about: '',
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
          {doctorData ? 'Редактировать тренера' : 'Добавить тренера'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="doctor-modal__img">
          {imgUrl && (
            <img
              src={imgUrl}
              alt="trainer"
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
            <Form.ControlLabel>Имя тренера:</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Должность:</Form.ControlLabel>
            <Form.Control name="position" placeholder="Например, Персональный тренер" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Специализация:</Form.ControlLabel>
            <Form.Control
              name="specialization"
              placeholder="Например, Функциональный тренинг, кардио, снижение веса"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Стаж:</Form.ControlLabel>
            <Form.Control name="experience" placeholder="Например, 6 лет" />
          </Form.Group>

          <Form.Group className="doctor-modal__textarea">
            <Form.ControlLabel>О тренере:</Form.ControlLabel>
            <Form.Control name="about" accepter={Textarea} rows={4} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          disabled={
            !formValue.name ||
            !formValue.position ||
            !formValue.specialization ||
            !formValue.experience ||
            !formValue.about
          }
          appearance="primary"
          onClick={handleSubmit}
        >
          {doctorData ? 'Сохранить изменения' : 'Добавить тренера'}
        </Button>

        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DoctorModalForm
