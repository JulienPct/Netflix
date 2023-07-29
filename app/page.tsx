"use client";

import { getSession, signOut } from 'next-auth/react'
import { NextPageContext } from 'next'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}

export default function Home() {
  return (
    <>
      <h1 className='text-4xl text-green-500'>Netflix</h1>
      <button className='w-full h-10 bg-white' onClick={() => signOut()}>Se déconnecter</button>
    </>
  )
}