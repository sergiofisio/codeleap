import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/input';
import { setItem } from '../../utils/storage';
import './styles.css';

export default function Singup() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        if (!userName) return alert('enter your username')
        setItem("username", userName)
        navigate("/main");
    }

    return (
        <div className="container_singup">
            <h2>Welcome to CodeLeap network!</h2>
            <Input label='Please enter your username' type='text' placeholder='username' set={setUserName} value={userName} >{userName}</Input>
            <div className='button'>
                <Button classname={userName ? 'active' : 'inactive'} text='enter' onClick={handleSubmit} />
            </div>

        </div>
    )
}