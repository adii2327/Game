const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    const teamStats = {
        totalMembers: 247,
        activeProjects: 12,
        completedSprints: 89,
        wellnessScore: 8.7
    };
    
    res.render('index', { 
        title: 'CTS VibeApp - Team Productivity Hub',
        message: 'Welcome to CTS VibeApp!',
        stats: teamStats,
        currentTime: new Date().toLocaleString()
    });
});

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
        version: '2.0.0'
    });
});

app.get('/api/team-mood', (req, res) => {
    const moods = ['😊', '😐', '😔', '🚀', '💪', '🎯', '☕', '🔥'];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const moodData = {
        current_mood: randomMood,
        team_energy: Math.floor(Math.random() * 100) + 1,
        productivity_score: (Math.random() * 10).toFixed(1),
        timestamp: new Date().toISOString()
    };
    res.json(moodData);
});

app.get('/api/project-status', (req, res) => {
    const projects = [
        { name: 'Azure Migration', progress: 85, status: 'On Track', priority: 'High' },
        { name: 'API Modernization', progress: 67, status: 'In Progress', priority: 'Medium' },
        { name: 'Security Enhancement', progress: 92, status: 'Almost Done', priority: 'High' },
        { name: 'Mobile App Update', progress: 45, status: 'In Progress', priority: 'Low' }
    ];
    res.json(projects);
});

app.get('/api/deployment-info', (req, res) => {
    res.json({
        app_name: 'cts-vibeapp-2025',
        deployment_date: new Date().toISOString(),
        azure_region: 'East US',
        runtime: 'Node.js 18 LTS',
        deployed_by: 'CTS DevOps Team',
        build_number: Math.floor(Math.random() * 1000) + 100,
        git_commit: 'abc123def456',
        status: 'Successfully Deployed ✅'
    });
});

// Enhanced API Routes with new features

// Task Management API
app.get('/api/tasks', (req, res) => {
    const tasks = [
        { id: 1, title: 'Complete Azure deployment', assignee: 'John Doe', priority: 'High', status: 'In Progress', dueDate: '2025-07-28' },
        { id: 2, title: 'Code review for API endpoints', assignee: 'Jane Smith', priority: 'Medium', status: 'Pending', dueDate: '2025-07-27' },
        { id: 3, title: 'Update documentation', assignee: 'Mike Johnson', priority: 'Low', status: 'Completed', dueDate: '2025-07-26' },
        { id: 4, title: 'Security vulnerability assessment', assignee: 'Sarah Wilson', priority: 'High', status: 'In Progress', dueDate: '2025-07-29' }
    ];
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: Date.now(),
        title: req.body.title || 'New Task',
        assignee: req.body.assignee || 'Unassigned',
        priority: req.body.priority || 'Medium',
        status: 'Pending',
        dueDate: req.body.dueDate || new Date().toISOString().split('T')[0]
    };
    res.json({ message: 'Task created successfully', task: newTask });
});

// Team Chat API
app.get('/api/chat/messages', (req, res) => {
    const messages = [
        { id: 1, user: 'Alice', message: 'Great work on the deployment!', timestamp: '2025-07-26 10:30', avatar: '👩‍💻' },
        { id: 2, user: 'Bob', message: 'The new features look amazing 🚀', timestamp: '2025-07-26 10:32', avatar: '👨‍💼' },
        { id: 3, user: 'Carol', message: 'Ready for the demo tomorrow?', timestamp: '2025-07-26 10:35', avatar: '👩‍🎨' },
        { id: 4, user: 'David', message: 'All tests are passing ✅', timestamp: '2025-07-26 10:38', avatar: '🧑‍💻' }
    ];
    res.json(messages);
});

// Team Calendar/Events API
app.get('/api/events', (req, res) => {
    const events = [
        { id: 1, title: 'Sprint Planning', date: '2025-07-28', time: '09:00', type: 'meeting', attendees: 8 },
        { id: 2, title: 'Azure Workshop', date: '2025-07-29', time: '14:00', type: 'training', attendees: 15 },
        { id: 3, title: 'Team Building Activity', date: '2025-07-30', time: '16:00', type: 'social', attendees: 12 },
        { id: 4, title: 'Code Review Session', date: '2025-07-31', time: '11:00', type: 'review', attendees: 6 }
    ];
    res.json(events);
});

