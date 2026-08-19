import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute'
import { Landing } from './pages/Landing'
import { AuthPage } from './pages/AuthPage'
import { ProfilePage } from './pages/Profile'
import { AssessmentPage } from './pages/Assessment'
import { Dashboard } from './pages/Dashboard'
import { Recommendations } from './pages/Recommendations'
import { SkillGap } from './pages/SkillGap'
import { ResumeBuilder } from './pages/ResumeBuilder'
import { JobListings } from './pages/JobListings'
import { AdminPage } from './pages/Admin'
import { AssessmentFeature } from './pages/marketing/AssessmentFeature'
import { RecommendationsFeature } from './pages/marketing/RecommendationsFeature'
import { ResumeBuilderFeature } from './pages/marketing/ResumeBuilderFeature'
import { JobListingsFeature } from './pages/marketing/JobListingsFeature'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/features/assessment" element={<AssessmentFeature />} />
          <Route path="/features/recommendations" element={<RecommendationsFeature />} />
          <Route path="/features/resume-builder" element={<ResumeBuilderFeature />} />
          <Route path="/features/job-listings" element={<JobListingsFeature />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/assessment" element={<ProtectedRoute><AssessmentPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/careers/:id/gap" element={<ProtectedRoute><SkillGap /></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><JobListings /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
