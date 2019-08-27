import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../Button';

export default class Timer extends React.Component {
    componentWillReceiveProps(newProps){
        const beforeProps = this.props;
        if( !beforeProps.isPlaying && newProps.isPlaying){
            //start the interval
            const timerInterval = setInterval(()=>{
                newProps.addSecond();
            },1000);

            this.setState({
                timerInterval
            });
        }else if(beforeProps.isPlaying && !newProps.isPlaying){
            //end the interval
            clearInterval(this.state.timerInterval);
        }
    }

    render(){
        const { isPlaying, elapsedTime, timeDuration, start, restart, addSecond } = this.props;
        
        return(

            <View style={styles.container}>
                <View style={styles.upper}>
                    <Text style={styles.time}>25:00</Text>
             </View>
                <View style={styles.lower}>
                    { !isPlaying && <Button iconName="play-circle" onPress= { start } /> }
                    { isPlaying && <Button iconName="stop-circle" onPress= { restart } /> }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#c21807'
    },
    upper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'

    },
    lower: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        color: 'white',
        fontSize: 100
    }
})