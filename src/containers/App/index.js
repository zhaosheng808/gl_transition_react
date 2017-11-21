/**
 * Created by DELL on 2017/8/14.
 */
import React, {Component, PropTypes} from 'react';
import Home from '../../Pages/Home';
import { Link, hashHistory } from 'react-router';
import { Menu, Segment, } from 'semantic-ui-react';
import Footer from '../Footer'
import './app.less';
export default class App extends Component {
    static propTypes = {
        // currentItem: PropTypes.String
    };

    state = {
        activeItem: '/home'
    };
    componentWillMount() {
        this._setTopMenu()
    }

    componentWillReceiveProps() {
        this._setTopMenu()
    }
    _setTopMenu = () => {
        // const { currentItem } = this.props;
        // console.log(currentItem, 'currentItem');
        let firstUrl = '';
        const currentURL = this._getCurrentURL();
        console.log(currentURL, 'currentURL');
        const currentURLFirst = currentURL.split('/')[1];  // 当前路由第一级路由地址
        console.log(currentURLFirst, 'currentURLFirst');
        if (!currentURLFirst) {   // 根据url判断渲染主页的导航
            firstUrl = `/${currentURLFirst}`
        }else {
            firstUrl = '/home';
        }
        this.setState({
            activeItem: firstUrl
        });
        // console.log(currentURL, 'currentURL=====');
    };
    handleItemClick = (path) => {
        this.setState({
            activeItem: path,
        });
        hashHistory.push(path);
    };

    _getCurrentURL = () => {
        let currentURL = '';
        if (typeof window !== 'undefined') {
            currentURL = window.location.hash;
        }
        return currentURL;
    };
    render() {
        const URL = this._getCurrentURL();
        const { activeItem } = this.state;
        // console.log(URL, 'url地址');
        const urls = [
            {name: '首页', url: '/home'},
            {name: '产品中心', url: '/products'},
            {name: '客户案例', url: '/customerCase'},
            {name: '关于我们', url: '/about'},
            {name: '售后服务', url: '/service'},
        ];
        return (
            <div style={{width: "100%", minHeight: '100%', overflow: 'hidden'}}>
                <div className="app-header">
                    <div className="app_main">
                        <h1>APP页面</h1>
                        <img src="../../assets/images/hamburger"/>
                    </div>
                </div>
                <div className="app-content app_main">
                    <div style={{minWidth: '1050px',margin: '20px 0'}}>
                        <Menu attached='top' tabular>
                            {urls.map((item, index) => {
                                return <Menu.Item name={item.name} active={activeItem === item.url} onClick={this.handleItemClick.bind(null, item.url)} key= {index} />
                            })}
                        </Menu>
                        <Segment attached='bottom'>
                            <div style={{minHeight: '500px'}}>
                                {/*{this.props.children || <Home/>}   /!* 二级页面*!/*/}
                                {URL === '/' || ''  ? <Home/> : this.props.children}   {/* 二级页面*/}
                            </div>
                        </Segment>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}