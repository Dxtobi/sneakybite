import { error, json } from '@sveltejs/kit';

import bcrypt from 'bcrypt';
import crypto from 'crypto';

/** @type {import('./$types').RequestHandler} */



//REGISTER
export async function POST({ request, locals }) {

    try {
        const body = await request.json()
        const customer = await locals.CUSTOMER.findOne({ email: body.email.toLowerCase() })

        //console.log(body)

        if (customer) {
            throw error(400, 'email already exist');
        }
        const pass = await bcrypt.hash(body.password, 10)
       // console.log(pass)
        await locals.CUSTOMER.create({
            email: body.email.toLowerCase(),
            password: pass,
            userAuthToken: crypto.randomUUID(),
            name: body.name,
            role: 'USER',
            phoneNumber: body.phone,
            address: body.address
        },
        );



        return json({ successful: true })
    } catch (/** @type {any} */ error) {
        //  console.log(error)
        return json({ error: true, message: error.message ? error.message : error.body.message })
    }
}

//LOGIN
export async function PUT({ request, locals, cookies }) {

    try {
        const body = await request.json()
        const customer = await locals.CUSTOMER.findOne({ email: body.email.toLowerCase() })

       // console.log(body.password, customer)

        if (!customer) {
            throw error(400, 'wrong details');
        }

        const userPassword = await bcrypt.compare(body.password, customer.password);
        if (!userPassword) {
            throw error(400, 'wrong details')
        }

        const newID = crypto.randomUUID();
        // generate new auth token just in case  
        // eslint-disable-next-line no-unused-vars
        const authenticatedUser = await locals.CUSTOMER.findByIdAndUpdate(customer.id, { userAuthToken: newID })
        if (!authenticatedUser) throw error(400, 'wrong details');

         cookies.set('session-kustomer', newID, {
            // send cookie for every page
            path: '/',
            // server side only cookie so you can't use `document.cookie`
            httpOnly: true,
            // only requests from same site can send cookies
            sameSite: 'strict',
            // only sent over HTTPS in production
            secure: process.env.NODE_ENV === 'production',
            // set cookie to expire after a year
            maxAge: 60 * 60 * 24 * 360,
        })


        locals.customer = customer

       // console.log(cookies_set, cookies)
        return json({ successful: true, token:cookies.get('session-kustomer') })
    } catch (/** @type {any} */ error) {
        //  console.log(error)
        return json({ error: true, message: error.message ? error.message : error.body.message })
    }
}


