import { useEffect, useMemo, useState } from 'react'
import styles from './servicePage.module.css'
import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'

function ServicePage() {
    const { services = [], loading, error } = useSelector(state => state.servicesReducer)

    const normalizedSchedule = useMemo(() => {
        if (!Array.isArray(services)) return []

        return services.flatMap(item => {
            if (item?.schedule && Array.isArray(item.schedule)) {
                return item.schedule.flatMap(dayItem => {
                    if (!Array.isArray(dayItem.lessons)) return []

                    return dayItem.lessons.map((lesson, index) => ({
                        id: `${item.id || 'old'}-${dayItem.day}-${lesson.number || index}`,
                        day: dayItem.day || 'Не указан день',
                        title: lesson.subject || item.name || 'Тренировка',
                        trainer: lesson.teacher || 'Тренер не указан',
                        startTime: lesson.timeStart || '',
                        endTime: lesson.timeEnd || '',
                        hall: lesson.room || 'Зал не указан',
                    }))
                })
            }

            return [
                {
                    id: item.id,
                    day: item.day || 'Не указан день',
                    title: item.program || item.title || item.name || 'Тренировка',
                    trainer: item.trainer || 'Тренер не указан',
                    startTime: item.startTime || '',
                    endTime: item.endTime || '',
                    hall: item.hall || item.room || 'Зал не указан',
                }
            ]
        })
    }, [services])

    const dayList = useMemo(() => {
        return ['Все дни', ...new Set(normalizedSchedule.map(item => item.day).filter(Boolean))]
    }, [normalizedSchedule])

    const trainerList = useMemo(() => {
        return ['Все тренеры', ...new Set(normalizedSchedule.map(item => item.trainer).filter(Boolean))]
    }, [normalizedSchedule])

    const [selectedDay, setSelectedDay] = useState('Все дни')
    const [selectedTrainer, setSelectedTrainer] = useState('Все тренеры')

    const filteredSchedule = useMemo(() => {
        return normalizedSchedule.filter(item => {
            const dayMatch = selectedDay === 'Все дни' || item.day === selectedDay
            const trainerMatch =
                selectedTrainer === 'Все тренеры' || item.trainer === selectedTrainer

            return dayMatch && trainerMatch
        })
    }, [normalizedSchedule, selectedDay, selectedTrainer])

    const groupedByDay = useMemo(() => {
        return filteredSchedule.reduce((acc, item) => {
            if (!acc[item.day]) {
                acc[item.day] = []
            }

            acc[item.day].push(item)
            return acc
        }, {})
    }, [filteredSchedule])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Расписание тренировок</h2>

            <p className={styles.subtitle}>
                Выберите день и тренера, чтобы посмотреть доступные занятия
            </p>

            <div className={styles.filters}>
                <select
                    value={selectedDay}
                    onChange={e => setSelectedDay(e.target.value)}
                    className={styles.select}
                >
                    {dayList.map(day => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedTrainer}
                    onChange={e => setSelectedTrainer(e.target.value)}
                    className={styles.select}
                >
                    {trainerList.map(trainer => (
                        <option key={trainer} value={trainer}>
                            {trainer}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.scheduleWrap}>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <div className="fetchError">
                        <p>😕 Error: {error}</p>
                        <p>Проверьте интернет и обновите страницу</p>
                    </div>
                ) : filteredSchedule.length === 0 ? (
                    <div className={styles.noData}>
                        По выбранным параметрам пока нет тренировок
                    </div>
                ) : (
                    Object.entries(groupedByDay).map(([day, workouts]) => (
                        <div key={day}>
                            <h3 className={styles.dayGroupTitle}>{day}</h3>

                            <div className={styles.daysColumn}>
                                <div className={styles.dayCard}>
                                    <div className={styles.lessonsList}>
                                        {workouts.map(workout => (
                                            <div className={styles.lessonRow} key={workout.id}>
                                                <div className={styles.time}>
                                                    {workout.startTime && workout.endTime
                                                        ? `${workout.startTime} – ${workout.endTime}`
                                                        : 'Время уточняется'}
                                                </div>

                                                <div className={styles.lessonInfo}>
                                                    <p className={styles.subject}>
                                                        <b>{workout.title}</b>
                                                    </p>
                                                    <p className={styles.teacher}>
                                                        {workout.trainer}
                                                    </p>
                                                    <p className={styles.room}>
                                                        {workout.hall}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ServicePage
