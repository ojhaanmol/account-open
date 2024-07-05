const crypto = require('crypto');
const { readFileSync, writeFileSync } = require('fs');
const database_path = './database.json';
const read_Agents = ( ) => JSON.parse(readFileSync(database_path,{encoding:'utf8'}));
const commit = ( agents ) => writeFileSync(database_path, JSON.stringify({agents},null,4)); 
const slow = () => new Promise(resolve => {setTimeout(resolve,2000)});
const error_switch = 'stage';
const default_id   = ''
const serverGateway = {
    stage1  : async (params)=> {
        try {
            console.log("server gateway stage 1");
            if('stage1' === error_switch) throw 'error occoured'
            if(params.PassThrough) return params;
            Object.assign(params, {code : "001",message:"stage 1 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 1");
        }
    },
    stage2  : async (params)=> {
        try {
            console.log("server gateway stage 2");
            if('stage2' === error_switch) throw 'error occoured'
            if(params.PassThrough) return params;
            Object.assign(params, {code : "002",message:"stage 2 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 2");
        }
    },
    stage3  : async (params)=> {
        try {
            console.log("server gateway stage 3");
            if('stage3' === error_switch) throw 'error occoured'
            if(params.PassThrough) return params;
            Object.assign(params, {code : "003",message:"stage 3 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 3");
        }
    },
    stage4  : async (params)=> {
        try {
            console.log("server gateway stage 4");
            if('stage4' === error_switch) throw 'error occoured'
            if(params.PassThrough) return params;
            Object.assign(params, {code : "004",message:"stage 4 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 4");
        }
    },
    stage5  : async (params)=> {
        try {
            console.log("server gateway stage 5");
            if('stage5' === error_switch) throw 'error occoured'
            if(params.PassThrough) return params;
            Object.assign(params, {code : "005",message:"stage 5 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 5");
        }
    },
    stage6  : async (params)=> {
        try {
            console.log("server gateway stage 6");
            if('stage6' === error_switch) throw 'error occoured'
            if(params.PassThrough) return params;
            Object.assign(params, {code : "006",message:"stage 6 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 6");
        }
    },
    stage7  : async (params)=> {
        try {
            console.log("server gateway stage 7");
            if('stage7' === error_switch) throw 'error occoured'
            if(params.PassThrough) return params;
            Object.assign(params, {code : "007",message:"stage 7 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 7");
        }
    },
    stage8  : async (params)=> {
        try {
            console.log("server gateway stage 8");
            if('stage8' === error_switch) throw 'error occoured'
            if(params.PassThrough) return params;
            Object.assign(params, {code : "008",message:"stage 8 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 8");
        }
    },
    stage9  : async (params)=> {
        try {
            console.log("server gateway stage 9");
            if('stage9' === error_switch) throw 'error occoured'
            if(params.PassThrough) return params;
            Object.assign(params, {code : "009",message:"stage 9 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 9");
        }
    },
    stage10 : async (params)=> {
        try {
            console.log("sserver gateway stage 10");
            if(params.PassThrough) return params;
            Object.assign(params, {code : "010",message:"stage 10 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 10");
        }
    },
    stage11 : async (params)=> {
        try {
            console.log("sserver gateway stage 11");
            if(params.PassThrough) return params;
            Object.assign(params, {code : "011",message:"stage 11 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 11");
        }
    },
    stage12 : async (params)=> {
        try {
            console.log("sserver gateway stage 12");
            if(params.PassThrough) return params;
            Object.assign(params, {code : "012",message:"stage 12 success"});
            await slow();
            return params;
        } catch (error) {
            throw new Error("failed at serverGateway stage 12");
        }
    }
}
const serverDatabase = {
    get_stage_status    : async(params)=> {
        console.log("server database get stage status");
        return params;
    },
    set_stage_status    : async(params)=> {
        console.log("server database set stage status");
        const levels = ['000','001','002','003','004','005','006','007','008','009','010','011','012'];
        let { agents } = read_Agents();
        const existing_agent = agents.filter( agent =>  agent.id === params.id && levels.includes(agent.code) )[0];
        if(existing_agent && !existing_agent.is_failed ){
            params.PassThrough = true;
            params.code        = existing_agent.code;
            return params;
        }
        if(existing_agent && existing_agent.is_failed ){
            agents = agents.map( agent => existing_agent.id === agent.id ? {id: existing_agent.id, code: '000'} : agent );
            commit(agents);
            return params;
        }
        const new_agent = {
            id       : params.id,
            code     : '000'
        }
        agents.push(new_agent);
        commit(agents)
        return params;
    },
    update_stage_status : async(params)=> {
        console.log("server database update stage status");
        if(params.PassThrough) return params;
        let { agents } = read_Agents();
        const updated_agent = {
            id   : params.id,
            code : params.code
        }
        agents = agents.map( agent => agent.id === params.id ? updated_agent : agent );
        commit(agents);
        return params;
    },
    set_agent_failed    : async(params)=> {
        let { agents } = read_Agents();
        agents = agents.map( agent => agent.id === params.id ? {...agent,is_failed : true} : agent);
        commit( agents )
        return params
    }
}
const webservice_acc_open = async(params) => {
    try {
        console.log("Web");
        return await serverDatabase.set_stage_status(params)
        .then(serverGateway.stage1)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage2)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage3)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage4)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage5)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage6)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage7)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage8)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage9)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage10)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage11)
        .then(serverDatabase.update_stage_status)
        .then(serverGateway.stage12)
        .then(serverDatabase.update_stage_status)
        .catch((error) => {
            serverDatabase.set_agent_failed(params);
            throw error;
        })
    } catch (error) {
        console.log(7,error);
    }
}
const main = async() => {
    const id = default_id || crypto.randomInt(99999,999999);
    const params = {
        id,
        PassThrough:false
    }
    const response = await webservice_acc_open(params);
    console.log("response : ",response);
}
main();