// Performance Analytics API
app.get('/api/analytics', (req, res) => {
    const analytics = {
        productivity: {
            current_week: 87,
            last_week: 82,
            trend: 'up'
        },
        team_performance: {
            tasks_completed: 156,
            bugs_fixed: 23,
            code_reviews: 45,
            deployment_success_rate: 94
        },
        wellness_metrics: {
            stress_level: 3.2,
            satisfaction_score: 8.4,
            work_life_balance: 7.8,
            team_morale: 9.1
        },
        project_velocity: [
            { sprint: 'Sprint 1', completed: 23, planned: 25 },
            { sprint: 'Sprint 2', completed: 28, planned: 25 },
            { sprint: 'Sprint 3', completed: 31, planned: 30 },
            { sprint: 'Sprint 4', completed: 27, planned: 30 }
        ]
    };
    res.json(analytics);
});

// Notification Center API
app.get('/api/notifications', (req, res) => {
    const notifications = [
        { id: 1, title: 'Deployment Successful', message: 'CTS VibeApp deployed to Azure', type: 'success', timestamp: '2025-07-26 09:45', read: false },
        { id: 2, title: 'New Task Assigned', message: 'Code review task assigned to you', type: 'info', timestamp: '2025-07-26 08:30', read: false },
        { id: 3, title: 'Meeting Reminder', message: 'Sprint planning in 30 minutes', type: 'warning', timestamp: '2025-07-26 08:00', read: true },
        { id: 4, title: 'System Update', message: 'Security patches applied successfully', type: 'success', timestamp: '2025-07-25 23:45', read: true }
    ];
    res.json(notifications);
});

// Employee Recognition API
app.get('/api/recognition', (req, res) => {
    const recognitions = [
        { id: 1, employee: 'John Doe', achievement: 'Exceptional Problem Solving', points: 100, badge: '🏆', date: '2025-07-25' },
        { id: 2, employee: 'Jane Smith', achievement: 'Team Collaboration', points: 85, badge: '🤝', date: '2025-07-24' },
        { id: 3, employee: 'Mike Johnson', achievement: 'Innovation Leader', points: 120, badge: '💡', date: '2025-07-23' },
        { id: 4, employee: 'Sarah Wilson', achievement: 'Quality Champion', points: 95, badge: '⭐', date: '2025-07-22' }
    ];
    res.json(recognitions);
});

// Advanced Analytics APIs
app.get('/api/productivity-trends', (req, res) => {
    const productivityData = {
        weekly_trends: [
            { week: 'Week 1', productivity: 85, tasks: 45, bugs: 3 },
            { week: 'Week 2', productivity: 88, tasks: 52, bugs: 2 },
            { week: 'Week 3', productivity: 91, tasks: 58, bugs: 1 },
            { week: 'Week 4', productivity: 87, tasks: 49, bugs: 4 }
        ],
        department_comparison: [
            { dept: 'Development', score: 89, employees: 25 },
            { dept: 'QA Testing', score: 92, employees: 15 },
            { dept: 'DevOps', score: 87, employees: 8 },
            { dept: 'UI/UX', score: 85, employees: 12 }
        ],
        skill_metrics: {
            javascript: { current: 92, target: 95, growth: '+3%' },
            azure: { current: 88, target: 90, growth: '+5%' },
            nodejs: { current: 85, target: 88, growth: '+4%' },
            testing: { current: 82, target: 85, growth: '+2%' }
        }
    };
    res.json(productivityData);
});

// Employee Performance Tracking
app.get('/api/employee-performance/:id', (req, res) => {
    const employeeId = req.params.id;
    const performance = {
        employee_id: employeeId,
        name: 'John Doe',
        performance_score: 87,
        monthly_metrics: [
            { month: 'Jan', tasks_completed: 23, quality_score: 89, collaboration: 85 },
            { month: 'Feb', tasks_completed: 28, quality_score: 91, collaboration: 88 },
            { month: 'Mar', tasks_completed: 31, quality_score: 87, collaboration: 92 },
            { month: 'Apr', tasks_completed: 26, quality_score: 93, collaboration: 89 }
        ],
        achievements: [
            { title: 'Code Quality Champion', date: '2025-03-15', points: 100 },
            { title: 'Team Collaboration Star', date: '2025-04-02', points: 85 },
            { title: 'Innovation Leader', date: '2025-04-20', points: 120 }
        ],
        current_projects: [
            { name: 'Azure Migration', progress: 78, role: 'Lead Developer' },
            { name: 'API Modernization', progress: 45, role: 'Backend Developer' }
        ]
    };
    res.json(performance);
});

