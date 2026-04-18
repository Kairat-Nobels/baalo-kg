import { useSelector } from 'react-redux'
import styles from './doctorsPage.module.css'
import DoctorCard from '../../components/DoctorCard/DoctorCard'
import { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Spinner from '../../components/Spinner/Spinner'

function DoctorsPage() {
  const { doctors, loading, error } = useSelector(state => state.doctorsReducer)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className={styles.page}>
        <div className={styles.hero}>
          <h1>Наши тренеры</h1>
          <p>
            Команда Level Up Fitness — это специалисты, которые помогут тебе
            улучшить форму, выработать дисциплину и прийти к реальному результату.
          </p>
        </div>

        <div className={styles.doctors}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="fetchError">
              <p>😕 Error: {error}</p>
              <p>Проверьте Интернет и обновите страницу</p>
            </div>
          ) : doctors.length > 0 ? (
            doctors.map(trainer => <DoctorCard key={trainer.id} data={trainer} />)
          ) : (
            <div className={styles.empty}>
              Пока тренеры не добавлены
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default DoctorsPage
