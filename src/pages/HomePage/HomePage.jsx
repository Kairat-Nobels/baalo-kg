import styles from './homePage.module.css'
import about from '../../assets/images/aboutMen.webp'
import { useSelector } from 'react-redux'
import HomeCards from '../../components/HomeCards/HomeCards'
import SwipperSlider from '../../components/SwipperSlider/SwipperSlider'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from 'react'
import ReviewModal from '../../components/ReviewModal/ReviewModal'

function HomePage() {
  const { reviews } = useSelector(state => state.reviewsReducer)
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* HERO */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1>
            LEVEL UP FITNESS<br />
            ТВОЁ ТЕЛО — ТВОЙ УРОВЕНЬ
          </h1>
          <p>
            Персональные тренировки, современные программы<br />
            и атмосфера, которая заряжает результатом
          </p>
          <a href="#programs" className={styles.heroBtn}>
            НАЧАТЬ ТРЕНИРОВКИ
          </a>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section id="about" className={styles.advantages}>
        <h2 className={styles.advantagesTitle}>Почему выбирают нас</h2>

        <div className={styles.advList}>
          <div className={styles.advItem}>
            <span className={styles.advIcon}>💪</span>
            <h3>Профессиональные тренеры</h3>
            <p>Опытные специалисты помогут достичь результата быстрее</p>
          </div>

          <div className={styles.advItem}>
            <span className={styles.advIcon}>🏋️</span>
            <h3>Современное оборудование</h3>
            <p>Тренируйся на лучших тренажёрах и в комфортной среде</p>
          </div>

          <div className={styles.advItem}>
            <span className={styles.advIcon}>🔥</span>
            <h3>Результат с первых недель</h3>
            <p>Программы, которые реально работают</p>
          </div>

          <div className={styles.advItem}>
            <span className={styles.advIcon}>🕒</span>
            <h3>Гибкое расписание</h3>
            <p>Тренируйся в удобное для тебя время</p>
          </div>
        </div>
      </section>

      {/* О КЛУБЕ */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutImg}>
          <img src="https://blogger.googleusercontent.com/img/a/AVvXsEgfiE01trycwKLFy0QPhxvffwdasHWlevSjzo5SvxbLPguLtaWKk_-uldaqNsgWbLi1pbGZrqmDz_H8QzeObTytkR3yW-3puFkQ5ADFo4RF9ceOOshFH9_t5xhr9yHMQQT3ggy3lxEdg16S3VG1eWvHxHC5WD6GdeLOqVf1SX0XLsX4Dd4sfKBWT4HGJIE" alt="fitness" />
        </div>

        <div className={styles.aboutText}>
          <h2>О фитнес-клубе LEVEL UP</h2>

          <p>
            <b>LEVEL UP FITNESS — это современный фитнес-клуб, где ты выходишь на новый уровень.</b>
          </p>

          <p>
            Мы предлагаем силовые тренировки, кардио, функциональный тренинг и персональные программы.
            Всё это помогает не просто тренироваться, а реально менять тело и привычки.
          </p>

          <div className={styles.aboutListBlock}>
            <div className={styles.aboutListTitle}>Что ты получишь:</div>
            <ul className={styles.aboutList}>
              <li>— улучшение физической формы;</li>
              <li>— увеличение силы и выносливости;</li>
              <li>— снижение веса и жиросжигание;</li>
              <li>— уверенность в себе и дисциплину.</li>
            </ul>
          </div>

          <p>
            Мы не просто фитнес-клуб — это место, где ты становишься лучше каждый день.
          </p>
        </div>
      </section>

      {/* ПРОГРАММЫ */}
      <section id="programs" className={styles.servicesSection}>
        <h2>Наши тренировочные программы</h2>
        <HomeCards />
      </section>

      {/* ОТЗЫВЫ */}
      <section className={styles.reviewsSection}>
        <h2>Отзывы клиентов</h2>

        {reviews.length > 0 ? (
          <SwipperSlider items={reviews} />
        ) : (
          <div className={styles.noReviews}>
            Пока нет отзывов — будь первым 💪
          </div>
        )}
      </section>

      {/* КОНТАКТЫ */}
      <section className={styles.contactsSection}>
        <div className={styles.contactsContent}>
          <div className={styles.contactsInfo}>
            <h2>Контакты</h2>
            <p>г. Бишкек, фитнес-клуб LEVEL UP</p>
            <p>
              Телефон: <a href="tel:+996555563636">+996 555 563 636</a>
            </p>
            <p>Email: <a href="mailto:levelupfitness@gmail.com">levelupfitness@gmail.com</a></p>
            <p>Режим работы: ПН-ВС: 07:00 – 22:00</p>
          </div>

          <button onClick={() => setReviewModal(true)}>
            Оставить отзыв
          </button>
        </div>

        <div className={styles.contactsMap}>
          <iframe
            src="https://www.google.com/maps?q=Bishkek&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {reviewModal && <ReviewModal setModal={setReviewModal} />}

      <Footer />
    </>
  )
}

export default HomePage
