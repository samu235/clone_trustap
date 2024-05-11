import styles from './Button.module.css'
const Button = ({
    children,
    onClick = () => { },
    className = null,
    disabled
}) => {

    return <button
        onClick={onClick}
        className={ `${styles.btn} ${className}`}
        disabled={disabled}
    >
        {children}
    </button>
}


export default Button;