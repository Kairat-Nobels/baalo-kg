import { useSelector } from 'react-redux'
import styles from './doctorsPage.module.css'
import DoctorCard from '../../components/DoctorCard/DoctorCard'
import { useEffect, useMemo, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Spinner from '../../components/Spinner/Spinner'
import AddCompanyRequestModal from '../../components/AddCompanyRequestModal/AddCompanyRequestModal'

function DoctorsPage() {
  const { doctors, loading, error } = useSelector((state) => state.doctorsReducer)
  const [search, setSearch] = useState('')
  const [requestModal, setRequestModal] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredCompanies = useMemo(() => {
    if (!Array.isArray(doctors)) return []

    return doctors.filter((company) =>
      company.name?.toLowerCase().includes(search.toLowerCase())
    )
  }, [doctors, search])

  return (
    <>
      <div className={styles.page}>
        <div className="container">
          <div className={styles.hero}>
            <span className={styles.badge}>Каталог компаний</span>

            <h1>Компании Бишкека</h1>

            <p>
              Находите компании, изучайте отзывы пользователей,
              сравнивайте рейтинг и выбирайте лучший сервис в одном месте.
            </p>

            <div className={styles.searchRow}>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="Поиск компании по названию..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button
                className={styles.addBtn}
                onClick={() => setRequestModal(true)}
              >
                Добавить компанию
              </button>
            </div>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.infoCard}>
              <h3>{filteredCompanies.length}</h3>
              <p>Найдено компаний</p>
            </div>

            <div className={styles.infoCard}>
              <h3>Baalo.kg</h3>
              <p>Платформа отзывов и рейтингов</p>
            </div>
          </div>

          <div className={styles.doctors}>
            {loading ? (
              <Spinner />
            ) : error ? (
              <div className="fetchError">
                <p>😕 Error: {error}</p>
                <p>Проверьте Интернет и обновите страницу</p>
              </div>
            ) : filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <DoctorCard key={company.id} data={company} />
              ))
            ) : (
              <div className={styles.empty}>
                Компании пока не добавлены
              </div>
            )}
          </div>
        </div>
      </div>

      {requestModal && <AddCompanyRequestModal setModal={setRequestModal} />}

      <Footer />
    </>
  )
}

export default DoctorsPage