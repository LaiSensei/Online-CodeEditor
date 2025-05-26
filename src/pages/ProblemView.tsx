import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import { useAuth } from '../contexts/AuthContext'
import MonacoEditor from '@monaco-editor/react'

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
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)

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

  const handleSubmit = async () => {
    if (!currentUser) {
      setSubmitStatus('You must be logged in to submit.')
      return
    }
    try {
      await addDoc(collection(db, 'submissions'), {
        userId: currentUser.uid,
        problemId: problem?.id,
        code,
        createdAt: serverTimestamp(),
      })
      setSubmitStatus('Submission saved!')
    } catch (error) {
      setSubmitStatus('Failed to save submission.')
      console.error(error)
    }
  }

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

          <LiveProvider code={code}>
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Code Editor
                  </h3>
                  <MonacoEditor
                    height="500px"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                    }}
                  />
                  <LiveError className="mt-2 text-red-600" />
                  <button
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                  {submitStatus && (
                    <div className="mt-2 text-sm">
                      {submitStatus}
                    </div>
                  )}
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
          </LiveProvider>
        </div>
      </div>
    </div>
  )
} 