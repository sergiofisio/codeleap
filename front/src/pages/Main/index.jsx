import { useEffect, useState } from 'react';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import Button from '../../components/Button';
import Input from '../../components/input';
import { default as axios, default as axiosPrivate } from "../../service/api";
import { getItem } from '../../utils/storage';
import Modal from '../Modal';
import './styles.css';

export default function Main() {
    const [allPost, setAllPost] = useState([])
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [modal, setModal] = useState({
        id: '',
        type: '',
        open: false
    })

    const user = getItem('username')

    async function getPost() {
        try {
            const { data: { results } } = await axios.get('careers/?limit=1000&offset=0')
            setData(results)
        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        try {
            await axiosPrivate.post(
                'careers/',
                {
                    username: user,
                    title,
                    content,
                }
            )
            setTitle('')
            setContent('')
            getPost()
        } catch (error) {
            console.log(error);
        }
    }

    function handleOpenModal(e) {
        e.stopPropagation()
        setModal({
            id: e.target.id,
            type: e.target.className,
            open: true,
        })
    }


    useEffect(() => {
        getPost()
        const interval = setInterval(() => {
            getPost()
        }, 10000)
        return () => clearInterval(interval)
    }, [modal])

    return (
        <div className="container_main">
            <div className="create_post">
                <div className="header_create_post"><h2>CodeLeap Network</h2></div>
                <form className='form_create' onSubmit={handleSubmit}>
                    <h2>What’s on your mind?</h2>
                    <Input label='Title' type='text' placeholder='title' set={setTitle} value={title} />
                    <Input label='Content' type='text' placeholder='Content here' set={setContent} value={content} />
                    <div className='button'>
                        <Button type='submit' classname={title && content ? 'active' : 'inactive'} text='create' />
                    </div>
                </form>
            </div>
            <div className="posts">
                {data && data.map(({ title, username, content, id, created_datetime }) => {
                    return (
                        <div key={id} className='post'>
                            <div className="header_post"><h2>{title}</h2>
                                <div className="icons">
                                    {user === username
                                        && <>
                                            <img id={id} className='delete' onClick={handleOpenModal} src={deleteIcon} alt="delete icon" />

                                            <img id={id} className='edit' onClick={handleOpenModal} src={editIcon} alt="edit icon" />
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="body_post">
                                <div className="title_time">
                                    <h2 className="author">@{username}</h2>
                                    <h2 className='date'>{created_datetime}</h2>
                                </div>
                                <p className="content">{content}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {modal.open && <Modal id={modal.id} setModal={setModal} type={modal.type} />}
        </div>
    )
}