import { useEffect, useState } from 'react';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import Button from '../../components/Button';
import Input from '../../components/input';
import { default as axios, default as axiosPrivate } from "../../service/api";
import { getItem } from '../../utils/storage';
import './styles.css';

export default function Main() {

    const [data, setData] = useState()
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
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
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPost()
    }, [data])

    return (
        <div className="container_main">
            <div className="create_post">
                <div className="header_create_post"><h2>CodeLeap Network</h2></div>
                <form action="submit">
                    <h2>What’s on your mind?</h2>
                    <Input label='Title' type='text' placeholder='title' set={setTitle} value={title}> {title} </Input>
                    <Input label='Content' type='text' placeholder='Content here' set={setContent} value={content}> {content} </Input>
                    <div className='button'>
                        <Button classname={title || content ? 'active' : 'inactive'} text='create' onClick={(e) => handleSubmit(e)} />
                    </div>
                </form>
            </div>
            <div className="posts">
                {data && data.map(({ title, username, content, id, created_datetime }) => {
                    return (
                        <div key={id} className='post'>
                            <div className="header_post"><h2>{title}</h2>
                                <div className="icons">
                                    {user === username ? <><img src={deleteIcon} alt="delete icon" />
                                        <img src={editIcon} alt="edit icon" /></> : <></>}</div></div>
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

        </div>
    )
}