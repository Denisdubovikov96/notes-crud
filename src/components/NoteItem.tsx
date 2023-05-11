import React, { useRef, useState } from 'react'
import { Note } from '../hooks/useNotesCrud'

type NoteItemProps = {
    note: Note,
    onRemove: () => void
    onEdit: ({ title, description }: { title: string, description: string }) => void
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onRemove, onEdit }) => {
    const [isExpand, setIsExpand] = useState(false)
    const [isEditMode, setMode] = useState(false)
    const titleRef = useRef<HTMLInputElement>(null)
    const descrRef = useRef<HTMLTextAreaElement>(null)

    const handleExpand = () => {
        setMode(false)
        setIsExpand((v) => !v)
    }
    const handleEdit = () => {
        if (isEditMode) {
            const title = titleRef.current?.value || ""
            const description = descrRef.current?.value || ""
            onEdit({ title, description })
        }

        setMode((v) => !v)
    }

    return (
        <div key={new Date(note.createdDate).getMilliseconds()} className='paper note' >
            <div className='note-content' >
                <div className='note-main'>
                    {isEditMode ?
                        <input placeholder='Put note title' type="text" name='title' className='input' ref={titleRef} defaultValue={note.title} />
                        :
                        <h2 className='title'>{note.title}</h2>
                    }
                    <div className='note-dates'>

                        <p className='date'>{"Created:"} {new Date(note.createdDate).toLocaleString()}</p>
                        {isExpand && <p className='date'>{"Updated:"} {new Date(note.updatedDate).toLocaleString()}</p>}
                    </div>

                </div>

                <button className={`button icon ${isExpand ? "expand" : ""}`} onClick={handleExpand} >
                    <span>
                        {"<"}
                    </span>
                </button>
            </div>


            {isExpand &&
                <div>
                    {
                        isEditMode ?
                            (<textarea name='Put note description' placeholder='description' className='input' ref={descrRef} defaultValue={note.description} />)
                            :
                            (<p className='description'>{note.description}</p>)
                    }

                    <div className='note-footer'>

                        <button className='button' onClick={handleEdit} >{isEditMode ? "Save" : "Edit"}</button>
                        <button className='button' onClick={onRemove}>Remove</button>
                    </div>

                </div>
            }

        </div>
    )
}
export default NoteItem