import type { APIRoute } from 'astro';
import { getAuthUrl, handleAuthRedirect } from '@/utils/spotify';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const authCode =  params.get('code')
  const password =  params.get('password')
  
  if (!authCode) {
    const redirectUrl = getAuthUrl();
    return Response.redirect(redirectUrl, 302);
  } else {
    if (password) {
      if (password == import.meta.env["AUTHENTICATION_PASSWORD"]) {
        const response = await handleAuthRedirect(authCode);
        return new Response(
          JSON.stringify(response)
        )
      } else {
        return new Response(
          JSON.stringify({success: false, message: "Incorrect password"})
        )
      }
    } else {
      return new Response(
        JSON.stringify({
          message: "Please edit the URL, add a 'password' query and set it to the password you previously added."
        })
      )
    }
  }
}
