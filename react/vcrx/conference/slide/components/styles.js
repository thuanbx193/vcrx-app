import { ColorPalette, createStyleSheet }       from '../../../../features/base/styles';
import { Dimensions }                           from 'react-native';

export default createStyleSheet({
    pdf: {
        flex: 1,
        zIndex: -9999,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    sildeLayout: { 
        flex: 1, 
        flexDirection: 'column', 
        backgroundColor: "rgba(0,0,0,0)", 
        position: "relative",
        // borderRadius: 5
    },
    sildeLoading: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        bottom: 0, 
        right: 0, 
        alignSelf: 'center', 
        justifyContent: 'center', 
        backgroundColor: "rgba(0,0,0,0.3)",
        // borderRadius: 5
    }
})