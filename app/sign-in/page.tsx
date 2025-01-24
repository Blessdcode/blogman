import SignIn from '@/components/sign-in'
import React from 'react'

const pages = () => {
  const toggleSignIn = () => {
    console.log('SignIn toggled');
  };

  return (
    <div>
      <SignIn toggleSignIn={toggleSignIn} />
    </div>
  )
}

export default pages
