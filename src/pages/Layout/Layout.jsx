import { useDispatch } from 'react-redux'
import styles from './layout.module.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRecords } from '../../redux/slices/recordSlice'
import CameModal from '../../components/CameModal/CameModal'
import { getService } from '../../redux/slices/servicesSlice'
import { getReviews } from '../../redux/slices/reviewsSlice'
import { getNews } from '../../redux/slices/newsSlice'
import { getDoctors } from '../../redux/slices/doctorsSlice'

function Layout() {
    const [modal, setModal] = useState(false)
    const [burger, setBurger] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getRecords())
        dispatch(getService())
        dispatch(getDoctors())
        dispatch(getReviews())
        dispatch(getNews())
    }, [dispatch])

    useEffect(() => {
        document.body.style.overflow = burger ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }
    }, [burger])

    const handleAdminClick = () => {
        if (localStorage.getItem('admin') === 'true') {
            navigate('/admin')
        } else {
            setModal(true)
        }
    }

    return (
        <>
            <div className="container">
                <nav className={styles.navbar}>
                    <div className={styles.left}>
                        <NavLink className={styles.logo} to="/" onClick={() => setBurger(false)}>
                            <div className={styles.logoImg}>
                                <span>B</span>
                            </div>

                            <div className={styles.logoText}>
                                <h1>Baalo.kg</h1>
                                <p>Отзывы и рейтинг компаний Бишкека</p>
                            </div>
                        </NavLink>
                    </div>

                    <div className={styles.info}>
                        <ul>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => (isActive ? styles.active : '')}
                                >
                                    Главная
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/companies"
                                    className={({ isActive }) => (isActive ? styles.active : '')}
                                >
                                    Компании
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/news"
                                    className={({ isActive }) => (isActive ? styles.active : '')}
                                >
                                    Новости
                                </NavLink>
                            </li>
                        </ul>

                        <div>
                            <button className={styles.adminBtn} onClick={handleAdminClick}>
                                Админ-панель
                            </button>
                        </div>

                        <div className={styles.burger}>
                            <div
                                onClick={() => setBurger(!burger)}
                                className={styles.burgerBtn}
                            >
                                <p className={burger ? styles.close : ''}></p>
                            </div>

                            {burger && (
                                <div className={styles.burgerContent}>
                                    <div className={styles.mobileTop}>
                                        <div className={styles.logoMobile}>
                                            <div className={styles.logoImg}>
                                                <span>B</span>
                                            </div>
                                            <div className={styles.logoText}>
                                                <h1>Baalo.kg</h1>
                                                <p>Компании и отзывы</p>
                                            </div>
                                        </div>
                                    </div>

                                    <ul>
                                        <li>
                                            <NavLink
                                                onClick={() => setBurger(false)}
                                                to="/"
                                                className={({ isActive }) =>
                                                    isActive ? styles.active : ''
                                                }
                                            >
                                                Главная
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                onClick={() => setBurger(false)}
                                                to="/companies"
                                                className={({ isActive }) =>
                                                    isActive ? styles.active : ''
                                                }
                                            >
                                                Компании
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                onClick={() => setBurger(false)}
                                                to="/news"
                                                className={({ isActive }) =>
                                                    isActive ? styles.active : ''
                                                }
                                            >
                                                Новости
                                            </NavLink>
                                        </li>

                                        <div>
                                            <button
                                                className={styles.adminBtn}
                                                onClick={() => {
                                                    handleAdminClick()
                                                    setBurger(false)
                                                }}
                                            >
                                                Админ-панель
                                            </button>
                                        </div>
                                    </ul>

                                    <div className={styles.mobileInfo}>
                                        <p className={styles.tel}>
                                            <a href="tel:+996700123456">+996 700 123 456</a>
                                        </p>
                                        <p className={styles.workTime}>
                                            Платформа для поиска компаний, отзывов и рейтингов в
                                            Бишкеке
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {modal && <CameModal setModal={setModal} />}
            </div>

            <div className="outlet">
                <Outlet />
            </div>
        </>
    )
}

export default Layout
