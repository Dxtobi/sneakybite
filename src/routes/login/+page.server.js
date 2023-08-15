import {  redirect } from '@sveltejs/kit';





export async function load(events) {


  if (events.locals.customer) {
      throw redirect(303, '/')
  }

  return {
    customer:null
  }
 
}


