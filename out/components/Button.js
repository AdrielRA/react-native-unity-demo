import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
export default class Button extends React.Component {
    render() {
        return (React.createElement(TouchableWithoutFeedback, { onPress: () => this.props.onPress && this.props.onPress() },
            React.createElement(View, { style: [styles.button, this.props.style, { opacity: this.props.enabled ? 1 : 0.5 }] },
                React.createElement(Text, { style: [styles.label, this.props.labelStyle] }, this.props.label))));
    }
}
Button.defaultProps = {
    enabled: true
};
const styles = StyleSheet.create({
    button: {
        width: 120,
        minWidth: 100,
        height: 30,
        borderRadius: 4,
        backgroundColor: '#448cfe',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#fff',
        fontSize: 14
    }
});
//# sourceMappingURL=Button.js.map