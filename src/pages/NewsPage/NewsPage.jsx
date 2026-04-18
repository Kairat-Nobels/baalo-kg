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
  const { news, loading, error } = useSelector(state => state.newsReducer)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className={styles.page}>
        <div className={styles.hero}>
          <h1>События и мероприятия</h1>
          <p>
            Следи за ближайшими ивентами Level Up Fitness: открытые тренировки,
            спортивные челленджи, мастер-классы и специальные мероприятия клуба.
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
              {news.map(item => (
                <SwiperSlide key={item.id}>
                  <div className={styles.newsCard}>
                    {item.image && (
                      <div className={styles.imgWrap}>
                        <img src={item.image} alt={item.title} />
                      </div>
                    )}

                    <div className={styles.newsContent}>
                      <div className={styles.badge}>Event</div>

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
          <h3 className={styles.noNews}>Пока нет предстоящих событий.</h3>
        )}
      </div>

      <Footer />
    </>
  )
}

export default NewsPage