// Knowledge Base & Learning Management
app.get('/api/knowledge-base', (req, res) => {
    const knowledgeBase = {
        categories: [
            {
                name: 'Technical Documentation',
                articles: [
                    { title: 'Azure DevOps Best Practices', views: 245, rating: 4.8 },
                    { title: 'Node.js Performance Optimization', views: 189, rating: 4.6 },
                    { title: 'Database Design Patterns', views: 156, rating: 4.9 }
                ]
            },
            {
                name: 'Process Guidelines',
                articles: [
                    { title: 'Code Review Checklist', views: 298, rating: 4.7 },
                    { title: 'Agile Sprint Planning', views: 234, rating: 4.5 },
                    { title: 'Incident Response Procedures', views: 167, rating: 4.8 }
                ]
            }
        ],
        trending_searches: [
            'Azure deployment', 'React hooks', 'SQL optimization', 'Git workflows'
        ],
        recent_updates: [
            { title: 'Updated Security Guidelines', date: '2025-08-01' },
            { title: 'New API Documentation', date: '2025-07-28' }
        ]
    };
    res.json(knowledgeBase);
});

// Dashboard routes
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { 
        title: 'Team Dashboard - CTS VibeApp'
    });
});

app.get('/wellness', (req, res) => {
    res.render('wellness', { 
        title: 'Team Wellness - CTS VibeApp'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', { 
        title: 'Project Status - CTS VibeApp'
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About - CTS VibeApp',
        deploymentInfo: {
            version: '2.0.0',
            deployedOn: new Date().toLocaleDateString(),
            features: [
                'Real-time Team Dashboard',
                'Project Status Tracking',
                'Team Wellness Monitoring',
                'Azure Cloud Integration',
                'Responsive Design',
                'REST API Endpoints'
            ]
        }
    });
});

// New enhanced page routes
app.get('/tasks', (req, res) => {
    res.render('tasks', { 
        title: 'Task Management - CTS VibeApp'
    });
});

app.get('/chat', (req, res) => {
    res.render('chat', { 
        title: 'Team Chat - CTS VibeApp'
    });
});

app.get('/calendar', (req, res) => {
    res.render('calendar', { 
        title: 'Team Calendar - CTS VibeApp'
    });
});

app.get('/analytics', (req, res) => {
    res.render('analytics', { 
        title: 'Performance Analytics - CTS VibeApp'
    });
});

app.get('/notifications', (req, res) => {
    res.render('notifications', { 
        title: 'Notification Center - CTS VibeApp'
    });
});

app.get('/recognition', (req, res) => {
    res.render('recognition', { 
        title: 'Employee Recognition - CTS VibeApp'
    });
});

// Advanced Dashboard Routes
app.get('/live-dashboard', (req, res) => {
    res.render('live-dashboard', { 
        title: 'Live Collaboration Dashboard - CTS VibeApp',
        currentTime: new Date().toLocaleString()
    });
});

app.get('/ai-insights', (req, res) => {
    res.render('ai-insights', { 
        title: 'AI-Powered Insights - CTS VibeApp',
        currentTime: new Date().toLocaleString()
    });
});

