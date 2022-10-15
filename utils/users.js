const users = [];

// join user to chat
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);

    return user;
}

// get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1) {  // returns -1 if it didn't find where id's match
        // remove user from users array and return removed user
        return users.splice(index, 1)[0];  
    }
}

// get room users
function getRoomUsers(room) {
    // return users only when their rooms match room in parameter
    return users.filter(user => user.room === room);
}


module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers };