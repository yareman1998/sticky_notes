import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CdkDrag],
  styleUrl: './note-card.css',
  template: `
    <div class="sticky-note" 
         cdkDrag 
         [style.backgroundColor]="note.color || '#fffa65'"
         [style.color]="getTextColor(note.color)"
         [style.zIndex]="zIndex"
         (mousedown)="bringToFront()">
      
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
      
      <div class="actions" (mousedown)="$event.stopPropagation()">
        <!-- Added a dynamic style to buttons to ensure they also contrast nicely -->
        <button [style.color]="getTextColor(note.color)" (click)="onEdit()">Edit</button>
        <button [style.color]="getTextColor(note.color)" (click)="onDelete()">Delete</button>
      </div>
    </div>
  `
})
export class NoteCardComponent {
  @Input({ required: true }) note!: Note;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Note>();

  static currentMaxZIndex = 1; 
  zIndex = 1;

  bringToFront() {
    NoteCardComponent.currentMaxZIndex++;
    this.zIndex = NoteCardComponent.currentMaxZIndex;
  }

  // Calculate if the text should be black or white based on background brightness
  getTextColor(hexColor?: string): string {
    if (!hexColor) return '#333333'; // Default dark text for the default yellow note

    // Remove the '#' if present
    const hex = hexColor.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate YIQ brightness (YIQ is a standard formula for color contrast)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // If brightness is 128 or higher, the color is light (use black text)
    // If brightness is less than 128, the color is dark (use white text)
    return (yiq >= 128) ? '#000000' : '#ffffff';
  }

  onDelete() { this.delete.emit(this.note.id); }
  onEdit() { this.edit.emit(this.note); }
}