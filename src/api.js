const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const app = feathers();


// const endpoint = process.env.REACT_APP_ENDPOINT;

// console.log("endpoint is " + endpoint);

const socket = io('https://sample-project-1982.ue.r.appspot.com', {timeout: 20000});

app.configure(socketio(socket));

const taskService = app.service('task');

const getTasks = async () => {
    return await taskService.find();
};

const createTask = async (payload) => {
    return await taskService.create(payload);
};

const patchTask = async (id, payload) => {
    return await taskService.patch(id, payload);
};

const subscribeToTaskCreated = (fnCallback) => {
    taskService.removeAllListeners("created");
    taskService.on('created', data => {
        fnCallback(data);
    });
};

const subscribeToTaskPatched = (fnCallback) => {
    taskService.removeAllListeners("patched");
    taskService.on('patched', data => {
        fnCallback(data);
    });
};

export {
    getTasks,
    createTask,
    patchTask,
    subscribeToTaskCreated,
    subscribeToTaskPatched
};
