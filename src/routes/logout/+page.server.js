import { redirect } from '@sveltejs/kit'


export const load = async ({ cookies, locals}) => {
  // we only use this endpoint for the api
  // and don't need to see the page
  
  locals.customer = null


  cookies.set('session-kustomer', '', {
    path: '/',
    expires: new Date(0),
  });

  cookies.delete('session-kustomer', {
    path: '/',
    expires: new Date(0),
  })

  
  return {
    customer:null
  }
}

export const actions = {
  default({ cookies, locals }) {
    // eat the cookie
    locals.customer = null
    if (!locals.customer) {
      throw redirect(303, '/login')
    }
  
  
  
    cookies.set('session-kustomer', '', {
      path: '/',
      expires: new Date(0),
    });
  
    cookies.delete('session-kustomer', {
      path: '/',
      expires: new Date(0),
    })
  
    throw redirect(302, '/login');
  },
}
