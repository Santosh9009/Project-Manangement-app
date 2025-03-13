import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Project } from '../types'
import { PieChart, Pie, Cell } from 'recharts'
import api from '../api/axios'

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`)
        setProject(response.data)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading || !project) {
    return <div>Loading...</div>
  }

  const pieData = [
    { name: 'Progress', value: project.progress },
    { name: 'Remaining', value: 100 - project.progress },
  ]

  const COLORS = ['#4f46e5', '#e5e7eb']

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{project.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Project Details</h2>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">{project.status}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Building Type</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {project.buildingType}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Square Feet</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {project.squareFeet}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex justify-center">
            <PieChart width={200} height={200}>
              <Pie
                data={pieData}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Project Updates</h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {project.updates.map((update, idx) => (
                <li key={idx}>
                  <div className="relative pb-8">
                    {idx !== project.updates.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <span className="text-white text-sm">
                            {update.progress}%
                          </span>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {update.description}
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {new Date(update.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
