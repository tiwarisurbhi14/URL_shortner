import React from 'react'
import UrlForm from '../components/urlForm'
import UserUrl from '../components/UserUrl'

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen flex flex-col items-center justify-start p-4 pt-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mb-12">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">URL Shortener</h1>
        <UrlForm />
        <UserUrl />
      </div>
    </div>
  )
}

export default Dashboard
