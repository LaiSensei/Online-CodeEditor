import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

interface Problem {
  id: string
  title: string
  difficulty: string
  description: string
}

export default function Dashboard() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProblems() {
      try {
        const problemsCollection = collection(db, 'problems')
        const problemsSnapshot = await getDocs(problemsCollection)
        const problemsList = problemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Problem[]
        setProblems(problemsList)
      } catch (error) {
        console.error('Error fetching problems:', error)
      }
      setLoading(false)
    }

    fetchProblems()
  }, [])

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {loading ? (
        <div className="text-center">Loading problems...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {problem.title}
                </h3>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      problem.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-800'
                        : problem.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {problem.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
} 