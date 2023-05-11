import React, { useState } from 'react';
import './App.css';
import AddNoteForm from './components/AddNoteForm';
import NoteItem from './components/NoteItem';
import useNotesCrud from './hooks/useNotesCrud';



function App() {
  const { notes, add, edit, remove } = useNotesCrud()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<"up" | "down">('down')


  const notesToRender = notes.filter((note) => {
    if (!search) {
      return true
    }

    return note.title.toLowerCase().includes(search.toLowerCase()) || note.description.toLowerCase().includes(search.toLowerCase())
  })

  notesToRender.sort((a, b) => {
    if (sort === 'up') {
      return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
    } else {
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    }
  })

  return (
    <div className="App">

      <div className='paper'>
        <AddNoteForm onSubmit={(values) => add(values)} />
      </div>


      {!!notes.length && (
        <div className='paper'>

          <div className='field search'>
            <input
              className='input'
              type="text"
              placeholder='serch'
              name='search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className='button' onClick={() => setSort((p) => p === 'up' ? "down" : "up")}>{sort}</button>
          </div>

          {notesToRender.map((note) => {
            return (
              <NoteItem
                key={note.id}
                note={note}
                onEdit={({ title, description }) => edit({ id: note.id, title, description })}
                onRemove={() => remove({ id: note.id })}
              />
            )
          })}
        </div>
      )}
    </div>
  );
}

export default App;
