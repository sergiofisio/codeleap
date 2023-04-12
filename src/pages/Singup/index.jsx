import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import darkMode from '../../assets/dark-mode.svg';
import lighMode from '../../assets/light-mode.svg';
import Button from '../../components/Button';
import Input from '../../components/input';
import { getItem, setItem } from '../../utils/storage';
import './styles.css';

export default function Singup() {

    const navigate = useNavigate();
    const root = document.querySelector(":root");
    const [mode, setMode] = useState(getItem('mode') || '')
    const [userName, setUserName] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        if (!userName) return alert('enter your username')
        setItem("username", userName)
        navigate("/main");
    }

    function handleMode() {

        if (mode === 'light') {
            setMode('dark')
            setItem('mode', mode)
            root.style.setProperty('--background-color', '#000')
            root.style.setProperty('--grey', '#000')
        } else {
            setItem('mode', mode)
            setMode('light')
            root.style.setProperty('--background-color', '#dddddd')
            root.style.setProperty('--grey', '#dddddd')
        }
    }

    useEffect(() => {
        handleMode()
    }, [])

    return (
        <div className="container_singup">
            <h2>Welcome to CodeLeap network!</h2>
            <img className='mode' onClick={handleMode} src={mode === 'light' ? lighMode : darkMode} alt={`icone ${mode} mode`} />
            <Input label='Please enter your username' type='text' placeholder='username' set={setUserName} value={userName} >{userName}</Input>
            <div className='button'>
                <Button classname={userName ? 'active' : 'inactive'} text='enter' onClick={handleSubmit} />
            </div>

        </div>
    )
}