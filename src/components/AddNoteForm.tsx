import React, { useRef } from 'react'

type Props = {
    onSubmit: (values: any) => void
}

function AddNoteForm({ onSubmit }: Props) {
    const titleRef = useRef<HTMLInputElement>(null)
    const descrRef = useRef<HTMLTextAreaElement>(null)
    const formRef = useRef<HTMLFormElement>(null)


    return (
        <form 
        ref={formRef} 
        onSubmit={(e) => {
            e.preventDefault()
            const title = titleRef.current?.value 
            const description = descrRef.current?.value 

            if (!title || !description) {
                return
            }

            onSubmit({ title, description })

            formRef.current?.reset()
        }}>
            <div className='form-content'>
                <div className='field'>

                    <input placeholder='Put note title' type="text" name='title' className='input' ref={titleRef}  />

                </div>

                <div className="field">

                    <textarea  name='description' placeholder='Put note description' className='input' ref={descrRef}  />
                </div>
                <div className='form-footer'>

                    <button className='button' type='submit' >Add Note</button>
                </div>
            </div>
        </form>
    )
}

export default AddNoteForm