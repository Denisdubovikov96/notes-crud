import { useReducer } from "react"


export type Note = {
    title: string,
    id: number,
    createdDate: Date,
    updatedDate: Date,
    description: string
}

type Action =   { type: 'add', title: string, description: string } | { type: 'edit',  title: string, description: string, id: number } | { type: 'remove', id: number };

const reducer = (notes: Note[], action: Action): Note[] => {
    switch (action.type) {
        case 'add': {
            const note: Note = {
                title: action.title,
                description: action.description,
                id: new Date().getTime(),
                createdDate: new Date(),
                updatedDate: new Date()
            }

            return [...notes, note];
        }
        case 'edit': {
            return notes.map(note => {
                if (note.id === action.id) {
                    return {
                        ...note,
                        updatedDate: new Date(),
                        title: action.title,
                        description: action.description
                    };
                } else {
                    return note;
                }
            });
        }
        case 'remove': {
            return notes.filter(note => note.id !== action.id);
        }
        default: {
            return notes
        }
    }
}

const useNotesCrud = () => {
    const [notes, dispatch] = useReducer(reducer, [])

    const add = ({ title, description }: {title: string, description: string}) => {

        dispatch({ type: 'add', title,description })
    }

    const edit = ({title,description,id}: {title: string, description: string, id: number}) => {
        dispatch({type: 'edit', title,description,id})
    } 

    const remove = ({id}: {id: number}) => {
        dispatch({type: 'remove', id})
    }

    return {
        notes,
        add,
        edit,
        remove
    }
}

export default useNotesCrud