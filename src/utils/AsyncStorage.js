import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem =async (key, value) =>{
    try {
       await  AsyncStorage.setItem(key,value);
    } catch (error) {
        console.log('setItem: ', error);
    }
};


export const getItem =async (key) =>{
    try {
     await  AsyncStorage.getItem(key);
     
    } catch (error) {
        console.log('getItem: ', error);
    }
};


export const removeItem =async (key) =>{
    try {
       await  AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('removeItem: ', error);
    }
};

