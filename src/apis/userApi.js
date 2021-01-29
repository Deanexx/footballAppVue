import server from "./server";

export async function getAll(){
    let { data } = await server.get('/footballers/getAll');
    return data;
}

export async function clearUser(){
    let { data } = await server.get('/footballers/clearUser');
    return data;
}