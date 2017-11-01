import React from 'react';
import ReactDOM from 'react-dom';

import {c as name} from './conponent/myname';

ReactDOM.render(
    <div>Hollo React</div>,
    document.getElementById('root')
);

const obc = {
    a:1,
    b:2,
    c:3
};

let nameObj = name('111')

console.log( { ...obc,...nameObj } )


// my code
class Drag {
    constructor(id){
        this.disX = 0;
        this.disY = 0;
        this.box = document.getElementById(id);
        this.box.addEventListener('mousedown',(ev)=>{
            this.down(ev);
        });
    }

    down(ev){
        this.disX = ev.clientX - this.box.offsetLeft;
        this.disY = ev.clientY - this.box.offsetTop;
        var move = (ev) => {
            this.move(ev);
        }
        var up = (ev) => {
            this.up(ev,move,up);
        }
        document.addEventListener('mousemove',move);
        document.addEventListener('mouseup',up);
    }
    move(ev){
        this.box.style.left = ev.clientX - this.disX + 'px';
        this.box.style.top = ev.clientY - this.disY + 'px';
    }
    up(ev,move,up){
        document.removeEventListener('mousemove',move);
        document.removeEventListener('mouseup',up);
    }
}

var d = new Drag('box');