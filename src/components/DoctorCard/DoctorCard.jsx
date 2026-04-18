import styles from './doctorCard.module.css'

function DoctorCard({ data }) {
    console.log(data);

    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={data.image} alt={data.name} />
            </div>

            <div className={styles.content}>
                <h3 className={styles.name}>{data.name}</h3>

                <div className={styles.role}>
                    {data.subject || 'Персональный тренер'}
                </div>

                <div className={styles.info}>
                    {data.experience && (
                        <p>
                            <span>Стаж:</span> {data.experience}
                        </p>
                    )}

                    {data.education && (
                        <p>
                            <span>Квалификация:</span> {data.education}
                        </p>
                    )}
                </div>

                {data.about && (
                    <div className={styles.about}>
                        {data.about}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorCard
