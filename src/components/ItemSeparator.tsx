import React from 'react'
import { StyleSheet, View } from 'react-native'

interface ItemSeparatorProps {
    width?: number | string;
}

export const ItemSeparator = ({ width = '85%' }: ItemSeparatorProps) => {
  return (
    <View style={{...styles.separator, width}} />
  )
}

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        opacity: 0.2,
        marginVertical: 8,
        alignSelf: 'center',
    }
})
