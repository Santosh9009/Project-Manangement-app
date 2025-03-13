import { Fragment } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Customers', href: '/customers' },
]

export default function Layout() {
  const { logout, user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <Disclosure as="nav" className="bg-white shadow-sm">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold">Project Management</h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <Menu as="div" className="ml-3 relative">
                    <Menu.Button className="flex text-sm">
                      <UserCircleIcon className="h-8 w-8" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <Menu.Item>
                        {() => (
                          <button
                            onClick={logout}
                            className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
      <div className="py-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
