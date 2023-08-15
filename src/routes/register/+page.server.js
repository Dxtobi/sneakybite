import {  redirect } from '@sveltejs/kit';



export async function load({ locals }) {


  if (locals.customer) {
      throw redirect(303, '/')
  }

 
}


