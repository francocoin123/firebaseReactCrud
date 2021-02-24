import React, { useEffect, useState } from 'react'
import LinkForm from './LinkForm'
import { toast } from 'react-toastify'
import { db } from '../firebase'



const Links = () => {

    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState('')

    const addOrEdit = async (linkObjet) => {
        if(currentId === ''){
            await db.collection('links').doc().set(linkObjet);
            toast('new link added',{
                type: 'success'
            })
        }else{
           await db.collection('links').doc(currentId).update(linkObjet)
           toast('link update successfully',{
            type: 'info'
        });
        setCurrentId('');
        }
    }
    const onDelete = async (id) => {
        if (window.confirm('are you sure you want to delete this link?')) {
            await db.collection('links').doc(id).delete()
            toast('link remove successfully', {
                type: 'error',
                autoClose: 2000,
            })
        }
    }
    const getLinks = () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setLinks(docs)

        });

    }
    useEffect(() => {
        getLinks();
    }, [])

    return (
        <div>
            <div className="col-md-12 p-2">
                <LinkForm {...{addOrEdit,currentId,links}} />
            </div>
            <div className="col-md-12">
                {links.map(link => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons text-danger" onClick={() => onDelete(link.id)}>close</i>
                                    <i className="material-icons" onClick={()=>setCurrentId(link.id)}>create</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">Go to the webSide</a>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Links;