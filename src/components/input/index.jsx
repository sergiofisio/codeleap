import './styles.css'

export default function Input({ label, type, placeholder, value, set }) {
    return (
        <div className='input_container'>
            <label htmlFor={label}>{label}</label>

            {label !== 'Content'
                ? <input
                    id={label}
                    type={type}
                    placeholder={placeholder}
                    autoComplete="off"
                    onChange={(e) => set(e.target.value)}
                    value={value}
                    required
                />
                : <textarea
                    id={label}
                    name={label}
                    placeholder={placeholder}
                    value={value}
                    autoComplete="off"
                    onChange={(e) => set(e.target.value)}
                    required
                />}
        </div>
    )
}