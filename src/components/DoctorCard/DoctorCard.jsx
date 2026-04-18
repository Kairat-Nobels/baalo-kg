import styles from './doctorCard.module.css'
import { Link } from 'react-router-dom'

function DoctorCard({ data }) {
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img
                    src={
                        data.image ||
                        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80'
                    }
                    alt={data.name}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.top}>
                    <h3 className={styles.name}>{data.name}</h3>

                    <span className={styles.rating}>
                        ⭐ {data.rating || '4.5'}
                    </span>
                </div>

                <div className={styles.category}>
                    {data.category || data.subject || 'Категория компании'}
                </div>

                {data.address && (
                    <p className={styles.address}>
                        📍 {data.address}
                    </p>
                )}

                {data.phone && (
                    <p className={styles.phone}>
                        📞 {data.phone}
                    </p>
                )}

                {data.description && (
                    <div className={styles.about}>
                        {data.description}
                    </div>
                )}

                <Link to={`/companies/${data.id}`} className={styles.btn}>
                    Подробнее
                </Link>
            </div>
        </div>
    )
}

export default DoctorCard
