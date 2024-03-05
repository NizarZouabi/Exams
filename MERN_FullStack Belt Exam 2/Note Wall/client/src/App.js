import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NoteWall from './views/NoteWall';
import WriteNote from './views/WriteNote';
import UpdateNote from './views/UpdateNote';

function App() {
  const [notes, setNotes] = useState([]);


  return (
    <div className="m-5">
      <Routes>
        <Route path="/" element={<NoteWall notes={notes} setNotes={setNotes} />} default />
        <Route path="/notes/new" element={<WriteNote notes={notes} setNotes={setNotes} />} />
        <Route path="/notes/edit/:id" element={<UpdateNote />} />
      </Routes>
    </div>
  );
}

export default App;
