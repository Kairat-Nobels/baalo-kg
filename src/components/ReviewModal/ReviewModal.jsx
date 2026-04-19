import { useEffect, useState } from 'react'
import styles from './reviewModal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import SuccessMessage from '../SuccessMessage/SuccessMessage'
import SpinnerModal from '../SpinnerModal/SpinnerModal'
import { createReview } from '../../redux/slices/reviewsSlice'

function ReviewModal({ setModal, company }) {
    const [result, setResult] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState('5')
    const [isValid, setIsValid] = useState(false)

    const dispatch = useDispatch()
    const { error, loading, success } = useSelector((state) => state.reviewsReducer)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    const closeModal = (e) => {
        if (!document.querySelector(`.${styles.form}`)?.contains(e.target) && !result) {
            document.body.style.overflow = ''
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

        const rew = {
            name,
            phone,
            comment,
            rating: Number(rating),
            companyId: company?.id,
            companyName: company?.name
        }

        dispatch(createReview(rew))
    }

    const handleClose = () => {
        document.body.style.overflow = ''
        setModal(false)
    }

    return (
        <div onClick={closeModal} className={styles.window}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div onClick={handleClose} className={styles.closeX}>
                    ×
                </div>

                <span className={styles.badge}>Baalo.kg</span>
                <h2>Оставить отзыв</h2>
                <p className={styles.subtext}>
                    {company?.name
                        ? `Поделитесь мнением о компании ${company.name}`
                        : 'Поделитесь своим мнением о компании и помогите другим пользователям сделать правильный выбор.'}
                </p>

                {result ? (
                    loading ? (
                        <div className={styles.loading}>
                            <SpinnerModal />
                            <p>Отзыв отправляется...</p>
                        </div>
                    ) : (
                        <div className={styles.message}>
                            {error ? (
                                <ErrorMessage message={error} />
                            ) : (
                                <SuccessMessage message={success || 'Спасибо за ваш отзыв!'} />
                            )}
                        </div>
                    )
                ) : (
                    <>
                        <div className={styles.formGroup}>
                            <label>Имя</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                type="text"
                                placeholder="Ваше имя"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Телефон</label>
                            <input
                                type="tel"
                                placeholder="777222333"
                                id="phone"
                                value={phone}
                                onChange={handlePhoneNumberChange}
                                required
                            />
                        </div>

                        {!isValid && phone.length > 0 && (
                            <p className={styles.errorText}>Номер телефона введён неправильно</p>
                        )}

                        <div className={styles.formGroup}>
                            <label>Оценка</label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                            >
                                <option value="5">5 — Отлично</option>
                                <option value="4">4 — Хорошо</option>
                                <option value="3">3 — Нормально</option>
                                <option value="2">2 — Слабо</option>
                                <option value="1">1 — Плохо</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Отзыв</label>
                            <textarea
                                maxLength={320}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                rows="4"
                                placeholder="Расскажите о вашем опыте"
                            ></textarea>
                        </div>

                        <button disabled={!isValid} type="submit">
                            Отправить отзыв
                        </button>
                    </>
                )}
            </form>
        </div>
    )
}

export default ReviewModal
