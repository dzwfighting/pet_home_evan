export const getusers = async () => {
    try{
        return await axios.get("http://localhost:9188/users");
    } catch (e){
        throw e;
    }
}