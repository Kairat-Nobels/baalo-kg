import { useEffect, useState } from 'react'
import styles from './addCompanyRequestModal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { createRecord } from '../../redux/slices/recordSlice'
import SpinnerModal from '../SpinnerModal/SpinnerModal'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import SuccessMessage from '../SuccessMessage/SuccessMessage'

function AddCompanyRequestModal({ setModal }) {
  const [result, setResult] = useState(false)

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [category, setCategory] = useState('')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')
  const [isValid, setIsValid] = useState(false)

  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.recordsReducer)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const closeModal = (e) => {
    if (!document.querySelector(`.${styles.form}`)?.contains(e.target) && !result) {
      setModal(false)
    }
  }

  const handlePhoneNumberChange = (event) => {
    let input = event.target.value
    input = input.replace(/\D/g, '')

    if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
      setIsValid(false)
      setPhone(input)
      return
    }

    input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3')
    setIsValid(/^\(\d{3}\)-\d{3}-\d{3}$/.test(input))
    setPhone(input)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setResult(true)

    dispatch(
      createRecord({
        fullName,
        phone,
        companyName,
        category,
        address,
        comment,
        status: 'Новая'
      })
    )
  }

  const handleClose = () => {
    setModal(false)
  }

  return (
    <div onClick={closeModal} className={styles.window}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div onClick={handleClose} className={styles.closeX}>
          ×
        </div>

        <span className={styles.badge}>Baalo.kg</span>
        <h2>Добавить компанию</h2>
        <p className={styles.subtext}>
          Оставьте заявку, и мы рассмотрим добавление компании в каталог.
        </p>

        {result ? (
          loading ? (
            <div className={styles.loading}>
              <SpinnerModal />
              <p>Заявка отправляется...</p>
            </div>
          ) : (
            <div className={styles.message}>
              {error ? (
                <ErrorMessage message={error} />
              ) : (
                <SuccessMessage message={success || 'Заявка успешно отправлена!'} />
              )}
            </div>
          )
        ) : (
          <>
            <div className={styles.formGroup}>
              <label>Ваше имя</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Введите имя"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Телефон</label>
              <input
                value={phone}
                onChange={handlePhoneNumberChange}
                required
                placeholder="777222333"
              />
            </div>

            {!isValid && phone.length > 0 && (
              <p className={styles.errorText}>Номер телефона введён неправильно</p>
            )}

            <div className={styles.formGroup}>
              <label>Название компании</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="Например, Navat"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Категория</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                placeholder="Например, Кафе и рестораны"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Адрес</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Например, г. Бишкек, ул. Киевская 95"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Комментарий</label>
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Дополнительная информация о компании"
              />
            </div>

            <button
              type="submit"
              disabled={
                !isValid ||
                !fullName ||
                !companyName ||
                !category ||
                !address
              }
            >
              Отправить заявку
            </button>
          </>
        )}
      </form>
    </div>
  )
}

export default AddCompanyRequestModal