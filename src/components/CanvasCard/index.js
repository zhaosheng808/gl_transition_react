/**
 * Created by DELL on 2017/8/21.
 */
import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import transitions from "gl-transitions"; // 动画库
import createTransition from "gl-transition";
import createTexture from "gl-texture2d";
require('./canvasStyle.css');
import $ from 'jquery';
export default
class CanvasCard extends Component{
    static propTypes = {
        animateType: PropTypes.string,
    };
    constructor(props, context) {
        super(props, context);
        this.state = {
            animate: false,
            canvas: '',
        };
    }
    componentDidMount(){
        this.initCanvas();  // 创建画布
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.imageFrom) {
            this.props = nextProps;
        }else {
            console.log('Props未传入');
        }
    }
    initCanvas = () => {
        const canvas = document.createElement("canvas");
        const {refCanvasCard} = this.refs;
        refCanvasCard.appendChild(canvas);
        canvas.width = 300;
        canvas.height = 200;
        this.setState({
            canvas
        })
    };
    render(){
        const{imageFrom, imageTo, animateTime = 2} = this.props;
        const step = 1/ (animateTime / 0.1);
        console.log(step, 'step');
        if(this.props.imageFrom && this.state.canvas && imageFrom && imageTo){
            // imageTo.onload = () => {
            //     imageFrom.onload = () => {
                    const { animateType} = this.props;

                    const {canvas} = this.state;
                    const { refLine } = this.refs;
                    $(canvas).off();

                    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    const buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                    gl.bufferData(
                        gl.ARRAY_BUFFER,
                        new Float32Array([-1, -1, -1, 4, 4, -1]), // see a-big-triangle
                        gl.STATIC_DRAW
                    );
                    gl.viewport(0, 0, canvas.width, canvas.height);

                    const from = createTexture(gl, imageFrom);
                    from.minFilter = gl.LINEAR;
                    from.magFilter = gl.LINEAR;

                    const to = createTexture(gl, imageTo);
                    to.minFilter = gl.LINEAR;
                    to.magFilter = gl.LINEAR;

                    const transition = createTransition(gl, transitions.find(t => t.name === animateType)); // https://github.com/gl-transitions/gl-transitions/blob/master/transitions/cube.glsl
                    /* animateType => cube CrazyParametricFun*/

                    // transition.draw( (0.000), from, to, canvas.width, canvas.height, {});
                    // transition.draw( (0.002), from, to, canvas.width, canvas.height, {});
                    // const loop = (t) => {
                    //     // requestAnimationFrame(loop);
                    //     transition.draw( 0, from, to, canvas.width, canvas.height, {});
                    // };
                    // requestAnimationFrame(loop);
                    // 默认动画第一帧
                    transition.draw( 0, from, to, canvas.width, canvas.height, {});
                    // $(canvas).mousemove( (e)=>{
                    //     e.stopPropagation();
                    //     const cursorX = e.offsetX;
                    //     const percentX = cursorX / canvas.width;
                    //     $(refLine).css('left', cursorX);
                    //     transition.draw((percentX), from, to, canvas.width, canvas.height, {});
                    //
                    // });
            let interval;
            $(canvas).mouseover( () => {
                clearInterval(interval);
                transition.draw( 0, from, to, canvas.width, canvas.height, {});
                let percentX = 0;
                interval =setInterval( () => {
                    transition.draw((percentX), from, to, canvas.width, canvas.height, {});
                    percentX = percentX + step;
                    if( percentX > 1) {
                        percentX = 1;
                        transition.draw((percentX), from, to, canvas.width, canvas.height, {});
                        clearInterval(interval);
                    }
                }, 100)
            })
            //     }
            // };

        }
        return (<div className="canvasCard" ref='refCanvasCard'>
                <div className="line" ref='refLine' />
                <div className="cardFooter">{this.props.animateType}</div>
            </div>
        )
    }
}