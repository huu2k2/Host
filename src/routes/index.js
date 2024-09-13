// All components mapping with path for internal routes

import { lazy } from 'react'
import { UpdateHome } from '../features/createHome/updateHome'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const HomeManagement = lazy(() => import('../pages/protected/HomeManagement'))
const RoomManagement = lazy(() => import('../pages/protected/RoomManagement'))

const CreateHome = lazy(() => import('../pages/protected/CreateHome'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))  
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'))
const Accuracy = lazy(() => import('../pages/Accuracy'))
const ChangePassword = lazy(() => import('../pages/ChangePassword'))

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/leads',
    component: Leads,
  },
  {
    path: '/homemanagement/:idHome',
    component: HomeManagement,
  },
  {
    path: '/roommanagement/*',
    component: RoomManagement,
  },
  {
    path: '/homemanagement/createHome',
    component: CreateHome,
  },
  {
    path: '/homemanagement/updateHome/:idHome',
    component: UpdateHome,
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
  },
  {
    path: '/accuracy',
    component: Accuracy,
  },
  {
    path: '/change-password',
    component: ChangePassword,
  }
]

export default routes
