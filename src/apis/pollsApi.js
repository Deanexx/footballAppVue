import server from "./server";

export async function allPolls(){
    let { data } = await server.get('/poll/getAll');
    return data;
}

export async function regForGame(user){
    let { data } = await server.post('/poll/weeklyVote', user);
    return data;
}

export async function reg(user){
    let { data } = await server.post('/poll/reg', user);
    return data;
}

export async function reset(){
    let { data } = await server.patch('/poll/deleteFromPoll');
    return data;
}

export async function setScore(objScore){
    let { data } = await server.post('/poll/setScore', objScore);
    return data;
}