import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { useAuth } from '../contexts/AuthContext'

interface Problem {
  id: string
  title: string
  difficulty: string
  description: string
  initialCode: string
}

export default function ProblemView() {
  const { id } = useParams<{ id: string }>()
  const [problem, setProblem] = useState<Problem | null>(null)
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState('')
  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchProblem() {
      if (!id) return

      try {
        const problemDoc = await getDoc(doc(db, 'problems', id))
        if (problemDoc.exists()) {
          const problemData = { id: problemDoc.id, ...problemDoc.data() } as Problem
          setProblem(problemData)
          setCode(problemData.initialCode)
        }
      } catch (error) {
        console.error('Error fetching problem:', error)
      }
      setLoading(false)
    }

    fetchProblem()
  }, [id])

  if (loading) {
    return <div className="text-center">Loading problem...</div>
  }

  if (!problem) {
    return <div className="text-center">Problem not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {problem.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Difficulty: {problem.difficulty}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="prose max-w-none">
                <p>{problem.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Code Editor
                </h3>
                <LiveProvider code={code} noInline={true}>
                  <LiveEditor
                    onChange={setCode}
                    className="h-[500px] font-mono text-sm"
                  />
                  <LiveError className="mt-2 text-red-600" />
                </LiveProvider>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Preview
                </h3>
                <div className="border rounded-lg p-4 min-h-[500px]">
                  <LivePreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 