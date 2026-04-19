import { useEffect, useMemo, useState } from 'react'
import styles from './servicePage.module.css'
import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import ReviewModal from '../../components/ReviewModal/ReviewModal'

function ServicePage() {
    const { id } = useParams()
    const { doctors = [], loading, error } = useSelector((state) => state.doctorsReducer)
    const { reviews = [] } = useSelector((state) => state.reviewsReducer)

    const [reviewModal, setReviewModal] = useState(false)

    const company = useMemo(() => {
        return doctors.find((item) => String(item.id) === String(id))
    }, [doctors, id])

    const companyReviews = useMemo(() => {
        if (!company) return []

        return reviews.filter(
            (item) =>
                String(item.companyId) === String(company.id) ||
                String(item.doctorId) === String(company.id)
        )
    }, [reviews, company])

    const averageRating = useMemo(() => {
        if (!companyReviews.length) return company?.rating

        const total = companyReviews.reduce((sum, item) => {
            return sum + Number(item.rating)
        }, 0)

        return (total / companyReviews.length).toFixed(1)
    }, [companyReviews, company])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (loading) {
        return (
            <>
                <div className={styles.page}>
                    <Spinner />
                </div>
                <Footer />
            </>
        )
    }

    if (error) {
        return (
            <>
                <div className={styles.page}>
                    <div className="fetchError">
                        <p>😕 Error: {error}</p>
                        <p>Проверьте интернет и обновите страницу</p>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    if (!company) {
        return (
            <>
                <div className={styles.page}>
                    <div className={styles.noData}>Компания не найдена</div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <div className={styles.page}>
                <div className="container">
                    <div className={styles.heroCard}>
                        <div className={styles.heroImage}>
                            <img
                                src={
                                    company.image ||
                                    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80'
                                }
                                alt={company.name}
                            />
                        </div>

                        <div className={styles.heroContent}>
                            <span className={styles.badge}>
                                {company.category || company.subject || 'Компания'}
                            </span>

                            <h1 className={styles.title}>{company.name}</h1>

                            <p className={styles.subtitle}>
                                {company.description ||
                                    company.about ||
                                    'Информация о компании, пользовательские отзывы и рейтинг на платформе Baalo.kg.'}
                            </p>

                            <div className={styles.stats}>
                                <div className={styles.statItem}>
                                    <span>Рейтинг</span>
                                    <strong>⭐ {averageRating}</strong>
                                </div>

                                <div className={styles.statItem}>
                                    <span>Отзывы</span>
                                    <strong>{companyReviews.length}</strong>
                                </div>

                                <div className={styles.statItem}>
                                    <span>Категория</span>
                                    <strong>{company.category || company.subject || 'Общая'}</strong>
                                </div>
                            </div>

                            <div className={styles.companyInfo}>
                                {company.address && (
                                    <p>
                                        <span>Адрес:</span> {company.address}
                                    </p>
                                )}

                                {company.phone && (
                                    <p>
                                        <span>Телефон:</span> {company.phone}
                                    </p>
                                )}

                                {company.website && (
                                    <p>
                                        <span>Сайт:</span> {company.website}
                                    </p>
                                )}
                            </div>

                            <button
                                className={styles.reviewBtn}
                                onClick={() => setReviewModal(true)}
                            >
                                Оставить отзыв
                            </button>
                        </div>
                    </div>

                    <div className={styles.contentGrid}>
                        <div className={styles.mainBlock}>
                            <h2>О компании</h2>
                            <p>
                                {company.fullDescription ||
                                    company.description ||
                                    company.about ||
                                    'На этой странице собрана основная информация о компании, её рейтинг и отзывы пользователей. Это помогает быстрее оценить качество услуг и принять решение.'}
                            </p>
                        </div>

                        <div className={styles.sideBlock}>
                            <h3>Кратко</h3>
                            <ul className={styles.shortInfo}>
                                <li>
                                    <span>Название:</span> {company.name}
                                </li>
                                <li>
                                    <span>Категория:</span>{' '}
                                    {company.category || company.subject || 'Не указана'}
                                </li>
                                <li>
                                    <span>Рейтинг:</span> ⭐ {averageRating}
                                </li>
                                <li>
                                    <span>Отзывов:</span> {companyReviews.length}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.reviewsSection}>
                        <div className={styles.reviewsHead}>
                            <h2>Отзывы пользователей</h2>
                            <p>Что пишут посетители о компании</p>
                        </div>

                        {companyReviews.length === 0 ? (
                            <div className={styles.noData}>
                                Пока отзывов нет. Будьте первым, кто оставит отзыв.
                            </div>
                        ) : (
                            <div className={styles.reviewsList}>
                                {companyReviews.map((item) => (
                                    <div className={styles.reviewCard} key={item.id}>
                                        <div className={styles.reviewTop}>
                                            <div className={styles.avatar}>
                                                {(item.userName || item.name || 'U').charAt(0)}
                                            </div>

                                            <div>
                                                <h4>{item.userName || item.name || 'Пользователь'}</h4>
                                                <span>⭐ {item.rating}</span>
                                            </div>
                                        </div>

                                        <p>{item.comment || item.text || 'Отзыв пользователя'}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {reviewModal && (
                <ReviewModal
                    setModal={setReviewModal}
                    company={company}
                />
            )}
            <Footer />
        </>
    )
}

export default ServicePage
