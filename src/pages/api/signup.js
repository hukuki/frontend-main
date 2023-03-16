import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider'

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send()

    const params = {
        ClientId: process.env.COGNITO_CLIENT_ID,
        Password: req.body.password,
        Username: req.body.email,
        UserAttributes: [
            { Name: "given_name", Value: req.body.given_name },
            { Name: "name", Value: req.body.given_name },
            { Name: "family_name", Value: req.body.family_name },
            { Name: "nickname", Value: req.body.nickname },
            { Name: "birthdate", Value: req.body.birthdate },
            { Name: "phone_number", Value: req.body.phone_number },
            { Name: "address", Value: req.body.address },
            { Name: "updated_at", Value: ''+Date.now() },
        ],
    }

    const cognitoClient = new CognitoIdentityProviderClient({
        region: process.env.COGNITO_REGION
    })

    const signUpCommand = new SignUpCommand(params)

    try {
        const response = await cognitoClient.send(signUpCommand)
        return res.status(response['$metadata'].httpStatusCode).send()
    } catch (err) {
        console.log(err)
        return res.status(err['$metadata'].httpStatusCode).json({ message: err.toString() })
    }
}