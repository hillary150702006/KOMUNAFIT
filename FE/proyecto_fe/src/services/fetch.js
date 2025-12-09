async function postData(endpoint,obj) {
    try {
        const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await peticion.json()
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
    }
}
export {postData}

async function GetData(endpoint) {
    try {
        const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (!peticion.ok) {
            throw new Error(`HTTP error! status: ${peticion.status}`);
        }
        
        const data = await peticion.json()
        console.log(data);
        return data
    } catch (error) {
        console.error('Error in GetData:', error);
        throw error;
    }
}
export {GetData}
async function GetDataAutenticado(endpoint) {
    try {
        const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        if (!peticion.ok) {
            throw new Error(`HTTP error! status: ${peticion.status}`);
        }
        
        const data = await peticion.json()
        console.log(data);
        return data
    } catch (error) {
        console.error('Error in GetData:', error);
        throw error;
    }
}
export {GetDataAutenticado}
async function patchData(endpoint,obj) {
    try {
        const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await peticion.json()
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
    }
}
export {patchData}
