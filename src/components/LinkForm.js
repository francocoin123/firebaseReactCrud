import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const LinkForm = (props) => {

    const initialStateValues = {
        url: "",
        name: "",
        description: ""
    }
    const [values, setValues] = useState(initialStateValues)

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })

    }
    const valiteUrlForm = (str) => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!valiteUrlForm(values.url)){
            return toast('invalid url',{
                type: 'warning',
                autoClose: 2000
            })
        }
        props.addOrEdit(values)
        setValues({ ...initialStateValues })
    }
    const getLinkId = async (id) => {
        const doc = await db.collection('links').doc(id).get()
        setValues({ ...doc.data() })
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({ ...initialStateValues });
        } else {
            getLinkId(props.currentId)

        }
    }, [props.currentId])

    return (
        <form onSubmit={handleSubmit} className="card card-body">
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input value={values.url} onChange={handleInputChange} type="text" className="form-control" placeholder="https://someurl.com" name="url" />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-ligth">
                    <i className="material-icons">create</i>
                </div>
                <input value={values.name} onChange={handleInputChange} type="text" className="form-control" placeholder="webside name" name="name" />
            </div>
            <div className="form-group">
                <textarea value={values.description} onChange={handleInputChange} name="description" rows="3" className="form-control" placeholder="write a description"></textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'save' : 'update'}
            </button>
        </form>
    )
}

export default LinkForm;