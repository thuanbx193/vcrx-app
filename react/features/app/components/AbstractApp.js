// @flow

import React, { Fragment } from 'react';
import {Linking, Alert} from 'react-native';

import { BaseApp } from '../../base/app';
import { toURLString } from '../../base/util';
import '../../follow-me';
import { OverlayContainer } from '../../overlay';

import '../../base/lastn'; // Register lastN middleware
import '../../rejoin'; // Enable rejoin analytics

import { appNavigate } from '../actions';
import { getDefaultURL } from '../functions';
import { joinRoomByLink, setTimeExitApp, setConfig } from '../../../vcrx/actions';
import { getAsyncStorage } from "../../../vcrx/apis";
import { checkUpdateApp } from "../../../vcrx/actions";
import { TIME_EXIT_APP } from "../../../vcrx/config";
import { NVNP, SELECTED_NVNP }      from "../../../vcrx/constants";

/**
 * The type of React {@code Component} props of {@link AbstractApp}.
 */
export type Props = {

    /**
     * XXX Refer to the implementation of loadURLObject: in
     * ios/sdk/src/JitsiMeetView.m for further information.
     */
    timestamp: any,

    /**
     * The URL, if any, with which the app was launched.
     */
    url: Object | string
};

/**
 * Base (abstract) class for main App component.
 *
 * @abstract
 */
export class AbstractApp extends BaseApp<Props, *> {
    _init: Promise<*>;

    /**
     * Initializes the app.
     *
     * @inheritdoc
     */
    componentDidMount() {
        super.componentDidMount();
        getAsyncStorage(TIME_EXIT_APP).then(res => {
            let timeExit = JSON.parse(res);
            this.state.store.dispatch(setTimeExitApp(timeExit));
        })

        Linking.getInitialURL().then((ev) => {
            if (ev) {
              this._handleOpenURL(ev);
            }
          }).catch(err => {
              console.warn('An error occurred', err);
        });
        Linking.addEventListener('url', this._handleOpenURL);

        this._init.then(() => {
            // If a URL was explicitly specified to this React Component, then
            // open it; otherwise, use a default.
            this._openURL(toURLString(this.props.url) || this._getDefaultURL());
        });
    }

    /**
     * Implements React Component's componentDidUpdate.
     *
     * @inheritdoc
     */
    componentDidUpdate(prevProps: Props) {
        const previousUrl = toURLString(prevProps.url);
        const currentUrl = toURLString(this.props.url);
        const previousTimestamp = prevProps.timestamp;
        const currentTimestamp = this.props.timestamp;

        this._init.then(() => {
            // Deal with URL changes.

            if (previousUrl !== currentUrl

                    // XXX Refer to the implementation of loadURLObject: in
                    // ios/sdk/src/JitsiMeetView.m for further information.
                    || previousTimestamp !== currentTimestamp) {
                this._openURL(currentUrl || this._getDefaultURL());
            }
        });
    }

    _handleOpenURL = (event) => {
        if (event.url.indexOf("://mobileportal/") != -1){
            this._openURL(toURLString(event.url));
        }
    }

    /**
     * Creates an extra {@link ReactElement}s to be added (unconditionaly)
     * alongside the main element.
     *
     * @abstract
     * @protected
     * @returns {ReactElement}
     */
    _createExtraElement() {
        return (
            <Fragment>
                <OverlayContainer />
            </Fragment>
        );
    }

    _createMainElement: (React$Element<*>, Object) => ?React$Element<*>;

    /**
     * Gets the default URL to be opened when this {@code App} mounts.
     *
     * @protected
     * @returns {string} The default URL to be opened when this {@code App}
     * mounts.
     */
    _getDefaultURL() {
        return getDefaultURL(this.state.store);
    }

    /**
     * Navigates this {@code AbstractApp} to (i.e. Opens) a specific URL.
     *
     * @param {Object|string} url - The URL to navigate this {@code AbstractApp}
     * to (i.e. The URL to open).
     * @protected
     * @returns {void}
     */
    async _openURL (url) {
        await this.state.store.dispatch(setConfig(NVNP, SELECTED_NVNP));
        this.state.store.dispatch(checkUpdateApp(url));
    }
}
