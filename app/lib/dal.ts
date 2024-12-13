// import 'server-only'
 
// import { cookies } from 'next/headers'
// import { decrypt } from '@/app/lib/session'
// import { verifyAccessToken } from './db'
 
// export const verifySession = cache(async () => {
//   const cookie = cookies().get('accessToken')?.value
//   const session = await verifyAccessToken(cookie)
 
//   if (!session?.userId) {
//     redirect('/login')
//   }
 
//   return { isAuth: true, userId: session.userId }
// })