// AI-Powered Recommendations API
app.get('/api/ai-recommendations', (req, res) => {
    const recommendations = {
        project_optimization: [
            {
                type: 'timeline',
                priority: 'high',
                title: 'Parallelize Development Tasks',
                description: 'API development and UI components can be executed in parallel',
                impact: 'Reduce project timeline by 4 days',
                confidence: 87,
                effort: 'low'
            },
            {
                type: 'resource',
                priority: 'medium',
                title: 'Redistribute Workload',
                description: 'Bob Smith is at 92% capacity, redistribute 2 tasks to Carol',
                impact: 'Prevent burnout, improve team balance',
                confidence: 94,
                effort: 'medium'
            }
        ],
        skill_development: [
            {
                skill: 'Machine Learning',
                recommended_for: ['Alice Chen', 'David Lee'],
                training_plan: 'Azure ML Fundamentals + Hands-on Project',
                duration: '6 weeks',
                roi: 'High - Enable AI feature development',
                cost_benefit: 'Investment: $800, Expected value: $15,000'
            },
            {
                skill: 'Kubernetes',
                recommended_for: ['Bob Smith', 'Carol Johnson'],
                training_plan: 'CKA Certification Path',
                duration: '4 weeks',
                roi: 'Medium - Improve deployment efficiency',
                cost_benefit: 'Investment: $600, Expected value: $8,000'
            }
        ],
        quality_improvements: [
            {
                area: 'Testing Coverage',
                current: 78,
                target: 95,
                actions: ['Add integration tests for payment module', 'Implement E2E testing'],
                timeline: '2 weeks',
                risk_reduction: '65%'
            },
            {
                area: 'Code Review Process',
                current: 'Manual',
                target: 'Automated + AI-assisted',
                actions: ['Setup SonarQube', 'Implement GitHub Actions'],
                timeline: '1 week',
                efficiency_gain: '40%'
            }
        ]
    };
    res.json(recommendations);
});

// Advanced Team Analytics API
app.get('/api/team-analytics/advanced', (req, res) => {
    const analytics = {
        collaboration_patterns: {
            cross_team_interactions: [
                { teams: ['Frontend', 'Backend'], frequency: 23, quality_score: 8.4 },
                { teams: ['DevOps', 'QA'], frequency: 18, quality_score: 9.1 },
                { teams: ['Design', 'Frontend'], frequency: 31, quality_score: 8.8 }
            ],
            communication_effectiveness: {
                response_time_avg: '2.3 hours',
                resolution_rate: 89,
                satisfaction_score: 8.6,
                preferred_channels: ['Slack', 'Video Calls', 'Code Reviews']
            }
        },
        innovation_metrics: {
            ideas_submitted: 47,
            ideas_implemented: 12,
            innovation_score: 7.8,
            top_innovators: [
                { name: 'Carol Johnson', ideas: 8, implementations: 3 },
                { name: 'Alice Chen', ideas: 6, implementations: 2 },
                { name: 'David Lee', ideas: 5, implementations: 2 }
            ]
        },
        learning_velocity: {
            avg_skills_acquired_per_quarter: 2.3,
            certification_completion_rate: 78,
            knowledge_sharing_sessions: 12,
            mentorship_pairs: 6
        },
        predictive_insights: {
            delivery_confidence: 92,
            quality_forecast: 'Excellent',
            risk_factors: [
                { factor: 'Team capacity', risk_level: 'medium', mitigation: 'Add contractor support' },
                { factor: 'Technical debt', risk_level: 'low', mitigation: 'Scheduled refactoring sprints' }
            ]
        }
    };
    res.json(analytics);
});

// Smart Notifications API
app.get('/api/smart-notifications', (req, res) => {
    const notifications = {
        urgent: [
            {
                id: 1,
                type: 'burnout_alert',
                title: 'Team Member Burnout Risk',
                message: 'Bob Smith showing signs of high stress - immediate attention needed',
                action: 'Schedule 1:1 meeting',
                timestamp: new Date(Date.now() - 300000).toISOString()
            }
        ],
        important: [
            {
                id: 2,
                type: 'optimization',
                title: 'Sprint Optimization Opportunity',
                message: 'AI detected 12% efficiency gain possible by task reordering',
                action: 'Review sprint board',
                timestamp: new Date(Date.now() - 3600000).toISOString()
            },
            {
                id: 3,
                type: 'skill_gap',
                title: 'Critical Skill Gap Identified',
                message: 'Machine Learning expertise needed for upcoming AI features',
                action: 'Plan training program',
                timestamp: new Date(Date.now() - 7200000).toISOString()
            }
        ],
        info: [
            {
                id: 4,
                type: 'achievement',
                title: 'Team Milestone Reached',
                message: 'Congratulations! 500+ commits milestone achieved',
                action: 'Celebrate with team',
                timestamp: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 5,
                type: 'suggestion',
                title: 'New Integration Available',
                message: 'Microsoft Teams integration now available for enhanced collaboration',
                action: 'Explore integration',
                timestamp: new Date(Date.now() - 172800000).toISOString()
            }
        ]
    };
    res.json(notifications);
});

