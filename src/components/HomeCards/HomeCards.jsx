import styles from './homeCards.module.css'
import {
    FaDumbbell,
    FaHeartbeat,
    FaRunning,
    FaUserFriends,
    FaFireAlt,
    FaClock
} from 'react-icons/fa'

const cards = [
    {
        icon: <FaDumbbell size={32} />,
        title: 'Силовые тренировки',
        text: 'Программы для набора мышечной массы, увеличения силы и проработки всех основных групп мышц.'
    },
    {
        icon: <FaHeartbeat size={32} />,
        title: 'Кардио и выносливость',
        text: 'Тренировки для укрепления сердечно-сосудистой системы, повышения выносливости и активного жиросжигания.'
    },
    {
        icon: <FaRunning size={32} />,
        title: 'Функциональный тренинг',
        text: 'Комплексные упражнения на баланс, координацию, мобильность и общую физическую подготовку.'
    },
    {
        icon: <FaUserFriends size={32} />,
        title: 'Персональный подход',
        text: 'Индивидуальные рекомендации и сопровождение тренера с учётом твоих целей и уровня подготовки.'
    },
    {
        icon: <FaFireAlt size={32} />,
        title: 'Похудение и рельеф',
        text: 'Программы для снижения веса, ускорения метаболизма и формирования подтянутого тела.'
    },
    {
        icon: <FaClock size={32} />,
        title: 'Удобное расписание',
        text: 'Выбирай удобное время для тренировок и совмещай спорт с учёбой, работой и повседневной жизнью.'
    }
]

function HomeCards() {
    return (
        <div className={styles.cardsGrid}>
            {cards.map((card, idx) => (
                <div className={styles.card} key={idx}>
                    <div className={styles.icon}>{card.icon}</div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                </div>
            ))}
        </div>
    )
}

export default HomeCards
