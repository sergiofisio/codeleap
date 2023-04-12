import './styles.css'

export default function Button({ type, classname, text, onClick }) {
    return (
        <button type={type} className={classname} onClick={onClick}>{text}</button>
    )
}