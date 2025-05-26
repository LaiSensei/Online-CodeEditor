import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-indigo-600 hover:underline">Code Editor</Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{currentUser?.email}</span>
              <button
                onClick={() => logout()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
} 