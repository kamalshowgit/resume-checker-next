'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Users,
  Calendar
} from 'lucide-react';

interface ContextData {
  id: string;
  type: 'resume' | 'job' | 'industry';
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  tags: string[];
  lastUpdated: string;
  nextAction?: string;
}

interface DashboardStats {
  totalContexts: number;
  activeContexts: number;
  completedContexts: number;
  averageScore: number;
  topIndustries: Array<{ name: string; count: number }>;
  recentActivity: Array<{ action: string; timestamp: string; type: string }>;
}

const ContextDashboard: React.FC = () => {
  const [contexts, setContexts] = useState<ContextData[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalContexts: 0,
    activeContexts: 0,
    completedContexts: 0,
    averageScore: 0,
    topIndustries: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedContext, setSelectedContext] = useState<string | null>(null);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockContexts: ContextData[] = [
      {
        id: '1',
        type: 'resume',
        title: 'Software Engineer Resume',
        description: 'Resume analysis for senior software engineer position',
        status: 'active',
        priority: 'high',
        progress: 75,
        tags: ['React', 'Node.js', 'TypeScript'],
        lastUpdated: '2024-01-15T10:30:00Z',
        nextAction: 'Review skill recommendations'
      },
      {
        id: '2',
        type: 'job',
        title: 'Data Scientist Role',
        description: 'Job analysis for machine learning specialist position',
        status: 'pending',
        priority: 'medium',
        progress: 45,
        tags: ['Python', 'ML', 'Data Analysis'],
        lastUpdated: '2024-01-14T15:45:00Z',
        nextAction: 'Update skills section'
      },
      {
        id: '3',
        type: 'industry',
        title: 'Tech Industry Trends',
        description: 'Analysis of current technology industry requirements',
        status: 'completed',
        priority: 'low',
        progress: 100,
        tags: ['Trends', 'Market Analysis'],
        lastUpdated: '2024-01-13T09:15:00Z'
      }
    ];

    const mockStats: DashboardStats = {
      totalContexts: 3,
      activeContexts: 1,
      completedContexts: 1,
      averageScore: 82,
      topIndustries: [
        { name: 'Technology', count: 2 },
        { name: 'Data Science', count: 1 }
      ],
      recentActivity: [
        { action: 'Resume analysis completed', timestamp: '2 hours ago', type: 'resume' },
        { action: 'Job requirements updated', timestamp: '1 day ago', type: 'job' },
        { action: 'Industry trends analyzed', timestamp: '2 days ago', type: 'industry' }
      ]
    };

    setContexts(mockContexts);
    setStats(mockStats);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'resume': return <CheckCircle className="w-4 h-4" />;
      case 'job': return <Target className="w-4 h-4" />;
      case 'industry': return <TrendingUp className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Context Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your resume analysis contexts and track progress
          </p>
        </div>
        <Button>
          <Lightbulb className="w-4 h-4 mr-2" />
          New Context
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contexts</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContexts}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contexts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeContexts}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedContexts}</div>
            <p className="text-xs text-muted-foreground">
              Successfully finished
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Overall performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contexts List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Contexts</CardTitle>
          <CardDescription>
            Manage your current resume analysis contexts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contexts.map((context) => (
              <div
                key={context.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedContext === context.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedContext(context.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">{getTypeIcon(context.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{context.title}</h3>
                        <Badge className={getStatusColor(context.status)}>
                          {context.status}
                        </Badge>
                        <Badge className={getPriorityColor(context.priority)}>
                          {context.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {context.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(context.lastUpdated).toLocaleDateString()}
                        </span>
                        {context.nextAction && (
                          <span className="flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {context.nextAction}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium mb-1">{context.progress}%</div>
                    <Progress value={context.progress} className="w-20" />
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {context.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates and actions across your contexts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <span className="text-sm font-medium">{activity.action}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {activity.timestamp}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContextDashboard;
