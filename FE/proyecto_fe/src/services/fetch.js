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


async function DeleteData(endpoint) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok && response.status !== 204) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

     
        if (response.status === 204) {
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in DeleteData:', error);
        throw error;
    }
}
export { DeleteData };