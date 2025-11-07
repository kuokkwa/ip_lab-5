import jwt from 'jsonwebtoken';

let creds = [
    {
        id: 112,
        username: 'qwerty',
        password: 123
    }
]

export function login(username, password) {
    let foundUser = creds.find(user => user.username == username && user.password == password)
    if (foundUser == undefined) {
        return undefined;
    }

    let jwtKey = jwt.sign({
        id: foundUser.id,
        exp: Math.floor(Date.now() / 1000) + (60 + 60)
    }, process.env.JWT_SECRET);

    return jwtKey;
}