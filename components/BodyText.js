import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = props => {
   // merging the styles
    return(
        <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
    );

}

const styles = StyleSheet.create({
    body: {
        fontFamily: 'my-bold-sans'
    }
});

export default BodyText;