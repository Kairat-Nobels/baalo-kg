import styles from './review.module.css'
import image from '../../assets/images/userIcon.png'

function Review({ data }) {
    return (
        <div className={styles.review}>
            <div className={styles.top}>
                <span className={styles.quote}>“</span>
            </div>

            <div className={styles.comment}>
                <p>{data.comment}</p>
            </div>

            <div className={styles.head}>
                <div className={styles.imageUser}>
                    <img src={image} alt={data.name || 'user'} />
                </div>
                <div className={styles.userInfo}>
                    <h3>{data.name}</h3>
                    <span>Клиент Level Up Fitness</span>
                </div>
            </div>
        </div>
    )
}

export default Review
