import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './newsPage.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Footer from '../../components/Footer/Footer'

const NewsPage = () => {
  const { news, loading, error } = useSelector((state) => state.newsReducer)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className={styles.page}>
        <div className="container">
          <div className={styles.hero}>
            <span className={styles.badgeTop}>Новости</span>

            <h1>Новости и обновления компаний</h1>

            <p>
              Следите за новостями компаний Бишкека: открытиями, акциями,
              обновлениями сервисов, специальными предложениями и важными
              событиями бизнеса.
            </p>
          </div>

          {loading ? (
            <div className={styles.spinner}>Загрузка...</div>
          ) : error ? (
            <div className="fetchError">
              <p>😕 Error: {error}</p>
              <p>Проверьте Интернет и обновите страницу</p>
            </div>
          ) : news.length > 0 ? (
            <div className={`${styles.newsSlider} newsSlider`}>
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={24}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  700: { slidesPerView: 2 }
                }}
              >
                {news.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className={styles.newsCard}>
                      {item.image && (
                        <div className={styles.imgWrap}>
                          <img src={item.image} alt={item.title} />
                        </div>
                      )}

                      <div className={styles.newsContent}>
                        <div className={styles.badge}>Новость</div>

                        <h3>{item.title}</h3>

                        {item.subtitle && (
                          <div className={styles.subtitle}>{item.subtitle}</div>
                        )}

                        {item.date && <div className={styles.date}>{item.date}</div>}

                        <p>{item.text}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <h3 className={styles.noNews}>Пока новостей нет.</h3>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default NewsPage
