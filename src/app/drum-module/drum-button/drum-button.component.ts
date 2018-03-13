import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-drum-button',
    templateUrl: './drum-button.component.html',
    styleUrls: ['./drum-button.component.css']
})
export class DrumButtonComponent implements OnInit {

    @Input() isActive: boolean;
    @Input() isPlaying: boolean;
    @Input() id: number;
    @Output() toggleEvent = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {

    }

    onToggle() {
        this.toggleEvent.emit(this.id);
    }
}
