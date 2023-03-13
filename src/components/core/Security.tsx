import { observer } from "mobx-react-lite";
import React from 'react'
import { View, Text } from 'react-native'
import { useAuthorizationStore } from "../../hooks/store";

const Security = observer(() => {
    const authorizationStore = useAuthorizationStore();
    const authenticationStore = useAuthorizationStore();
    return (
        <View>
            <Text></Text>
        </View>
    )
})

export default Security;