// Smart Calendar & Scheduling APIs
app.get('/api/smart-calendar', (req, res) => {
    const calendarData = {
        events: [
            {
                id: 1,
                title: 'Sprint Planning',
                start: '2025-08-10T09:00:00',
                end: '2025-08-10T11:00:00',
                type: 'meeting',
                attendees: ['Alice Chen', 'Bob Smith', 'Carol Johnson', 'David Lee'],
                location: 'Conference Room A',
                priority: 'high',
                ai_optimized: true,
                conflicts: []
            },
            {
                id: 2,
                title: 'Code Review Session',
                start: '2025-08-10T14:00:00',
                end: '2025-08-10T15:30:00',
                type: 'review',
                attendees: ['Alice Chen', 'David Lee'],
                location: 'Virtual',
                priority: 'medium',
                ai_optimized: true,
                conflicts: []
            },
            {
                id: 3,
                title: 'Team Wellness Check',
                start: '2025-08-11T10:00:00',
                end: '2025-08-11T10:30:00',
                type: 'wellness',
                attendees: ['All Team'],
                location: 'Wellness Room',
                priority: 'high',
                ai_optimized: false,
                conflicts: ['Bob Smith - High stress level detected']
            },
            {
                id: 4,
                title: 'AI/ML Training Workshop',
                start: '2025-08-12T13:00:00',
                end: '2025-08-12T17:00:00',
                type: 'training',
                attendees: ['Alice Chen', 'Carol Johnson', 'David Lee'],
                location: 'Training Center',
                priority: 'medium',
                ai_optimized: true,
                conflicts: []
            }
        ],
        optimization_suggestions: [
            {
                suggestion: 'Move Code Review to 2 PM to avoid Alice\'s peak productivity hours (10 AM - 12 PM)',
                impact: '+15% efficiency',
                confidence: 89
            },
            {
                suggestion: 'Schedule Bob\'s 1:1 meeting before Sprint Planning for better context',
                impact: 'Reduced stress, better planning',
                confidence: 94
            }
        ],
        team_availability: {
            'Alice Chen': { available_hours: 32, peak_hours: '10:00-12:00', low_energy: '14:00-15:00' },
            'Bob Smith': { available_hours: 28, peak_hours: '09:00-11:00', low_energy: '15:00-16:00' },
            'Carol Johnson': { available_hours: 35, peak_hours: '11:00-13:00', low_energy: '16:00-17:00' },
            'David Lee': { available_hours: 30, peak_hours: '08:00-10:00', low_energy: '13:00-14:00' }
        }
    };
    res.json(calendarData);
});

// Meeting Intelligence API
app.get('/api/meeting-intelligence', (req, res) => {
    const intelligence = {
        upcoming_meetings: [
            {
                meeting: 'Sprint Planning',
                preparation_score: 85,
                attendance_prediction: 95,
                suggested_agenda: [
                    'Review previous sprint velocity',
                    'Discuss upcoming user stories',
                    'Address technical debt items',
                    'Plan capacity for next 2 weeks'
                ],
                pre_meeting_actions: [
                    'Share user story estimates with team',
                    'Review burndown chart',
                    'Prepare technical debt backlog'
                ]
            }
        ],
        meeting_patterns: {
            average_duration: 45,
            on_time_percentage: 78,
            productivity_rating: 7.2,
            most_productive_time: '10:00 AM',
            least_productive_time: '4:00 PM'
        },
        smart_recommendations: [
            'Schedule important meetings during team peak hours (10 AM - 12 PM)',
            'Limit Friday afternoon meetings to improve work-life balance',
            'Use async communication for status updates to reduce meeting overhead'
        ]
    };
    res.json(intelligence);
});

