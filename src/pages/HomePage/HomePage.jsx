import styles from './homePage.module.css'
import { useSelector } from 'react-redux'
import Footer from '../../components/Footer/Footer'
import { useEffect, useMemo, useState } from 'react'
import ReviewModal from '../../components/ReviewModal/ReviewModal'
import { Link } from 'react-router-dom'

function HomePage() {
  const { reviews } = useSelector((state) => state.reviewsReducer)
  const { doctors } = useSelector((state) => state.doctorsReducer)
  const { services } = useSelector((state) => state.servicesReducer)

  const [reviewModal, setReviewModal] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const companies = Array.isArray(doctors) ? doctors : []
  const categories = Array.isArray(services) ? services : []

  const filteredCompanies = useMemo(() => {
    return companies
      .filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 6)
  }, [companies, search])

  const stats = [
    {
      value: companies.length > 0 ? `${companies.length}+` : '50+',
      label: 'Компаний на платформе',
    },
    {
      value: reviews.length > 0 ? `${reviews.length}+` : '120+',
      label: 'Отзывов от пользователей',
    },
    {
      value: '4.8',
      label: 'Средний пользовательский рейтинг',
    },
    {
      value: '24/7',
      label: 'Доступ к платформе онлайн',
    },
  ]

  const advantages = [
    {
      title: 'Честные отзывы',
      text: 'Пользователи делятся реальным опытом взаимодействия с компаниями и сервисами в Бишкеке.',
      icon: '⭐',
    },
    {
      title: 'Удобный поиск',
      text: 'Легко находите нужную компанию по названию, категории и рейтингу.',
      icon: '🔎',
    },
    {
      title: 'Актуальные рейтинги',
      text: 'Оценки формируются на основе отзывов и помогают быстрее сравнивать бизнесы.',
      icon: '📊',
    },
    {
      title: 'Локальный сервис',
      text: 'Платформа ориентирована на компании Бишкека и удобна для местных пользователей.',
      icon: '📍',
    },
  ]

  return (
    <>
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroWrapper}>
            <div className={styles.heroText}>
              <span className={styles.heroBadge}>Baalo.kg</span>

              <h1>
                Рейтинги и отзывы
                <br />
                о компаниях Бишкека
              </h1>

              <p>
                Находите проверенные компании, изучайте отзывы,
                сравнивайте рейтинги и выбирайте лучшие сервисы
                для себя.
              </p>

              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="Поиск компании..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Link to="/companies" className={styles.searchBtn}>
                  Найти
                </Link>
              </div>

              <div className={styles.heroButtons}>
                <Link to="/companies" className={styles.primaryBtn}>
                  Смотреть компании
                </Link>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setReviewModal(true)}
                >
                  Оставить отзыв
                </button>
              </div>
            </div>

            <div className={styles.heroCard}>
              <div className={styles.heroCardTop}>
                <span className={styles.cardMini}>Популярно сейчас</span>
                <h3>Лучшие компании города</h3>
              </div>

              <div className={styles.ratingPreview}>
                <div>
                  <p className={styles.bigRate}>4.8</p>
                  <span>средняя оценка</span>
                </div>

                <div className={styles.stars}>★★★★★</div>
              </div>

              <div className={styles.miniList}>
                <div className={styles.miniItem}>
                  <span>Кафе и рестораны</span>
                  <b>120+ отзывов</b>
                </div>
                <div className={styles.miniItem}>
                  <span>Салоны красоты</span>
                  <b>95+ отзывов</b>
                </div>
                <div className={styles.miniItem}>
                  <span>СТО и автоуслуги</span>
                  <b>80+ отзывов</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((item, index) => (
              <div key={index} className={styles.statCard}>
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionBadge}>Категории</span>
              <h2>Популярные направления</h2>
            </div>

            <Link to="/companies" className={styles.sectionLink}>
              Все компании
            </Link>
          </div>

          <div className={styles.categoriesGrid}>
            {(categories.length > 0
              ? categories.slice(0, 6)
              : [
                { id: 1, name: 'Кафе и рестораны' },
                { id: 2, name: 'Салоны красоты' },
                { id: 3, name: 'СТО и автоуслуги' },
                { id: 4, name: 'Магазины' },
                { id: 5, name: 'Медицинские услуги' },
                { id: 6, name: 'Образование' },
              ]
            ).map((item) => (
              <div key={item.id} className={styles.categoryCard}>
                <div className={styles.categoryIcon}>🏢</div>
                <h3>{item.name}</h3>
                <p>Отзывы, оценки и информация о компаниях в этой категории</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.advantagesSection}>
        <div className="container">
          <div className={styles.sectionHeadCenter}>
            <span className={styles.sectionBadge}>Преимущества</span>
            <h2>Почему удобно пользоваться Baalo.kg</h2>
          </div>

          <div className={styles.advantagesGrid}>
            {advantages.map((item, index) => (
              <div key={index} className={styles.advCard}>
                <div className={styles.advIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.companiesSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionBadge}>Компании</span>
              <h2>Недавно добавленные компании</h2>
            </div>

            <Link to="/companies" className={styles.sectionLink}>
              Перейти в каталог
            </Link>
          </div>

          <div className={styles.companyGrid}>
            {(filteredCompanies.length > 0
              ? filteredCompanies
              : [
                {
                  id: 1,
                  name: 'Navat',
                  specialty: 'Кафе и рестораны',
                  experience: 'Рейтинг 4.9',
                  image:
                    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
                },
                {
                  id: 2,
                  name: 'Beauty Lab',
                  specialty: 'Салоны красоты',
                  experience: 'Рейтинг 4.7',
                  image:
                    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80',
                },
                {
                  id: 3,
                  name: 'Auto Expert',
                  specialty: 'СТО и автоуслуги',
                  experience: 'Рейтинг 4.6',
                  image:
                    'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80',
                },
              ]
            ).map((item) => (
              <div key={item.id} className={styles.companyCard}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.companyImage}
                />

                <div className={styles.companyBody}>
                  <span className={styles.companyCategory}>
                    {item.specialty || 'Категория компании'}
                  </span>

                  <h3>{item.name}</h3>

                  <p>{item.experience || 'Рейтинг и краткая информация'}</p>

                  <Link
                    to={`/companies/${item.id}`}
                    className={styles.cardLink}
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionBadge}>Отзывы</span>
              <h2>Что пишут пользователи</h2>
            </div>
          </div>

          <div className={styles.reviewsGrid}>
            {(reviews.length > 0
              ? reviews.slice(0, 3)
              : [
                {
                  id: 1,
                  name: 'Айжан',
                  text: 'Очень удобно искать компании и читать реальные отзывы перед выбором.',
                },
                {
                  id: 2,
                  name: 'Нурсултан',
                  text: 'Понравился простой интерфейс и возможность быстро сравнить рейтинг нескольких мест.',
                },
                {
                  id: 3,
                  name: 'Элина',
                  text: 'Хорошая идея для Бишкека. Особенно полезно для кафе, салонов и сервисов.',
                },
              ]
            ).map((item) => (
              <div key={item.id} className={styles.reviewCard}>
                <div className={styles.reviewTop}>
                  <div className={styles.reviewAvatar}>
                    {(item.name || item.userName || 'U').charAt(0)}
                  </div>

                  <div>
                    <h4>{item.name || item.userName || 'Пользователь'}</h4>
                    <span>★★★★★</span>
                  </div>
                </div>

                <p>{item.text || item.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div>
              <span className={styles.sectionBadge}>Baalo.kg</span>
              <h2>Помогайте другим выбирать лучше</h2>
              <p>
                Делитесь опытом, оценивайте компании и делайте
                городской сервис прозрачнее и удобнее.
              </p>
            </div>

            <button
              className={styles.primaryBtn}
              onClick={() => setReviewModal(true)}
            >
              Оставить отзыв
            </button>
          </div>
        </div>
      </section>

      {reviewModal && <ReviewModal setModal={setReviewModal} />}

      <Footer />
    </>
  )
}

export default HomePage
