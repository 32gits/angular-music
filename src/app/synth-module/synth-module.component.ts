import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-synth-module',
    templateUrl: './synth-module.component.html',
    styleUrls: ['./synth-module.component.css']
})
export class SynthModuleComponent implements OnInit {

    ctx: AudioContext;
    osc: OscillatorNode;

    constructor() {
    }

    ngOnInit() {
        this.ctx = new AudioContext();
        this.osc = this.ctx.createOscillator();
        this.osc.type = 'sine';
        this.osc.start();
        this.osc.disconnect();
    }

    playSound() {
        this.osc.connect(this.ctx.destination);
    }
    stopSound() {
        this.osc.disconnect(this.ctx.destination);
    }

}
