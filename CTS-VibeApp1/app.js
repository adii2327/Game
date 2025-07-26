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
