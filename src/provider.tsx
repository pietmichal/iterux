import React from 'react';
import { storeFactory } from './index';
import { Store } from './factory';

export default class Provider<State> extends React.Component<{ store: Store<State> }, any> {

    constructor(props) {
        super(props);
    }

    getChildContext() {
        return { store: this.props.store };
    }

    public render() {
        return <b>test</b>;
    }

}