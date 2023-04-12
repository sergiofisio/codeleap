import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/input';
import axiosPrivate from '../../service/api';
import './styles.css';

export default function Modal({ id, setModal, type }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    function handelCancel() {
        setModal(false)
    }

    async function getPost() {
        try {
            const { data } = await axiosPrivate.get(`careers/${id}/`)
            setTitle(data.title)
            setContent(data.content)
        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleEdit(e) {
        e.preventDefault()
        e.stopPropagation()

        try {
            await axiosPrivate.patch(
                `careers/${id}/`,
                {
                    title,
                    content,
                }
            )
            setTitle('')
            setContent('')
            setModal(false)
        } catch (error) {
            console.log(error);
        }
    }

    async function handelDelete() {
        try {
            await axiosPrivate.delete(`careers/${id}/`)
            setModal(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <div className='body_modal'>
            <div className={`modal ${type === 'delete' ? 'modal_delete' : 'modal_edit'}`}>
                {type === 'delete'
                    ? <>
                        <h2>
                            Are you sure you want to delete this item?
                        </h2>
                        <div className="btn">
                            <Button onClick={handelCancel} classname='btn_cancel' text='cancel' />
                            <Button onClick={handelDelete} classname='btn_delete' text='delete' />
                        </div>
                    </>
                    : <>
                        <form className='form_edit' onSubmit={handleEdit}>
                            <h2>Edit item</h2>
                            <Input label='Title' type='text' placeholder='title' set={setTitle} value={title} />
                            <Input label='Content' type='text' placeholder='Content here' set={setContent} value={content} />
                            <div className='btn'>
                                <Button type='button' onClick={handelCancel} classname='btn_cancel' text='cancel' />
                                <Button type='submit' classname='btn_save' text='save' />
                            </div>
                        </form>
                    </>
                }

            </div>
        </div>
    )
}