// Resource Booking API
app.get('/api/resource-booking', (req, res) => {
    const resources = {
        rooms: [
            { id: 1, name: 'Conference Room A', capacity: 8, equipment: ['Projector', 'Whiteboard', 'Video Conf'], available: true },
            { id: 2, name: 'Meeting Pod B', capacity: 4, equipment: ['TV Screen', 'Phone'], available: false },
            { id: 3, name: 'Wellness Room', capacity: 12, equipment: ['Yoga Mats', 'Meditation Setup'], available: true }
        ],
        equipment: [
            { id: 1, name: 'Portable Projector', available: true, location: 'IT Closet' },
            { id: 2, name: 'Video Camera Setup', available: false, location: 'Conference Room A' },
            { id: 3, name: 'Wireless Presenter', available: true, location: 'Reception' }
        ],
        booking_suggestions: [
            'Conference Room A is optimal for your 8-person sprint planning meeting',
            'Wellness Room available for team building activities this afternoon',
            'Consider booking Meeting Pod B for your 1:1 sessions'
        ]
    };
    res.json(resources);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: '404 - Page Not Found'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;

// Advanced Data Export & Reporting APIs
app.get('/api/export/team-report', (req, res) => {
    const teamReport = {
        report_metadata: {
            generated_at: new Date().toISOString(),
            report_type: 'Comprehensive Team Performance',
            period: 'Q3 2025',
            generated_by: 'AI Analytics Engine'
        },
        executive_summary: {
            overall_performance: 'Excellent',
            key_achievements: [
                'Increased team velocity by 22% over the quarter',
                'Reduced bug rate from 4.2% to 2.1%',
                'Achieved 94% test coverage across all projects',
                'Completed Azure migration ahead of schedule'
            ],
            areas_of_concern: [
                'Bob Smith showing signs of burnout - immediate attention required',
                'Machine Learning skills gap identified for upcoming AI features'
            ],
            recommendations: [
                'Implement pair programming to distribute knowledge',
                'Schedule ML training for 3 team members',
                'Consider adding mid-level developer to balance workload'
            ]
        },
        team_metrics: {
            productivity: {
                story_points_completed: 168,
                average_velocity: 42,
                velocity_trend: '+18%',
                sprint_completion_rate: 94
            },
            quality: {
                bug_density: 2.1,
                test_coverage: 94,
                code_review_coverage: 100,
                deployment_success_rate: 96
            },
            collaboration: {
                cross_team_interactions: 89,
                knowledge_sharing_sessions: 12,
                mentorship_active_pairs: 6,
                innovation_ideas_submitted: 23
            }
        },
        individual_performance: [
            {
                name: 'Alice Chen',
                role: 'Senior Frontend Developer',
                performance_score: 9.2,
                key_contributions: ['Led UI/UX improvements', 'Mentored junior developers'],
                growth_areas: ['Backend technologies', 'System architecture'],
                goals_next_quarter: ['Complete full-stack certification', 'Lead mobile app project']
            },
            {
                name: 'Bob Smith',
                role: 'DevOps Engineer',
                performance_score: 8.8,
                key_contributions: ['Azure migration success', 'CI/CD optimization'],
                growth_areas: ['Work-life balance', 'Delegation skills'],
                goals_next_quarter: ['Reduce overtime by 30%', 'Train team on DevOps practices']
            },
            {
                name: 'Carol Johnson',
                role: 'UI/UX Designer',
                performance_score: 9.0,
                key_contributions: ['Design system creation', 'User research insights'],
                growth_areas: ['Technical implementation', 'Data visualization'],
                goals_next_quarter: ['Learn React basics', 'Design analytics dashboard']
            },
            {
                name: 'David Lee',
                role: 'Backend Developer',
                performance_score: 8.7,
                key_contributions: ['API performance optimization', 'Database design'],
                growth_areas: ['Frontend collaboration', 'Communication skills'],
                goals_next_quarter: ['Improve cross-team collaboration', 'Complete Azure certification']
            }
        ],
        predictive_insights: {
            next_quarter_forecast: {
                expected_velocity: 45,
                confidence_level: 87,
                risk_factors: ['Potential team member burnout', 'New technology learning curve'],
                opportunities: ['AI feature development', 'Mobile app expansion']
            },
            skill_development_plan: {
                critical_skills: ['Machine Learning', 'Mobile Development', 'Cloud Security'],
                training_budget_required: '$3,200',
                expected_roi: '250% within 12 months'
            }
        }
    };
    
    res.json(teamReport);
});

app.get('/api/export/project-analytics', (req, res) => {
    const projectAnalytics = {
        project_overview: {
            total_projects: 8,
            active_projects: 3,
            completed_projects: 4,
            on_hold_projects: 1,
            success_rate: 87
        },
        detailed_projects: [
            {
                name: 'CTS VibeApp Enhancement',
                status: 'In Progress',
                progress: 75,
                team_size: 4,
                start_date: '2025-07-01',
                expected_completion: '2025-08-15',
                budget_utilization: 68,
                key_metrics: {
                    story_points_completed: 67,
                    bugs_found: 8,
                    test_coverage: 92,
                    customer_satisfaction: 9.1
                },
                risks: [
                    { risk: 'Scope creep', probability: 'Medium', impact: 'High' },
                    { risk: 'Resource availability', probability: 'Low', impact: 'Medium' }
                ]
            },
            {
                name: 'Azure Migration Project',
                status: 'Completed',
                progress: 100,
                team_size: 3,
                start_date: '2025-06-01',
                completion_date: '2025-07-15',
                budget_utilization: 95,
                key_metrics: {
                    story_points_completed: 84,
                    bugs_found: 3,
                    test_coverage: 96,
                    customer_satisfaction: 9.4
                },
                lessons_learned: [
                    'Early stakeholder engagement crucial for success',
                    'Automated testing saved 40% of QA time',
                    'Documentation quality directly impacts maintenance'
                ]
            }
        ],
        resource_utilization: {
            team_capacity_utilization: 84,
            average_overtime_hours: 3.2,
            resource_conflicts: 2,
            optimal_team_size_recommendation: 5
        },
        financial_metrics: {
            total_budget_allocated: '$125,000',
            budget_spent: '$89,500',
            budget_remaining: '$35,500',
            cost_per_story_point: '$532',
            roi_percentage: 245
        }
    };
    
    res.json(projectAnalytics);
});

// Route for advanced projects
app.get('/advanced-projects', (req, res) => {
    res.render('advanced-projects', { 
        title: 'Advanced Project Management - CTS VibeApp',
        currentTime: new Date().toLocaleString()
    });
});

// Wellness Trends API
app.get('/api/wellness/trends', (req, res) => {
    const wellnessTrends = {
        team_wellness_score: 7.8,
        trend: 'improving',
        monthly_data: [
            { month: 'May', score: 7.2, stress_level: 4.8, satisfaction: 7.5 },
            { month: 'June', score: 7.5, stress_level: 4.2, satisfaction: 7.8 },
            { month: 'July', score: 7.8, stress_level: 3.9, satisfaction: 8.1 },
            { month: 'August', score: 8.1, stress_level: 3.6, satisfaction: 8.4 }
        ],
        stress_indicators: [
            { indicator: 'Overtime hours', current: 3.2, target: 2.0, status: 'needs_attention' },
            { indicator: 'Meeting load', current: 6.5, target: 5.0, status: 'good' },
            { indicator: 'Workload distribution', current: 8.2, target: 8.0, status: 'excellent' }
        ],
        intervention_suggestions: [
            'Schedule team building activity for next Friday',
            'Implement "No Meeting Fridays" policy',
            'Introduce meditation sessions during lunch break',
            'Set up ergonomic workspace assessments'
        ],
        individual_wellness: [
            { name: 'Alice Chen', score: 8.2, trend: 'stable', main_stressor: 'deadline pressure' },
            { name: 'Bob Smith', score: 6.8, trend: 'declining', main_stressor: 'workload' },
            { name: 'Carol Johnson', score: 8.5, trend: 'improving', main_stressor: 'none' },
            { name: 'David Lee', score: 7.9, trend: 'stable', main_stressor: 'technical challenges' }
        ]
    };
    
    res.json(wellnessTrends);
});

// Generate PDF Report (simulated)
app.get('/api/export/pdf-report/:type', (req, res) => {
    const reportType = req.params.type;
    
    const reportData = {
        team: 'Comprehensive team performance report with charts and insights',
        project: 'Detailed project analytics with financial metrics and timelines',
        wellness: 'Team wellness assessment with recommendations and trends'
    };
    
    res.json({
        message: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully`,
        download_url: `/downloads/${reportType}-report-${Date.now()}.pdf`,
        report_size: '2.4 MB',
        pages: reportType === 'team' ? 15 : reportType === 'project' ? 12 : 8,
        generated_at: new Date().toISOString()
    });
});
