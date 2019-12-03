let restAPI = {}

// GET Method
// Params: String token, String uri 
// (Example uri: "profile", "concern/rawlist")
// Result: Data | Null
restAPI.getMethod = async (token, uri) => {
    let URL = "https://a8aeksd7j1.execute-api.us-east-2.amazonaws.com/dev/" + uri

    let response = await fetch(
        URL,
        {
        method: "GET",
        headers: {
            Accept: "application/json",
            Origin: "http://localhost:19002",
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "content-type",
            "Access-Control-Request-Method": "POST",
            Authorization: token
        }
        }
    );

    let result = await response.json();
    let data = null

    if (result.statusCode === 200) {
        data = result['data']  
    }

    return data
}

// POST | DELETE Method
// Params: String token, String uri, JSON Object bodyObject, String methodType ("DELETE", "POST")
// (Example uri: "profile", "concern/rawlist")
// Result: JSON Object (from server)
restAPI.postDelMethod = async (token, uri, bodyObject, methodType) => {
    if (methodType != "POST" && methodType != "DELETE") return null

    let URL = "https://a8aeksd7j1.execute-api.us-east-2.amazonaws.com/dev/" + uri

    let response = await fetch(
        URL,
        {
        method: methodType,
        headers: {
            Accept: "application/json",
            Origin: "http://localhost:19002",
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "content-type",
            "Access-Control-Request-Method": "POST",
            Authorization: token
        },
        body: JSON.stringify(bodyObject)
        }
    );

    return (await response.json());
}

// Logging
// Params: String username, String logContent
restAPI.logging = async (username, logContent) => {
    let bodyObject = {
        username: username,
        datetime: (new Date()).toString(),
        log: logContent
    }

    await restAPI.postDelMethod("", 'logging', bodyObject, "POST")
}

module.exports = restAPI;