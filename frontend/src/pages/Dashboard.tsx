import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Project } from '../types'
import api from '../api/axios'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(
          user?.role === 'admin' ? '/projects' : `/projects/customer/${user?._id}`
        )
        setProjects(response.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Projects Overview</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project._id}
            to={`/projects/${project._id}`}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
              <div className="mt-2">
                <div className="text-sm text-gray-500">
                  Status: {project.status}
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Progress: {project.progress}%
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
