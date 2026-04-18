import { useEffect, useState } from 'react'
import styles from './cameModal.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAdmin } from '../../redux/slices/adminSlice'

function CameModal({ setModal }) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    const closeModal = (e) => {
        if (!document.querySelector(`.${styles.form}`)?.contains(e.target)) {
            setModal(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await dispatch(loginAdmin({ login, password }))

        if (res.meta.requestStatus === 'fulfilled') {
            setModal(false)
            navigate('/admin')
        }
    }

    return (
        <div onClick={closeModal} className={styles.window}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div onClick={() => setModal(false)} className={styles.closeX}>
                    ×
                </div>

                <span className={styles.badge}>Baalo.kg</span>

                <h2>Вход в админ-панель</h2>

                <p className={styles.text}>
                    Авторизуйтесь, чтобы управлять компаниями, отзывами, категориями и
                    новостями платформы.
                </p>

                <div className={styles.formGroup}>
                    <label htmlFor="admin-login">Логин</label>
                    <input
                        id="admin-login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        placeholder="Введите логин"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="admin-password">Пароль</label>
                    <input
                        id="admin-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        placeholder="Введите пароль"
                    />
                </div>

                <button type="submit">Войти</button>
            </form>
        </div>
    )
}

export default CameModal