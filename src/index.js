/**
 * Created by DELL on 2017/8/11.
 */
/*
 * 入口文件
 */


import React, {Component} from 'react';
import ReactDom from 'react-dom';
require('./style.css');
import image1 from './assets/images/img8.jpg';
import image2 from './assets/images/img12.jpg';
import {CanvasCard} from './components'
export class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      imageFrom: '',
      imageTo: '',
      animateArray: [
        'morph',
        'ColourDistance',
        'CircleCrop',
        'Swirl',
        'CrossZoom',
        'Dreamy',
        'GridFlip',
        /*9*/
        'Radial',
        'Mosaic',
        'undulatingBurnOut',
        'crosshatch',
        'cannabisleaf',
        'CrazyParametricFun',
        'ButterflyWaveScrawler',
        'kaleidoscope',
        'windowblinds',
        'hexagonalize',
        /* 18*/
        'GlitchDisplace',
        'DreamyZoom',
        'DoomScreenTransition',
        'pinwheel',
        'rotate_scale_fade',
        'multiply_blend',

        'pixelize',
        'polar_function',
        'angular',
        'circle',
        'colorphase',
        'cube',
        'swap',
        'flyeye',
        'randomsquares',
        'crosswarp',
        'luma',
        'squareswire',

        'circleopen',
        'fadegrayscale',
        'fadecolor',
        'ripple',
        'fade',
        'wind',
        'squeeze',
        'doorway',
        'burn',
        'directionalwipe',
        'heart'

      ],
      currentPage: 0,
      pageSize: 9,
      currentAnimate: [],
      countPage: 0,
      loadImgNum: 0,
      animateTime: 2,  // 默认转场时间 2s
    };
  }

  componentDidMount() {
    const {animateArray, pageSize} = this.state;
    const imageFrom = document.getElementById('images01');
    const imageTo = document.getElementById('images02');
    this.setState({
      imageFrom,
      imageTo,
      countPage: Math.ceil(animateArray.length / pageSize)
    });
  }
  goPage = (index) => {
    this.setState({
      currentPage: index,
    })
  };
  loadImg = (index) => {
    let {loadImgNum} = this.state;
    loadImgNum++;
    this.setState({
      loadImgNum
    })
  };
  setAnimateTime = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    let animateTime = e.target.value || 2;
    if (animateTime < 0) {
      animateTime = 2
    }
    this.setState({
      animateTime
    })
  };

  render() {
    const {imageFrom, imageTo, countPage, animateArray, currentPage, pageSize, loadImgNum, animateTime} = this.state;
    const currentAnimate = animateArray.slice(currentPage * pageSize, (parseInt(currentPage) + 1) * pageSize);
    const pagenumWrapper = [];
    for (let i = 0; i < countPage; i++) {
      pagenumWrapper.push(<div className={currentPage == i ? 'activeButton button' : 'button'}
                               onClick={this.goPage.bind(null, i)} key={i}>{i + 1}</div>)
    }
    if (loadImgNum >= 2) {
      console.log('图片加载完毕', loadImgNum);
    }
    return (<div className="app_wrapper">
      <img src={image1} id="images01" onLoad={this.loadImg.bind(null, 0)} ref="images01"/>
      <img src={image2} id="images02" onLoad={this.loadImg.bind(null, 1)} ref='images02'/>
      <div className="pagenumWrapper">
        {pagenumWrapper}
      </div>
      <div className="time_box">
        当前转场过渡时间为：{animateTime} s<br/>
        请设置转场过渡时间：<input name="animateTime" onChange={this.setAnimateTime} type="number"/> s
      </div>
      <div className="card_wrapper">
        { loadImgNum >= 2 ? currentAnimate.map((item, index) => {
          return <CanvasCard imageFrom={imageFrom} animateType={item} key={index} imageTo={imageTo} cardIndex={index}
                             animateTime={animateTime}/>
        }) : ''}
        <div className="clear"/>
      </div>
    </div>)
  }
}
ReactDom.render(
  <App />,
  document.getElementById("wrapper")
);
