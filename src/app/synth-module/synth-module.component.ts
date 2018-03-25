import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


@Component({
    selector: 'app-synth-module',
    templateUrl: './synth-module.component.html',
    styleUrls: ['./synth-module.component.css', './toggle-switch.css', '../simple-grid-ONLYGRID.css']
})
export class SynthModuleComponent implements OnInit {

    ctx: AudioContext;
    osc: OscillatorNode;
    gainNode: GainNode;

    sine: OscillatorType;
    square: OscillatorType;
    saw: OscillatorType;
    triangle: OscillatorType;

    attackTime: number;
    releaseTime: number;

    octaves = [0, 1, 2, 3, 4, 5, 6];
    notes = ['a', 'bFlat', 'b', 'c', 'cSharp', 'd', 'eFlat', 'e', 'f', 'fSharp', 'g', 'gSharp'];

    currentOctave: number;
    currentNote: string;

    isPlaying: boolean;
    isPowered: boolean;

    SVG = '../../assets/svg/';

    octaveSVGActive = this.SVG + 'keys_octave_active.svg';
    octaveSVG = this.SVG + 'keys_octave.svg';

    currentWaveImg: string;

    frequencyTable = {
        a: [27.5, 55, 110, 220, 440, 880, 1760, 3520, 7040],
        bFlat: [29.14, 58.27, 116.5, 233.1, 466.2, 932.3, 1865, 3729, 7459],
        b: [30.87, 61.74, 123.5, 246.9, 493.9, 987.8, 1976, 3951, 7902],
        c: [16.35, 32.7, 65.41, 130.8, 261.6, 523.3, 1047, 2093, 4186],
        cSharp: [17.32, 34.65, 69.30, 138.6, 277.2, 554.4, 1109, 2217, 4435],
        d: [18.35, 36.71, 73.42, 146.8, 293.7, 587.3, 1175, 2349, 4699],
        eFlat: [19.45, 38.89, 77.78, 155.6, 311.1, 622.3, 1245, 2489, 4978],
        e: [20.6, 41.2, 82.41, 164.8, 329.6, 659.3, 1319, 2637, 5274],
        f: [21.83, 43.65, 87.31, 174.6, 349.2, 698.5, 1397, 2794, 5588],
        fSharp: [23.12, 46.25, 92.5, 185, 370, 740, 1480, 2960, 5920],
        g: [24.5, 49, 98, 196, 392, 784, 1568, 3136, 6272],
        gSharp: [25.96, 51.91, 103.8, 207.7, 415.3, 830.6, 1661, 3322, 6645]
    };

    constructor() {
    }

    ngOnInit() {
        // Setup Audio Context, Gain Node, and Oscillator
        this.ctx = new AudioContext();
        this.osc = this.ctx.createOscillator();
        this.gainNode = this.ctx.createGain();

        this.isPlaying = false;
        this.isPowered = false;

        // Setup wave types
        this.sine = 'sine';
        this.square = 'square';
        this.saw = 'sawtooth';
        this.triangle = 'triangle';

        // Start Oscillator with defaults
        this.gainNode.connect(this.ctx.destination);
        this.gainNode.gain.value = .25;
        this.osc.type = this.sine;
        this.osc.start(0);

        this.releaseTime = 1;

        this.currentOctave = 5;
        this.currentNote = 'c';

        this.setFrequency();

        this.currentWaveImg = this.SVG + 'sine.svg';
    }

    /**
     * Start playing current oscillator configuration
     */
    playSound(): void {
        this.osc.connect(this.ctx.destination);
        this.gainNode.gain.value = 0.00001;
        this.gainNode.gain.exponentialRampToValueAtTime(1, this.ctx.currentTime + this.releaseTime);
    }

    /**
     * Stop playing current oscillator configuration
     */
    stopSound(): void {
        if (this.isPlaying) {
            this.gainNode.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + this.releaseTime);
            this.osc.disconnect(this.ctx.destination);
            this.isPlaying = false;
        }
    }

    /**
     * Sets the note to play out of the oscillator
     * @param note The note to set. Expects characters a-g
     * @param octave The octave at which to play note
     */
    setFrequency() {
        this.osc.frequency.value = this.frequencyTable[this.currentNote][this.currentOctave];
    }

    /**
     * Change the time it takes for a sound to stop playing
     * @param newAttackTime The new value to be used to ramp down gain node
     */
    changeReleaseTime(newReleaseTime): void {
        this.releaseTime = newReleaseTime;
    }

    setNote(note) {
        this.currentNote = note;
        this.setFrequency();
    }
    setOctave(octave) {
        this.currentOctave = octave;
        this.setFrequency();
    }


    // Oscillator Wave Functions
    useSine(): void {
        this.osc.type = this.sine;
        this.currentWaveImg = this.SVG + 'sine.svg';
    }
    useSquare(): void {
        this.osc.type = this.square;
        this.currentWaveImg = this.SVG + 'square.svg';
    }
    useSaw(): void {
        this.osc.type = this.saw;
        this.currentWaveImg = this.SVG + 'sawtooth.svg';
    }
    useTriangle(): void {
        this.osc.type = this.triangle;
        this.currentWaveImg = this.SVG + 'triangle.svg';
    }


    playNote(event) {
        switch (event.key) {
            case 'a':
                this.setNote('c');
                this.playSound();
                this.isPlaying = true;
                break;
            case 'w':
                this.setNote('cSharp');
                this.playSound();
                this.isPlaying = true;
                break;
            case 's':
                this.setNote('d');
                this.playSound();
                this.isPlaying = true;
                break;
            case 'e':
                this.setNote('eFlat');
                this.playSound();
                this.isPlaying = true;
                break;
            case 'd':
                this.setNote('e');
                this.playSound();
                this.isPlaying = true;
                break;
            case 'f':
                this.setNote('f');
                this.playSound();
                this.isPlaying = true;
                break;
            case 'u':
                this.setNote('fSharp');
                this.playSound();
                this.isPlaying = true;
                break;
            case 'j':
                this.setNote('g');
                this.playSound();
                this.isPlaying = true;
                break;
            case 'i':
                this.setNote('gSharp');
                this.playSound();
                this.isPlaying = true;
                break;
            case 'k':
                this.setNote('a');
                this.playSound();
                this.isPlaying = true;
                break;
            case 'l':
                this.setNote('bFlat');
                this.playSound();
                this.isPlaying = true;
                break;
            case ';':
                this.setNote('b');
                this.playSound();
                this.isPlaying = true;
                break;
            default:
                break;
        }
    }

    togglePower(powerSwitch, kbInterface) {
        if (powerSwitch.checked) {
            kbInterface.focus();
        } else {
            kbInterface.blur();
        }
    }



}
