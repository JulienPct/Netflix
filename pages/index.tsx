import { getSession, signOut } from 'next-auth/react'
import { NextPageContext } from 'next'
import useCurrentUser from '@/hooks/useCurrentUsers'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className='text-4xl text-green-500'>Netflix</h1>
      <p className='text-white'>Connecté en tant que : {user?.email}</p>
      <button className='w-full h-10 bg-white' onClick={() => signOut()}>Se déconnecter</button>
    </>
  )
}