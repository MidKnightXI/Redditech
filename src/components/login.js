import config from '../api_calls/login_call'

async function callRedApi() {
    try {
        const tmp = await authorize(config);
    } catch(error) {
        console.error(error);
    }
    console.log(tmp);
    return tmp;
}

export default callRedApi();