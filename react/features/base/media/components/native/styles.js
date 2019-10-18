import { StyleSheet } from 'react-native';

/**
 * The styles of the feature base/media.
 */
export default StyleSheet.create({

    /**
     * Base style of the transformed video view.
     */
    videoTranformedView: {
        flex: 1
    },

    /**
     * A basic style to avoid rendering a transformed view off the component,
     * that can be visible on special occasions, such as during device rotate
     * animation, or PiP mode.
     */
    videoTransformedViewContainer: {
        overflow: 'hidden'
    },

    /**
     * Make {@code Video} fill its container.
     */
    video: {
        flex: 1,
        zIndex: 1
    },

    title: {
        zIndex: 0,
        position: 'absolute',
        top: '44%',
        textAlign: 'center',
        width:'100%',
        height: '12%',
        fontSize: 12,
        color: '#333333'
    }
});
