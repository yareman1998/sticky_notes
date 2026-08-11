import { Injectable, signal } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  // Using Signals (modern Angular) or a standard BehaviorSubject/Array
  private notesList: Note[] = [
    { id: 1, title: 'Welcome', content: 'Start adding your sticky notes!', color: '#fffa65' }
  ];
  
  // Expose notes (using signals or standard getter)
  getNotes(): Note[] {
    return [...this.notesList];
  }

  addNote(note: Omit<Note, 'id'>) {
    const newNote: Note = {
      ...note,
      id: Date.now() // unique id
    };
    this.notesList.push(newNote);
  }

  updateNote(updatedNote: Note) {
    const index = this.notesList.findIndex(n => n.id === updatedNote.id);
    if (index !== -1) {
      this.notesList[index] = { ...updatedNote };
    }
  }

  deleteNote(id: number) {
    this.notesList = this.notesList.filter(n => n.id !== id);
  }
}