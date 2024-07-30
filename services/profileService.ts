import AsyncStorage from "@react-native-async-storage/async-storage";

async function getProfile() {

    try {
        const authDataSerialize = await AsyncStorage.getItem('@authData');

        if (!authDataSerialize) {
            throw new Error("Not auth data storage")
        }

        const { token } = JSON.parse(authDataSerialize)

        const response = await fetch('https://aritmos-salvador511s-projects.vercel.app/api/students', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },

        });

        if (!response.ok) {
            const error = await response.json();
            
            throw new Error(error.message);
        }

        const user = response.json()

        return user

    } catch (error) {
        alert("Error in login")

        return undefined;
    }
}

async function patchProfile(body:object) {

    try {
        const authDataSerialize = await AsyncStorage.getItem('@authData');

        if (!authDataSerialize) {
            throw new Error("Not auth data storage")
        }

        const { token } = JSON.parse(authDataSerialize)


        const response = await fetch('https://aritmos-salvador511s-projects.vercel.app/api/students', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',

            },
            body:JSON.stringify(body),

        });

        if (!response.ok) {
            const error = await response.json();
            
            throw new Error(error.message);
        }

        return response.json();

    } catch (error) {
        alert("Error in login")

        return undefined;
    }
}


export {getProfile, patchProfile};