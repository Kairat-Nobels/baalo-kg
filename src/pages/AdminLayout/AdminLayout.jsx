import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button } from 'rsuite'
import styles from './adminLayout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { outAdmin } from '../../redux/slices/adminSlice'

function AdminLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { valid } = useSelector((state) => state.adminReducer)
  const location = useLocation()

  useEffect(() => {
    if (valid && location.pathname === '/admin') {
      navigate('/admin/companies')
    }
  }, [valid, location.pathname, navigate])

  const handleLogout = () => {
    dispatch(outAdmin())
    navigate('/')
  }

  if (!valid) {
    return (
      <div className={styles.notWelcome}>
        <h2>Доступ разрешён только администратору</h2>
        <Button appearance="primary" onClick={handleLogout}>
          На главную
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
            <p>Baalo.kg — управление платформой</p>
          </div>

          <button className="adminBtn red" onClick={handleLogout}>
            Выйти
          </button>
        </div>

        <div className={styles.navbar}>
          <NavLink
            to="/admin/companies"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Компании
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Категории
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Отзывы
          </NavLink>

          <NavLink
            to="/admin/requests"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Заявки
          </NavLink>

          <NavLink
            to="/admin/news"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Новости
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
