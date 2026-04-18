import React, { useState } from 'react'
import styles from './modal.module.css'
import SuccessMessage from '../SuccessMessage/SuccessMessage'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { createRecord } from '../../redux/slices/recordSlice'

const Modal = ({ setModal }) => {
  const [result, setResult] = useState(false)

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [requestType, setRequestType] = useState('Пробная тренировка')
  const [membership, setMembership] = useState('Месячный абонемент')
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const { error, loading, success } = useSelector(state => state.recordsReducer)

  const handleSubmit = e => {
    e.preventDefault()
    setResult(true)

    const application = {
      fullName,
      phone,
      requestType,
      membership,
      comment,
      status: 'Новая'
    }

    dispatch(createRecord(application))
  }

  const handleClose = () => {
    document.body.style.overflow = ''
    setModal(false)
  }

  return (
    <div className={styles.window}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>Заявка в Level Up Fitness</h2>
        <section onClick={handleClose} className={styles.closeX}>×</section>

        {result ? (
          loading ? (
            <div className={styles.loading}>
              <p>Отправка...</p>
            </div>
          ) : (
            <div className={styles.message}>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={handleClose}
              >
                ×
              </button>

              {error ? (
                <ErrorMessage message={error} />
              ) : (
                <SuccessMessage
                  message={success || 'Заявка успешно отправлена! Мы скоро свяжемся с вами.'}
                />
              )}
            </div>
          )
        ) : (
          <>
            <div className={styles.formGroup}>
              <label>Ваше имя:</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                placeholder="Кайрат"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Телефон:</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                placeholder="+996 700 123 456"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Формат заявки:</label>
              <select
                value={requestType}
                onChange={e => setRequestType(e.target.value)}
              >
                <option value="Пробная тренировка">Пробная тренировка</option>
                <option value="Консультация">Консультация</option>
                <option value="Покупка абонемента">Покупка абонемента</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Тариф:</label>
              <select
                value={membership}
                onChange={e => setMembership(e.target.value)}
              >
                <option value="Месячный абонемент">Месячный абонемент</option>
                <option value="Безлимитный абонемент">Безлимитный абонемент</option>
                <option value="Персональные тренировки">Персональные тренировки</option>
                <option value="Групповые занятия">Групповые занятия</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Комментарий:</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Например: хочу заниматься вечером или интересует пробное занятие"
                rows={3}
              />
            </div>

            <button type="submit">Отправить заявку</button>
          </>
        )}
      </form>
    </div>
  )
}

export default Modal