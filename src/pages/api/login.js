import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider'

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send()

    const params = {
        ClientId: process.env.COGNITO_CLIENT_ID,
        Password: req.body.password,
        Username: req.body.email,     
    }

    const cognitoClient = new CognitoIdentityProviderClient({
        region: process.env.COGNITO_REGION
    })

    const initiateAuthCommand = new InitiateAuthCommand(params)

    try {
        const response = await cognitoClient.send(initiateAuthCommand)
        return res.status(response['$metadata'].httpStatusCode).send()
    } catch (err) {
        console.log(err)
        return res.status(err['$metadata'].httpStatusCode).json({ message: err.toString() })
    }
}