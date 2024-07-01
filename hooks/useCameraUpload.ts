import AsyncStorage from "@react-native-async-storage/async-storage";

const useCameraUpload = async (uri) => {
  console.log({uri})
  try {
    const authDataSerialize = await AsyncStorage.getItem('@authData');

    if (!authDataSerialize) {
      throw new Error("Not auth data storage")
    }

    const { token } = JSON.parse(authDataSerialize)

    const response = await fetch('https://aritmos-salvador511s-projects.vercel.app/api/students', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ urlImage: uri }),
    });

    if (!response.ok) {
      await response.json();
      throw new Error(response.message);
    }

    return response.json();

  } catch (error) {
    alert("Error uploading photo")
    console.error(error)

    return undefined;
  }
}

export default useCameraUpload