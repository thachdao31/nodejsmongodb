module.exports = (req) => {
    const user = {
        name : req.body.name,
        age: req.body.age,
        class: req.body.class
    }
    let errDataInput = [];
    for(i = 0; i < Object.keys(user).length; i++) {
        if(Object.values(user)[i] == undefined) {
            errDataInput.push(Object.keys(user)[i]);
        }
    }
    if(errDataInput != []) {
        return errDataInput;
    } else {
        return 0;
    }
}