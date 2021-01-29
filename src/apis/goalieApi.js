import server from "./server";

export async function get(){
    let { data } = await server.get('/goalie/get');
    return data;
}