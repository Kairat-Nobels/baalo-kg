import { NavLink } from 'react-router-dom'
import styles from './footer.module.css'
import { FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { useState } from 'react'
import Modal from '../Modal/Modal'

function Footer() {
    const [modal, setModal] = useState(false)

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerTop}>
                    <NavLink className={styles.logo} to="/">
                        <div className={styles.logoImg}>
                            <span>B</span>
                        </div>

                        <div className={styles.logoText}>
                            <h1>Baalo.kg</h1>
                            <p>Отзывы и рейтинги компаний Бишкека</p>
                        </div>
                    </NavLink>

                    <div className={styles.socials}>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.instagram.com/"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://wa.me/996555575455"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>

                        <a href="tel:+996555575455" aria-label="Phone">
                            <FaPhoneAlt />
                        </a>
                    </div>
                </div>

                <div className={styles.footerContent}>
                    <div className={styles.infoBlock}>
                        <h3>Контакты</h3>

                        <div className={styles.contactItem}>
                            <FaMapMarkerAlt />
                            <p>г. Бишкек, Кыргызстан</p>
                        </div>

                        <div className={styles.contactItem}>
                            <FaPhoneAlt />
                            <p>
                                <a href="tel:+996555575455">+996 555 575 455</a>
                            </p>
                        </div>

                        <div className={styles.contactItem}>
                            <FaEnvelope />
                            <p>
                                <a href="mailto:info@baalo.kg">info@baalo.kg</a>
                            </p>
                        </div>

                        <p className={styles.contactText}>
                            Платформа для поиска компаний, чтения отзывов и просмотра
                            пользовательских рейтингов.
                        </p>
                    </div>

                    <div className={styles.infoBlock}>
                        <h3>Навигация</h3>
                        <ul className={styles.navList}>
                            <li>
                                <NavLink to="/">Главная</NavLink>
                            </li>
                            <li>
                                <NavLink to="/companies">Компании</NavLink>
                            </li>
                            <li>
                                <NavLink to="/news">Новости</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin">Админ-панель</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.actionBlock}>
                        <span className={styles.actionBadge}>Baalo.kg</span>
                        <h3>Поделитесь своим мнением</h3>
                        <p>
                            Оставляйте отзывы о компаниях, чтобы помочь другим людям
                            быстрее находить качественный сервис в Бишкеке.
                        </p>

                        <button onClick={() => setModal(true)} className={styles.linkBtn}>
                            Оставить отзыв
                        </button>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© 2026 Baalo.kg. Все права защищены.</p>
                </div>

                {modal && <Modal setModal={setModal} />}
            </div>
        </footer>
    )
}

export default Footer
