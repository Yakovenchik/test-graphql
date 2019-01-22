import React, {Component} from 'react';
import User from "../Component/User/index";
import stores from '../Store/index';
import {Provider} from 'mobx-react'

export default class MainPage extends Component{
    render() {
        return (
            <Provider userStore={stores.userStore}>
                <User />
            </Provider>
        )
    }
}