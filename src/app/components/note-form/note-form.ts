import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './note-form.css',
  template: `
    <div class="form-container">
      <h2>{{ isEdit ? 'Edit Note' : 'Create a Note' }}</h2>
      
      <input type="text" [(ngModel)]="currentNote.title" placeholder="Title..." />
      <textarea [(ngModel)]="currentNote.content" placeholder="Take a note..." rows="4"></textarea>
      
      <div class="color-picker">
        <label>Color:</label>
        <input type="color" [(ngModel)]="currentNote.color" />
      </div>

      <div class="actions">
        <button (click)="onSave()">Save</button>
        <button (click)="onCancel()">Cancel</button>
      </div>
    </div>
  `
})
export class NoteFormComponent {
  @Input() set noteToEdit(note: Note | null) {
    if (note) {
      this.currentNote = { ...note };
      this.isEdit = true;
    } else {
      this.resetForm();
    }
  }
  
  @Output() save = new EventEmitter<Omit<Note, 'id'> | Note>();
  @Output() cancel = new EventEmitter<void>();

  currentNote: Partial<Note> = {};
  isEdit = false;

  constructor() { this.resetForm(); }

  onSave() {
    if (this.currentNote.title || this.currentNote.content) {
      this.save.emit(this.currentNote as Note);
      this.resetForm();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.resetForm();
  }

  resetForm() {
    this.currentNote = { title: '', content: '', color: '#fffa65' };
    this.isEdit = false;
  }
}