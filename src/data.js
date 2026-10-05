export const platforms = [
  { id: 'chatgpt', label: 'ChatGPT', score: 78, color: '#10a37f' },
  { id: 'perplexity', label: 'Perplexity', score: 71, color: '#20808d' },
  { id: 'gemini', label: 'Gemini', score: 69, color: '#4285f4' },
  { id: 'google-ai', label: 'Google AI', score: 70, color: '#ea4335' },
]

export const competitors = [
  { name: 'XYZ Dental', score: 81, isClient: false },
  { name: 'ABC Dental', score: 72, isClient: true },
  { name: 'Smile Austin', score: 64, isClient: false },
  { name: 'Downtown Dental', score: 58, isClient: false },
]

export const monthlyTrend = [
  { month: 'Jan', score: 18 },
  { month: 'Feb', score: 24 },
  { month: 'Mar', score: 31 },
  { month: 'Apr', score: 36 },
  { month: 'May', score: 48 },
  { month: 'Jun', score: 55 },
  { month: 'Jul', score: 61 },
  { month: 'Aug', score: 72 },
]

export const queryCategories = [
  { category: 'Implants', tracked: 25, mentioned: 17, delta: '+12' },
  { category: 'Cleanings', tracked: 20, mentioned: 16, delta: '+4' },
  { category: 'Cosmetic', tracked: 18, mentioned: 11, delta: '+6' },
  { category: 'Emergency', tracked: 15, mentioned: 9, delta: '+3' },
  { category: 'Orthodontics', tracked: 12, mentioned: 7, delta: '+2' },
  { category: 'Local', tracked: 10, mentioned: 12, delta: '+5' },
]

export const recentQueries = [
  {
    id: 1,
    question: 'What is the best dentist in Austin for dental implants?',
    platform: 'ChatGPT',
    mentioned: true,
    citation: true,
    sentiment: 'positive',
  },
  {
    id: 2,
    question: 'Which dental clinic offers affordable teeth whitening near me?',
    platform: 'Perplexity',
    mentioned: true,
    citation: false,
    sentiment: 'neutral',
  },
  {
    id: 3,
    question: 'Top-rated family dentist in downtown Austin',
    platform: 'Gemini',
    mentioned: false,
    citation: false,
    sentiment: 'neutral',
  },
  {
    id: 4,
    question: 'Best emergency dental services open on weekends',
    platform: 'Google AI',
    mentioned: true,
    citation: true,
    sentiment: 'positive',
  },
  {
    id: 5,
    question: 'Dentist with flexible payment plans for veneers',
    platform: 'ChatGPT',
    mentioned: false,
    citation: false,
    sentiment: 'neutral',
  },
  {
    id: 6,
    question: 'Who is the most experienced implant specialist in Austin?',
    platform: 'Perplexity',
    mentioned: true,
    citation: true,
    sentiment: 'positive',
  },
]

export const nextActions = [
  { id: 1, task: 'Improve implant service page content', priority: 'high', status: 'in-progress' },
  { id: 2, task: 'Strengthen local authority via directory listings', priority: 'medium', status: 'pending' },
  { id: 3, task: 'Fix 3 directory inconsistencies', priority: 'high', status: 'pending' },
  { id: 4, task: 'Pursue 2 relevant publication opportunities', priority: 'medium', status: 'pending' },
  { id: 5, task: 'Generate patient reviews on Google', priority: 'low', status: 'in-progress' },
]
