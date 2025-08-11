/**
 * Generate a unique device identifier based on browser characteristics
 * This creates a consistent ID for the same device/browser combination
 */
export function generateDeviceId(): string {
  try {
    // Get browser characteristics
    const userAgent = navigator.userAgent || 'unknown';
    const screenRes = `${screen.width}x${screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
    const language = navigator.language || 'unknown';
    const platform = navigator.platform || 'unknown';
    
    // Create a fingerprint from multiple characteristics
    const fingerprint = [
      userAgent.substring(0, 50),
      screenRes,
      timezone,
      language,
      platform
    ].join('_');
    
    // Clean the fingerprint to make it URL-safe
    const deviceId = fingerprint.replace(/[^a-zA-Z0-9_-]/g, '_');
    
    // Store in localStorage for consistency across sessions
    const storedId = localStorage.getItem('resumecheck_device_id');
    if (storedId) {
      return storedId;
    }
    
    // Generate new ID and store it
    const newId = `device_${deviceId}_${Date.now()}`;
    localStorage.setItem('resumecheck_device_id', newId);
    
    return newId;
  } catch (error) {
    console.warn('Failed to generate device ID, using fallback:', error);
    // Fallback to a simple ID if fingerprinting fails
    const fallbackId = localStorage.getItem('resumecheck_device_id') || `fallback_${Date.now()}`;
    localStorage.setItem('resumecheck_device_id', fallbackId);
    return fallbackId;
  }
}

/**
 * Get the stored device ID or generate a new one
 */
export function getDeviceId(): string {
  return generateDeviceId();
}
