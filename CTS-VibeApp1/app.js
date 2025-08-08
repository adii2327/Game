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
