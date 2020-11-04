/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import Button from './components/Button';
import UnityView, { UnityModule } from 'react-native-unity-view';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCount: 0,
            renderUnity: false,
            unityPaused: false
        };
    }
    componentDidMount() {
        StatusBar.setHidden(false);
        StatusBar.setBarStyle('dark-content');
        if (Platform.OS == 'android') {
            StatusBar.setBackgroundColor('rgba(255,255,255,0)');
            StatusBar.setTranslucent(true);
        }
    }
    onToggleUnity() {
        this.setState({ renderUnity: !this.state.renderUnity });
    }
    onPauseAndResumeUnity() {
        if (this.state.unityPaused) {
            UnityModule.resume();
        }
        else {
            UnityModule.pause();
        }
        this.setState({ unityPaused: !this.state.unityPaused });
    }
    onToggleRotate() {
        UnityModule.postMessageToUnityManager({
            name: 'ToggleRotate',
            data: '',
            callBack: (data) => {
                Alert.alert('Tip', JSON.stringify(data));
            }
        });
    }
    onUnityMessage(hander) {
        this.setState({ clickCount: this.state.clickCount + 1 });
        setTimeout(() => {
            hander.send('I am click callback!');
        }, 2000);
    }
    render() {
        const { renderUnity, unityPaused, clickCount } = this.state;
        let unityElement;
        if (renderUnity) {
            unityElement = (React.createElement(UnityView, { style: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }, onUnityMessage: this.onUnityMessage.bind(this) }));
        }
        return (React.createElement(View, { style: [styles.container] },
            unityElement,
            React.createElement(Text, { style: styles.welcome }, "Welcome to React Native!"),
            React.createElement(Text, { style: { color: 'black', fontSize: 15 } },
                "Unity Cube Click Count: ",
                React.createElement(Text, { style: { color: 'red' } }, clickCount),
                " "),
            React.createElement(Button, { label: "Toggle Unity", style: styles.button, onPress: this.onToggleUnity.bind(this) }),
            renderUnity ? React.createElement(Button, { label: "Toggle Rotate", style: styles.button, onPress: this.onToggleRotate.bind(this) }) : null,
            renderUnity ? React.createElement(Button, { label: unityPaused ? "Resume" : "Pause", style: styles.button, onPress: this.onPauseAndResumeUnity.bind(this) }) : null));
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        marginTop: 10
    }
});
//# sourceMappingURL=App.js.map