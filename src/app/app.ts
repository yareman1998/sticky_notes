import { Component, inject } from '@angular/core';
import { NoteCardComponent } from './components/note-card/note-card';
import { NoteFormComponent } from './components/note-form/note-form';
import { NotesService } from './services/notes';
import { Note } from './models/note.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NoteCardComponent, NoteFormComponent],
  styleUrl: './app.css',
  template: `
    <main>
      <h1>My Sticky Notes Board</h1>
      
      @if (!showForm) {
        <button class="add-btn" (click)="showForm = true">+ Add New Note</button>
      }
      
      @if (showForm) {
        <app-note-form 
          [noteToEdit]="noteBeingEdited"
          (save)="handleSave($event)" 
          (cancel)="handleCancel()">
        </app-note-form>
      }

      <div class="board">
        @for (note of notesService.getNotes(); track note.id) {
          <app-note-card 
            [note]="note" 
            (delete)="notesService.deleteNote($event)"
            (edit)="handleEdit($event)">
          </app-note-card>
        } @empty {
          <p>No notes yet! Click "Add New Note" to get started.</p>
        }
      </div>
    </main>
  `
})
export class App {
  notesService = inject(NotesService);
  
  showForm = false;
  noteBeingEdited: Note | null = null;

  handleSave(noteData: any) {
    if (this.noteBeingEdited) {
      this.notesService.updateNote(noteData);
    } else {
      this.notesService.addNote(noteData);
    }
    this.showForm = false;
    this.noteBeingEdited = null;
  }

  handleEdit(note: Note) {
    this.noteBeingEdited = note;
    this.showForm = true;
  }

  handleCancel() {
    this.showForm = false;
    this.noteBeingEdited = null;
  }
}