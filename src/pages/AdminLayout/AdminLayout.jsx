import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button } from 'rsuite'
import styles from './adminLayout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { outAdmin } from '../../redux/slices/adminSlice'

function AdminLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { valid } = useSelector(state => state.adminReducer)
  const location = useLocation()

  useEffect(() => {
    if (valid && location.pathname === '/admin') {
      navigate('/admin/applications')
    }
  }, [valid, location.pathname, navigate])

  const handleLogout = () => {
    dispatch(outAdmin())
    navigate('/')
  }

  if (!valid) {
    return (
      <div className={styles.notWelcome}>
        <h2>Вы должны войти как администратор</h2>
        <Button appearance="primary" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.header}>
          <button className="adminBtn" onClick={() => navigate('/')}>
            На сайт
          </button>

          <div className={styles.titleBlock}>
            <h2>Панель администратора</h2>
            <p>Level Up Fitness</p>
          </div>

          <button className="adminBtn red" onClick={handleLogout}>
            Выйти
          </button>
        </div>

        <div className={styles.navbar}>
          <NavLink
            to="/admin/applications"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Заявки
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Отзывы
          </NavLink>

          <NavLink
            to="/admin/programs"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Расписание
          </NavLink>

          <NavLink
            to="/admin/trainers"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Тренеры
          </NavLink>

          <NavLink
            to="/admin/news"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            События
          </NavLink>
        </div>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
