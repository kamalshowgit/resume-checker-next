'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';

interface DatabaseStats {
  totalResumes: number;
  recentUploads: number;
}

interface RecentResume {
  id: number;
  name: string | null;
  email: string | null;
  role: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DebugData {
  success: boolean;
  status: string;
  database: string;
  stats: DatabaseStats;
  recentResumes: RecentResume[];
  timestamp: string;
  environment: string;
}

interface HealthData {
  ok: boolean;
  status: string;
  database: string;
  stats: DatabaseStats;
  timestamp: string;
  environment: string;
}

export function ProductionDebugger() {
  const [debugData, setDebugData] = useState<DebugData | null>(null);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const getApiUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin.replace('3000', '4000').replace('localhost', 'localhost');
    }
    return 'http://localhost:4000';
  };

  const checkSystemHealth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = getApiUrl();
      
      // Check health endpoint
      const healthResponse = await fetch(`${apiUrl}/health`);
      const healthResult = await healthResponse.json();
      setHealthData(healthResult);
      
      // Check debug data endpoint
      const debugResponse = await fetch(`${apiUrl}/debug-data`);
      const debugResult = await debugResponse.json();
      setDebugData(debugResult);
      
      setLastChecked(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check system health');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
      case 'operational':
        return 'bg-green-500';
      case 'unhealthy':
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getDatabaseStatusColor = (status: string) => {
    return status === 'connected' ? 'bg-green-500' : 'bg-red-500';
  };

  useEffect(() => {
    // Auto-check on component mount
    checkSystemHealth();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚀 Production System Monitor
            <Badge variant="outline" className="ml-2">
              {healthData?.environment || 'Unknown'}
            </Badge>
          </CardTitle>
          <CardDescription>
            Monitor your production database and system health in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button 
              onClick={checkSystemHealth}
              disabled={loading}
              className="flex-1"
            >
              {loading ? '🔄 Checking...' : '🔍 Check System Health'}
            </Button>
            {lastChecked && (
              <Badge variant="secondary" className="self-center">
                Last checked: {lastChecked.toLocaleTimeString()}
              </Badge>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-4">
              <p className="text-red-700 text-sm">❌ Error: {error}</p>
            </div>
          )}

          {/* Health Status */}
          {healthData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(healthData.status)}`}></div>
                    <span className="font-medium">{healthData.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getDatabaseStatusColor(healthData.database)}`}></div>
                    <span className="text-sm text-gray-600">Database: {healthData.database}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Database Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Resumes:</span>
                      <span className="font-medium">{healthData.stats.totalResumes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Recent Uploads:</span>
                      <span className="font-medium">{healthData.stats.recentUploads}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Debug Data */}
          {debugData && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 Database Overview</CardTitle>
                <CardDescription>
                  Real-time database statistics and recent activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {debugData.stats.totalResumes}
                      </div>
                      <div className="text-sm text-blue-600">Total Resumes</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {debugData.stats.recentUploads}
                      </div>
                      <div className="text-sm text-green-600">Recent Uploads</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {debugData.recentResumes.length}
                      </div>
                      <div className="text-sm text-purple-600">Shown Below</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {debugData.status === 'operational' ? '✅' : '❌'}
                      </div>
                      <div className="text-sm text-orange-600">Status</div>
                    </div>
                  </div>

                  {/* Recent Resumes */}
                  {debugData.recentResumes.length > 0 ? (
                    <div>
                      <h4 className="font-medium mb-2">📝 Recent Resume Activity</h4>
                      <div className="space-y-2">
                        {debugData.recentResumes.map((resume, index) => (
                          <div key={resume.id || index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-medium">
                                  {resume.name || 'Anonymous User'}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {resume.email || 'No email'} • {resume.role || 'No role specified'}
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 text-right">
                                <div>Created: {new Date(resume.createdAt).toLocaleDateString()}</div>
                                <div>Updated: {new Date(resume.updatedAt).toLocaleDateString()}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">📭 No resumes uploaded yet</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Upload a resume through your website to see data here
                      </p>
                    </div>
                  )}

                  {/* System Info */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Last Updated: {new Date(debugData.timestamp).toLocaleString()}</span>
                      <span>Environment: {debugData.environment}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
