const dialogflow = require('dialogflow');
const configuteribot = require('../config/configoftalbot')

/*--------------Configuraciones Uteribot------------------*/
process.env.DIALOGFLOW_PRIVATE_KEY = configuteribot.private_key
process.env.DIALOGFLOW_CLIENT_EMAIL = configuteribot.client_email
const LANGUAGE_CODE = configuteribot.lenguaje_code;
var projectId = configuteribot.project_id
var language = LANGUAGE_CODE

class DialogFlow {
	constructor (projectId) {
		this.projectId = projectId

		let privateKey = (process.env.NODE_ENV=="production") ? JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY) : process.env.DIALOGFLOW_PRIVATE_KEY
		let clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL
		let config = {
			credentials: {
				private_key: privateKey,
				client_email: clientEmail
			}
		}
	
		this.sessionClient = new dialogflow.SessionsClient(config)
	}	

}

module.exports ={
    DialogFlow,
    language,
    projectId
}