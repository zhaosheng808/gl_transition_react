/**
 * Created by DELL on 2017/8/14.
 */
import React, {Component, PropTypes} from 'react';
export default class Footer extends Component{
    render () {
        return (<div className='app-footer'>
            <div className="app_main">
                footer <br />
                copyRight
                {/*公司地址：四川省XX市XX公司 © 2017-2020 XX公司 版权所有，并保留所有权利。 <br />*/}
                {/*联系方式：400 8800 0000*/}
            </div>
        </div>)
    }
}
