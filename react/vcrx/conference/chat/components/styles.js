import { createStyleSheet }         from './../../../../features/base/styles';
import { createStyles, minHeight }  from 'react-native-media-queries';
import { responsiveFontSize }       from 'react-native-responsive-dimensions';
let base = createStyleSheet({
    chatWrapper:{
        width: '100%',flexDirection: 'row', 
        backgroundColor:'#DDDDDD'
    },
    chatHeadTitle:{
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    chatHeadTitleView:{
        flexDirection:"row"
    },
    chatHeadTitleViewText:{
        fontSize: 15, lineHeight: 25, 
        alignSelf:'auto'
    },
    chatListUser:{
        width: '100%', backgroundColor: '#eee', 
        justifyContent: 'center', 
        alignItems: 'center', margin: 4, 
        borderRadius: 5, shadowColor: '#000', 
        shadowOpacity: 0.11
    },
    textNotify: {
        backgroundColor: "red", height: 15, 
        lineHeight: 11, borderRadius: 10, 
        paddingHorizontal: 5, paddingVertical: 2,
        fontSize: 10,
        color: "#fff", marginLeft: 5
    },

    controlChat:{
        height:30,
        flexDirection:'row',
        padding:0,
        margin:0,
        backgroundColor:'#eaeaea'
    },
    publicChat:{
        flex:1,
        padding:0,
        margin:0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#fff',
        borderRightWidth: 2
    },
    optionChat:{
        flex:1,
        padding:0,
        margin:0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#fff',
        borderRightWidth: 2
    },
    privateChat:{
        flex:1,
        padding:0,
        margin:0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textControlChat:{
        textAlign:'center'
    },
    listUser:{
        textAlign:'center',
        margin: 5,
        backgroundColor:'#eaeaea',
        height: 30,
        borderRadius: 15,
        lineHeight: 24,
        justifyContent:'center',
        alignItems: 'center'
    },
    numberChatPrivate:{
        color:'red',
        padding:5,
        backgroundColor:'green',
        width:20,
        height:20,
        borderRadius:10,
        postision:'absolute',
        right:15,
        top: 3
    },
    boxNumberNotifi:{
        zIndex:1111111111111,
        backgroundColor:'red',
        padding:1,
        position:'absolute',
        top:4,
        right:5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        width:30,
        height:16,
    },
    numberNotifi:{
        color:'#fff',
        fontSize:10,
    },
    boxNotifiPrivate:{
        zIndex:1111111111111,
        backgroundColor:'red',
        padding:1,
        position:'absolute',
        top:4,
        right:5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        width:30,
        height:16,
    },
    styleMenuDisable: {
        zIndex: 100,
        backgroundColor: '#777',
        width: 35,
        height: 25,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:15,
        marginTop:5,
        marginBottom:5,
        borderRadius: 3
    },
    styleMenuEnable: {
		zIndex: 100, 
		backgroundColor: '#0084ff',
		width: 35, 
		height: 25,
		justifyContent: 'center', 
		alignItems: 'center', 
		marginLeft:15,
		marginTop:5,
		marginBottom:5,
		borderRadius: 3
    },
    fontAwesomeWarning:{
        textAlignVertical: 'center',
        color: '#fff',
        fontSize: 16,
    },
    boxNumbernoti:{
		zIndex:111111111,
		backgroundColor:'red',
		padding:0,
		position:'absolute',
		top:0,
		right:-1,
		width:16,
		height:12,
		borderRadius:6,
		justifyContent:'center',
		alignItems:'center'
    },
    sidebarNumbernoti:{
        color:'#fff',
        fontSize:8
    },
});

const styles = createStyles(
    base,
    minHeight(752, {
        textControlChat:{
            fontSize:responsiveFontSize(1.3),
        },
        listUser:{
            fontSize: responsiveFontSize(1.3),
        },
        numberNotifi:{
            fontSize:responsiveFontSize(0.8),
        },
        boxNotifiPrivate:{
            padding:2,
            width:26,
            height:18,
        },
        boxNumberNotifi:{
            padding:2,
            width:26,
            height:18,
        }
    })
  );
  
  export default styles;
