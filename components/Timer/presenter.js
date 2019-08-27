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

    formatTime(seconds){
        let minute = Math.floor(seconds / 60);
        seconds -= minute * 60;
        
        return `${minute < 10 ? `0${minute}`: minute }:${seconds < 10 ? `0${seconds}`:seconds}`;
    }

    render(){
        const { isPlaying, elapsedTime, timeDuration, start, restart, pause } = this.props;
        
        return(

            <View style={styles.container}>
                <View style={styles.upper}>
                    <Text style={styles.time}>{this.formatTime(timeDuration - elapsedTime)}</Text>
                </View>
                <View style={styles.lower}>
                { !isPlaying && <Button iconName="play-circle" onPress= { start } /> }
                { isPlaying &&  <View style={styles.lower}>
                                    <View style={{paddingRight: 30}}>
                                        <Button style={styles.padding} iconName="stop-circle" onPress= { restart } /> 
                                    </View>
                                    <View>
                                        <Button style={styles.padding} iconName="pause-circle" onPress= { pause } />
                                    </View>
                                </View> }
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        color: 'white',
        fontSize: 100
    }
})