import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        toast.success(`Bem vindo ${userName}, você esta logado`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000
        });
        setTimeout(() => {
            navigate("/main");
        }, 5000);
    }

    return (
        <div className="container_singup">
            <ToastContainer />
            <h2>Welcome to CodeLeap network!</h2>
            <Input label='Please enter your username' type='text' placeholder='username' set={setUserName} value={userName} >{userName}</Input>
            <div className='button'>
                <Button classname={userName ? 'active' : 'inactive'} text='enter' onClick={handleSubmit} />
            </div>

        </div>
    )
}