import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DrumButtonComponent } from './drum-button/drum-button.component';

@Component({
    selector: 'app-drum-module',
    templateUrl: './drum-module.component.html',
    styleUrls: ['./drum-module.component.css']
})
export class DrumModuleComponent implements OnInit {

    ASSETPATH = '../../../assets/';

    buttons1: boolean[];
    buttons2: boolean[];
    buttons3: boolean[];
    buttons4: boolean[];

    playing: boolean;

    currentButton:  number;
    currentSection: number;

    kickSource:     string;
    snareSource:    string;
    hiHatSource:    string;
    tomSource:      string;

    beatsPerMinute: number;
    bpmInMilliseconds: number;


    @ViewChild('kickPlayer1') kickPlayer1: ElementRef;
    @ViewChild('kickPlayer2') kickPlayer2: ElementRef;
    @ViewChild('snarePlayer1') snarePlayer1: ElementRef;
    @ViewChild('snarePlayer2') snarePlayer2: ElementRef;
    @ViewChild('hiHatPlayer1') hiHatPlayer1: ElementRef;
    @ViewChild('hiHatPlayer2') hiHatPlayer2: ElementRef;
    @ViewChild('tomPlayer1') tomPlayer1: ElementRef;
    @ViewChild('tomPlayer2') tomPlayer2: ElementRef;

    constructor() { }

    ngOnInit() {
        this.currentSection = 1;
        this.beatsPerMinute = 95;
        this.updateBPM();

        // Initialize arrays of buttons
        this.buttons1 = new Array(64);
        this.buttons2 = new Array(64);
        this.buttons3 = new Array(64);
        this.buttons4 = new Array(64);

        for (let i = 0; i < 64; i++) {
            this.buttons1[i] = false;
            this.buttons2[i] = false;
            this.buttons3[i] = false;
            this.buttons4[i] = false;
        }

        this.playing = false;

        // Setup sources for HTML5 <audio> players
        this.kickSource = this.ASSETPATH + '808kick.wav';
        this.snareSource = this.ASSETPATH + 'acousticSnare.wav';
        this.tomSource = this.ASSETPATH + 'electroTom.wav';
        this.hiHatSource = this.ASSETPATH + 'hiHatClosed.wav';

    }

    startSequence(): void {
        this.playing = true;
        this.runSequence();
    }

    stopSequence(): void {
        this.playing = false;
        this.currentButton = -1;
    }

    onToggle(buttonID: number): void {
        switch(this.currentSection) {
            case 1:
                this.buttons1[buttonID] = !this.buttons1[buttonID];
                break;
            case 2:
                this.buttons2[buttonID] = !this.buttons2[buttonID];
                break;
            case 3:
                this.buttons3[buttonID] = !this.buttons3[buttonID];
                break;
            case 4:
                this.buttons4[buttonID] = !this.buttons4[buttonID];
                break;
        }
    }

    changeSection(section): void {
        this.currentSection = section;
    }

    async runSequence() {

        for (let i = 0; i < 64; i++) {

            this.currentButton = i;

            if (this.buttons1[i]) {
                if (i % 2 === 0) {
                    this.kickPlayer1.nativeElement.play();
                } else {
                    this.kickPlayer2.nativeElement.play();
                }
            }
            if (this.buttons2[i]) {
                if (i % 2 === 0) {
                    this.snarePlayer1.nativeElement.play();
                } else {
                    this.snarePlayer2.nativeElement.play();
                }
            }
            if (this.buttons3[i]) {
                if (i % 2 === 0) {
                    this.tomPlayer1.nativeElement.play();
                } else {
                    this.tomPlayer2.nativeElement.play();
                }
            }
            if (this.buttons4[i]) {
                if (i % 2 === 0) {
                    this.hiHatPlayer1.nativeElement.play();
                } else {
                    this.hiHatPlayer2.nativeElement.play();
                }
            }

            await this.sleep(this.bpmInMilliseconds);

            if (!this.playing) {
                break;
            }
        }
        if (this.playing) {
            this.runSequence();
        }
    }

    updateBPM() {
        this.bpmInMilliseconds = (30000 / this.beatsPerMinute);
    }

    bpmBump(direction) {
        this.beatsPerMinute += direction;
        this.updateBPM();
    }

    setBPM(newBPM) {
        this.beatsPerMinute = newBPM;
        this.updateBPM();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


}
