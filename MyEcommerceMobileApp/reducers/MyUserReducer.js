const MyUserReducer = (currentState, action) => {
    // console.log(`Reducer: ${currentState}`)
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return null;
    }
    return currentState;
}

export default MyUserReducer;