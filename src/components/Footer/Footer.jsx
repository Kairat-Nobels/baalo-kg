import { NavLink } from 'react-router-dom'
import styles from './footer.module.css'
import { FaInstagram, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'
import { useState } from 'react'
import Modal from '../Modal/Modal'

function Footer() {
    const [modal, setModal] = useState(false)

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerTop}>
                    <NavLink className={styles.logo} to="/">
                        <h1>LEVEL</h1>
                        <div className={styles.logoImg}>
                            <span>UP</span>
                        </div>
                        <h1>FITNESS</h1>
                    </NavLink>

                    <div className={styles.socials}>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.instagram.com/fitness.levelup/"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://wa.me/996555563636"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>

                        <a href="tel:+996555563636" aria-label="Phone">
                            <FaPhoneAlt />
                        </a>
                    </div>
                </div>

                <div className={styles.footerContent}>
                    <div className={styles.infoBlock}>
                        <h3>Контакты</h3>
                        <p>г. Бишкек, Level Up Fitness</p>
                        <p>
                            Телефон: <a href="tel:+996700123456">+996 700 123 456</a>
                        </p>
                        <p>
                            Email:{' '}
                            <a href="mailto:levelupfitness@gmail.com">
                                levelupfitness@gmail.com
                            </a>
                        </p>
                        <p>Режим работы: ПН-ВС, 07:00 – 22:00</p>
                    </div>

                    <div className={styles.infoBlock}>
                        <h3>Навигация</h3>
                        <ul className={styles.navList}>
                            <li><NavLink to="/">Главная</NavLink></li>
                            <li><NavLink to="/schedule">Расписание</NavLink></li>
                            <li><NavLink to="/trainers">Тренеры</NavLink></li>
                            <li><NavLink to="/news">Новости</NavLink></li>
                        </ul>
                    </div>

                    <div className={styles.actionBlock}>
                        <h3>Готов начать?</h3>
                        <p>
                            Оставь заявку и начни тренировки вместе с Level Up Fitness
                        </p>
                        <button onClick={() => setModal(true)} className={styles.linkBtn}>
                            Оставить заявку
                        </button>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© 2026 Level Up Fitness. Все права защищены.</p>
                </div>

                {modal && <Modal setModal={setModal} />}
            </div>
        </footer>
    )
}

export default Footer
