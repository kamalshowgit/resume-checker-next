type ChatTurn = { role: 'user'|'assistant'; content: string };

// Configuration helper to validate and log AI setup
export function logAIConfiguration() {
  console.log('\n=== AI CONFIGURATION STATUS ===');
  console.log('🚀 DEFAULT PROVIDER: GROQ (for all AI functions)');
  
  const providers = ['groq', 'openai', 'anthropic', 'openrouter', 'together', 'huggingface'];
  
  providers.forEach(provider => {
    const config = getOpenAICompatibleConfig(provider);
    const hasKey = !!config.key;
    const isDefault = provider === 'groq';
    const status = isDefault ? '✅ DEFAULT' : (hasKey ? '✅ API Key Set' : '❌ No API Key');
    console.log(`${provider.toUpperCase()}: ${status} (Default Model: ${config.defaultModel})`);
  });
  
  console.log('\n=== FEATURE CONFIGURATIONS (All default to Groq) ===');
  console.log(`Resume Analysis: ${process.env.AI_PROVIDER_RESUME || process.env.AI_PROVIDER || 'groq'} / ${process.env.AI_MODEL_RESUME || process.env.AI_MODEL || 'llama3-8b-8192'}`);
  console.log(`Chat Assistant: ${process.env.AI_PROVIDER_CHAT || process.env.AI_PROVIDER || 'groq'} / ${process.env.AI_MODEL_CHAT || process.env.AI_MODEL || 'llama3-8b-8192'}`);
  console.log(`Job Search: ${process.env.AI_PROVIDER_JOBSEARCH || process.env.AI_PROVIDER || 'groq'} / ${process.env.AI_MODEL_JOBSEARCH || process.env.AI_MODEL || 'llama3-8b-8192'}`);
  console.log('================================\n');
}

function getOpenAICompatibleConfig(provider: string | undefined) {
  const p = (provider || '').toLowerCase();
  
  switch (p) {
    case 'openai':
      return { 
        base: 'https://api.openai.com/v1', 
        key: process.env.OPENAI_API_KEY,
        defaultModel: 'gpt-3.5-turbo'
      };
    
    case 'openrouter':
      return { 
        base: 'https://openrouter.ai/api/v1', 
        key: process.env.OPENROUTER_API_KEY,
        defaultModel: 'meta-llama/llama-3-8b-instruct:free'
      };
    
    case 'anthropic':
      return { 
        base: 'https://api.anthropic.com/v1', 
        key: process.env.ANTHROPIC_API_KEY,
        defaultModel: 'claude-3-haiku-20240307'
      };
    
    case 'together':
      return { 
        base: 'https://api.together.xyz/v1', 
        key: process.env.TOGETHER_API_KEY,
        defaultModel: 'meta-llama/Llama-2-7b-chat-hf'
      };
    
    case 'huggingface':
      return { 
        base: 'https://api-inference.huggingface.co/v1', 
        key: process.env.HUGGINGFACE_API_KEY,
        defaultModel: 'microsoft/DialoGPT-medium'
      };
    
    // default groq
    default:
      return { 
        base: 'https://api.groq.com/openai/v1', 
        key: process.env.GROQ_API_KEY,
        defaultModel: 'llama3-8b-8192'
      };
  }
}

export async function extractKeyPoints(text: string): Promise<string[]> {
  // Default to Groq for all AI functions
  const provider = process.env.AI_PROVIDER_RESUME || process.env.AI_PROVIDER || 'groq';
  const config = getOpenAICompatibleConfig(provider);
  const model = process.env.AI_MODEL_RESUME || process.env.AI_MODEL || config.defaultModel;
  const { base, key } = config;

  console.log(`[KeyPoints] Using provider: ${provider}, model: ${model}, base: ${base}`);
  console.log(`[KeyPoints] API key present: ${!!key}`);

  // If no API key configured, throw error - no fallback allowed
  if (!key || key === 'your_groq_api_key_here') {
    throw new Error('No valid API key configured for AI service. Please set GROQ_API_KEY in your environment variables.');
  }

  // If configured and key present, use LLM to extract bullets
  if (key && model) {
    try {
      const requestBody = {
        model,
        messages: [
          { 
            role: 'system', 
            content: `You are a resume analysis expert. Extract ONLY the most important and impactful information from resumes.

IMPORTANT: Focus on QUALITY over quantity. Extract only 5-6 key points that are:
1. Most relevant to job applications
2. Showcase quantifiable achievements and impact
3. Highlight leadership and key skills
4. Demonstrate career progression

DO NOT include:
- Basic contact information (name, email, phone)
- Generic job descriptions
- Unquantified responsibilities
- Minor details or filler content

Format: Return each point as a concise, impactful statement starting with action verbs.` 
          },
          { 
            role: 'user', 
            content: `Extract the top 5-6 most important and impactful resume points. Focus on achievements, leadership, and quantifiable impact. Return as a simple list, no numbering.

Resume:
${text.substring(0, 10000)}` 
          }
        ],
        temperature: 0.1,
        max_tokens: 400
      };

      console.log(`[KeyPoints] Making request to ${base}/chat/completions`);
      console.log(`[KeyPoints] Request body:`, JSON.stringify(requestBody, null, 2));

      const resp = await fetch(`${base}/chat/completions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error(`[KeyPoints] API Error ${resp.status}: ${errorText}`);
        throw new Error(`API Error: ${resp.status}`);
      }

      const data: any = await resp.json();
      console.log(`[KeyPoints] API Response:`, JSON.stringify(data, null, 2));
      
      const content: string = data?.choices?.[0]?.message?.content || '';
      console.log(`[KeyPoints] Extracted content: "${content}"`);
      
      const lines = content.split(/\n|\r/).map(l => l.replace(/^[-•\d.\s]+/, '').trim()).filter(Boolean);
      console.log(`[KeyPoints] Processed lines:`, lines);
      
      const result = Array.from(new Set(lines)).slice(0, 6);
      console.log(`[KeyPoints] Final result:`, result);
      return result;
    } catch (error) {
      console.error(`[KeyPoints] Error:`, error);
      console.log(`[KeyPoints] Falling back to heuristic method`);
      // fall through to heuristic
    }
  } else {
    console.log(`[KeyPoints] No API key or model, using heuristic method`);
  }

  // Heuristic fallback - improved to be more focused
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean);
  
  // Look for high-impact keywords and achievements
  const highImpactKeywords = [
    'achieved', 'increased', 'reduced', 'improved', 'designed', 'built', 'led',
    'managed', 'launched', 'optimized', 'award', 'saved', 'revenue', 'growth',
    'delivered', 'implemented', 'developed', 'created', 'established', 'expanded',
    'mentored', 'trained', 'supervised', 'coordinated', 'streamlined', 'enhanced'
  ];
  
  // Look for quantified achievements (numbers, percentages)
  const quantifiedPattern = /\d+%|\d+\+|\$\d+|\d+\s+(users|customers|projects|team|people)/i;
  
  // Filter for high-impact sentences
  const highImpactSentences = sentences.filter(s => {
    const hasHighImpactKeyword = highImpactKeywords.some(k => s.toLowerCase().includes(k));
    const hasQuantifiedAchievement = quantifiedPattern.test(s);
    const hasLeadership = /led|managed|supervised|mentored|coordinated/i.test(s);
    const hasAchievement = /achieved|delivered|implemented|created|established/i.test(s);
    
    return hasHighImpactKeyword || hasQuantifiedAchievement || hasLeadership || hasAchievement;
  });
  
  // If we have enough high-impact sentences, use them; otherwise, fall back to general sentences
  const finalSentences = highImpactSentences.length >= 3 ? highImpactSentences : sentences;
  const unique = Array.from(new Set(finalSentences.slice(0, 6)));
  
  console.log(`[KeyPoints] Heuristic extraction: ${unique.length} points found`);
  return unique;
}

export async function searchJobs(text: string): Promise<{ title: string; url: string }[]> {
  const titleMatch = /(?:(?:Senior|Lead|Junior)\s+)?([A-Za-z ]{3,30})\s+(?:Engineer|Developer|Manager|Designer|Analyst)/i.exec(text)
    || /(?:Role|Position)\s*:\s*([^\n]+)/i.exec(text);
  const role = (titleMatch?.[0] || 'Software Engineer').replace(/\s+/g, ' ');
  const cityMatch = /(Bangalore|Bengaluru|Hyderabad|Pune|Mumbai|Delhi|Chennai|Remote)/i.exec(text);
  const loc = (cityMatch?.[0] || 'Remote').replace(/\s+/g, ' ');

  const provider = (process.env.WEBSEARCH_PROVIDER || '').toLowerCase();
  const model = process.env.WEBSEARCH_MODEL; // reserved for future providers
  
  // AI-enhanced job search (future feature)
  const aiProvider = process.env.AI_PROVIDER_JOBSEARCH || process.env.AI_PROVIDER;
  const aiModel = process.env.AI_MODEL_JOBSEARCH || process.env.AI_MODEL;

  if (provider === 'tavily' && process.env.TAVILY_API_KEY) {
    try {
      const query = `best ${role} jobs in ${loc} site:linkedin.com/jobs OR site:naukri.com OR site:indeed.com`;
      const resp = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query,
          search_depth: 'basic',
          include_answer: false,
          include_images: false,
          max_results: 6,
        })
      });
      const data: any = await resp.json();
      const results: any[] = data?.results || [];
      const unique: { title: string; url: string }[] = [];
      const seen = new Set<string>();
      for (const r of results) {
        const url: string | undefined = r?.url;
        const title: string | undefined = r?.title;
        if (!url || !title) continue;
        const host = (() => { try { return new URL(url).host } catch { return url } })();
        if (seen.has(host)) continue;
        seen.add(host);
        unique.push({ title, url });
        if (unique.length >= 6) break;
      }
      if (unique.length) return unique;
    } catch {
      // fall back
    }
  }

  const q = (role + ' ' + loc).replace(/\s+/g, '+');
  return [
    { title: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/search/?keywords=' + q },
    { title: 'Indeed India', url: 'https://in.indeed.com/jobs?q=' + q },
    { title: 'Naukri.com', url: 'https://www.naukri.com/' + q + '-jobs' },
    { title: 'Google Jobs', url: 'https://www.google.com/search?q=' + q + '+jobs' },
  ];
}

export async function chatSuggest(
  history: ChatTurn[],
  message: string
): Promise<string> {
  // Default to Groq for all AI functions
  const provider = process.env.AI_PROVIDER_CHAT || process.env.AI_PROVIDER || 'groq';
  const config = getOpenAICompatibleConfig(provider);
  const model = process.env.AI_MODEL_CHAT || process.env.AI_MODEL || config.defaultModel;
  const { base, key } = config;

  console.log(`[Chat] Using provider: ${provider}, model: ${model}, base: ${base}`);

  if (!key) {
    throw new Error('No valid API key configured for AI service. Please set GROQ_API_KEY in your environment variables.');
  }

  try {
    const requestBody = {
      model,
      messages: [
        { 
          role: 'system', 
          content: `You are "Coach" - a professional career coach and resume expert. Respond like a helpful teacher:

• Keep responses short and actionable (max 3-4 points)
• Use bullet points for clarity
• Be encouraging but direct
• Focus on specific, practical advice
• Speak professionally but warmly
• Avoid long paragraphs - use concise points instead
• If asked about resume content, provide specific suggestions
• If asked about scoring, explain what the scores mean and how to improve them

Examples of good responses:
• Use action verbs like "Led," "Built," "Improved"
• Add specific metrics (increased sales by 25%)
• Tailor keywords to job descriptions
• Keep resume to 1-2 pages maximum` 
        },
        ...history.map(h => ({ role: h.role, content: h.content })),
        { role: 'user', content: message }
      ],
      temperature: 0.2, // Lower temperature for more consistent responses
      max_tokens: 300
    };

    console.log(`[Chat] Making request to ${base}/chat/completions with model ${model}`);

    const resp = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        throw new Error('AI service rate limit reached. Please try again later.');
      }
      const errorText = await resp.text();
      console.error(`[Chat] API Error ${resp.status}: ${errorText}`);
      throw new Error(`AI service error: ${resp.status} - ${errorText}`);
    }

    const data: any = await resp.json();
    console.log('[Chat] Received response from AI');
    
    const content = data?.choices?.[0]?.message?.content;
    if (content) {
      return content.trim();
    } else {
      throw new Error('AI service returned empty response. Please try again.');
    }
  } catch (error) {
    console.error('[Chat] Error:', error);
    throw error; // Re-throw the error instead of falling back
  }
}

// Enhanced fallback chat responses based on message content
function getFallbackChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Resume scoring questions
  if (lowerMessage.includes('score') || lowerMessage.includes('ats')) {
    return `• Your ATS score reflects how well your resume matches job requirements
• Focus on adding relevant keywords from job descriptions
• Include specific metrics and achievements
• Ensure clean, professional formatting`;
  }
  
  // Content improvement questions
  if (lowerMessage.includes('improve') || lowerMessage.includes('better') || lowerMessage.includes('fix')) {
    return `• Use strong action verbs: "Led," "Built," "Improved"
• Add specific metrics: "increased sales by 35%"
• Tailor keywords to each job application
• Keep it concise: 1-2 pages maximum`;
  }
  
  // Keywords questions
  if (lowerMessage.includes('keyword') || lowerMessage.includes('optimize')) {
    return `• Research job descriptions for relevant keywords
• Include technical skills and industry terms
• Use variations of important terms
• Focus on skills mentioned in your target roles`;
  }
  
  // Formatting questions
  if (lowerMessage.includes('format') || lowerMessage.includes('layout') || lowerMessage.includes('design')) {
    return `• Use consistent bullet points and spacing
• Organize into clear sections
• Choose a professional, readable font
• Ensure proper margins and alignment`;
  }
  
  // General resume advice
  return `• Use strong action verbs in your bullet points
• Quantify achievements with specific metrics
• Tailor content to each job application
• Keep formatting clean and professional`;
}

// Enhanced ATS Scoring with AI
export async function calculateATSScore(text: string): Promise<{
  score: number;
  breakdown: {
    keywords: number;
    formatting: number;
    experience: number;
    skills: number;
    achievements: number;
    contactInfo: number;
    certifications: number;
    languages: number;
    projects: number;
    volunteerWork: number;
  };
  suggestions: Array<{
    category: string;
    issue: string;
    suggestion: string;
    impact: number;
  }>;
}> {
  // Default to Groq for all AI functions
  const provider = process.env.AI_PROVIDER_RESUME || process.env.AI_PROVIDER || 'groq';
  const config = getOpenAICompatibleConfig(provider);
  const model = process.env.AI_MODEL_RESUME || process.env.AI_MODEL || config.defaultModel;
  const { base, key } = config;

  console.log(`[ATS Score] Using provider: ${provider}, model: ${model}`);

  if (!key) {
    throw new Error('No valid API key configured for AI service. Please set GROQ_API_KEY in your environment variables.');
  }

  try {
    // Detect which sections actually exist in the resume
    const sections = detectResumeSections(text);
    
    const prompt = `Analyze this resume for ATS (Applicant Tracking System) optimization and provide a detailed score breakdown.

Resume Text:
${text}

IMPORTANT: Only score sections that actually exist in the resume. Based on my analysis, these sections exist:
- Summary/Objective: ${sections.hasSummary ? 'YES' : 'NO'}
- Work Experience: ${sections.hasExperience ? 'YES' : 'NO'}
- Education: ${sections.hasEducation ? 'YES' : 'NO'}
- Skills: ${sections.hasSkills ? 'YES' : 'NO'}
- Achievements: ${sections.hasAchievements ? 'YES' : 'NO'}
- Contact Information: ${sections.hasContactInfo ? 'YES' : 'NO'}
- Certifications: ${sections.hasCertifications ? 'YES' : 'NO'}
- Languages: ${sections.hasLanguages ? 'YES' : 'NO'}
- Projects: ${sections.hasProjects ? 'YES' : 'NO'}
- Volunteer Work: ${sections.hasVolunteerWork ? 'YES' : 'NO'}

Provide a JSON response with:
1. Overall ATS score (0-100)
2. Breakdown scores for ALL sections (keywords, formatting, experience, skills, achievements, contactInfo, certifications, languages, projects, volunteerWork) - use 0 for non-existent sections
3. Up to 5 specific suggestions with category, issue, suggestion, and impact score (1-10)

Response format:
{
  "score": 85,
  "breakdown": {
    "keywords": 90,
    "formatting": 85,
    "experience": 80,
    "skills": 90,
    "achievements": 75,
    "contactInfo": 70,
    "certifications": 0,
    "languages": 0,
    "projects": 60,
    "volunteerWork": 0
  },
  "suggestions": [
    {
      "category": "keywords",
      "issue": "Missing industry-specific keywords",
      "suggestion": "Add keywords like 'Agile', 'CI/CD', 'Cloud Computing'",
      "impact": 8
    }
  ]
}

IMPORTANT: 
- Ensure the response is valid JSON without any control characters or formatting issues
- Only score sections that actually exist in the resume (use 0 for missing sections)
- Base your scoring on the actual content present, not assumptions`;

    const requestBody = {
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1, // Lower temperature for more consistent results
      max_tokens: 1000
    };

    const resp = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        throw new Error('AI service rate limit reached. Please try again later.');
      }
      console.error(`[ATS Score] API Error: ${resp.status}`);
      throw new Error(`AI service error: ${resp.status}`);
    }

    const data: any = await resp.json();
    const content = data?.choices?.[0]?.message?.content;
    
    if (content) {
      try {
        // Clean the content to remove control characters and formatting issues
        const cleanedContent = content
          .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
          .replace(/\n/g, ' ') // Replace newlines with spaces
          .replace(/\r/g, ' ') // Replace carriage returns with spaces
          .replace(/\t/g, ' ') // Replace tabs with spaces
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        // Extract JSON from response
        const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          
          // Validate the result structure
          if (result.score && result.breakdown && result.suggestions) {
            console.log('[ATS Score] AI analysis completed successfully');
            return result;
          } else {
            throw new Error('AI service returned invalid result structure. Please try again.');
          }
        }
      } catch (parseError) {
        console.error('[ATS Score] Failed to parse AI response:', parseError);
        throw new Error('AI service returned unparseable response. Please try again.');
      }
    }
    
    throw new Error('AI service returned no content. Please try again.');
  } catch (error) {
    console.error('[ATS Score] Error:', error);
    throw error; // Re-throw the error instead of falling back
  }
}

// Enhanced content improvement with AI
export async function improveContent(text: string, category: string, userInput?: string): Promise<{
  improvedText: string;
  explanation: string;
  newScore: number;
}> {
  // Default to Groq for all AI functions
  const provider = process.env.AI_PROVIDER_RESUME || process.env.AI_PROVIDER || 'groq';
  const config = getOpenAICompatibleConfig(provider);
  const model = process.env.AI_MODEL_RESUME || process.env.AI_MODEL || config.defaultModel;
  const { base, key } = config;

  if (!key) {
    return {
      improvedText: text,
      explanation: 'AI improvement unavailable - no API key configured',
      newScore: 0
    };
  }

  try {
    const prompt = `Improve this resume content for the category: ${category}

Original text:
${text}

${userInput ? `User requirements: ${userInput}\n` : ''}

Provide:
1. Improved version with better ATS optimization
2. Clear explanation of changes made
3. Estimated score improvement (0-20 points)

Response format:
{
  "improvedText": "enhanced version here",
  "explanation": "explanation of changes",
  "newScore": 15
}

IMPORTANT: Ensure the response is valid JSON without any control characters or formatting issues.`;

    const requestBody = {
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2, // Lower temperature for more consistent results
      max_tokens: 800
    };

    const resp = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        throw new Error('AI service rate limit reached. Please try again later.');
      }
      throw new Error(`AI service error: ${resp.status}`);
    }

    const data: any = await resp.json();
    const content = data?.choices?.[0]?.message?.content;
    
    if (content) {
      try {
        // Clean the content to remove control characters and formatting issues
        const cleanedContent = content
          .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
          .replace(/\n/g, ' ') // Replace newlines with spaces
          .replace(/\r/g, ' ') // Replace carriage returns with spaces
          .replace(/\t/g, ' ') // Replace tabs with spaces
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          
          // Validate the result structure
          if (result.improvedText && result.explanation !== undefined && result.newScore !== undefined) {
            return result;
          }
        }
      } catch (parseError) {
        console.error('[Improve Content] Failed to parse AI response:', parseError);
      }
    }
    
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('[Improve Content] Error:', error);
    throw error; // Re-throw the error instead of falling back
  }
}

function extractFallbackKeyPoints(text: string): string[] {
  console.log('[FallbackKeyPoints] Using fallback key points extraction');
  
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const keyPoints: string[] = [];
  
  // High-impact keywords to look for
  const highImpactKeywords = [
    'led', 'managed', 'developed', 'implemented', 'optimized', 'improved',
    'achieved', 'delivered', 'created', 'established', 'expanded', 'mentored',
    'supervised', 'coordinated', 'streamlined', 'enhanced', 'launched', 'built',
    'designed', 'architected', 'deployed', 'scaled', 'transformed', 'drove'
  ];
  
  // Look for quantified achievements (numbers, percentages, metrics)
  const quantifiedPattern = /\d+%|\d+\+|\$\d+|\d+\s+(users|customers|projects|team|people|years|months|days)/i;
  
  // Extract lines that look like achievements or skills
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip very short lines or basic info
    if (trimmedLine.length < 15) continue;
    
    // Skip contact information and basic details
    if (trimmedLine.toLowerCase().includes('email') || 
        trimmedLine.toLowerCase().includes('phone') ||
        trimmedLine.toLowerCase().includes('address') ||
        trimmedLine.toLowerCase().includes('linkedin') ||
        trimmedLine.toLowerCase().includes('github')) {
      continue;
    }
    
    // Look for bullet points with metrics or achievements
    if (trimmedLine.match(/^[•\-\*]\s*.*\d+.*/) || 
        trimmedLine.match(/^[•\-\*]\s*.*(led|managed|developed|implemented|optimized|improved).*/i)) {
      const cleanLine = trimmedLine.replace(/^[•\-\*]\s*/, '');
      if (cleanLine.length > 20 && !keyPoints.includes(cleanLine)) {
        keyPoints.push(cleanLine);
      }
    }
    
    // Look for high-impact sentences (even without bullets)
    const hasHighImpactKeyword = highImpactKeywords.some(k => trimmedLine.toLowerCase().includes(k));
    const hasQuantifiedAchievement = quantifiedPattern.test(trimmedLine);
    const hasLeadership = /led|managed|supervised|mentored|coordinated|directed/i.test(trimmedLine);
    const hasAchievement = /achieved|delivered|implemented|created|established|built/i.test(trimmedLine);
    
    if ((hasHighImpactKeyword || hasQuantifiedAchievement || hasLeadership || hasAchievement) && 
        trimmedLine.length > 25 && 
        !keyPoints.includes(trimmedLine)) {
      keyPoints.push(trimmedLine);
    }
    
    // Look for skill sections (but limit to most relevant)
    if (trimmedLine.toLowerCase().includes('skill') && trimmedLine.includes(':')) {
      const skills = trimmedLine.split(':')[1]?.split(',').map(s => s.trim()).filter(Boolean) || [];
      // Only add technical skills, not soft skills
      const technicalSkills = skills.filter(skill => 
        /python|react|javascript|typescript|aws|docker|kubernetes|api|database|agile|node|java|sql|cloud|devops|machine learning|ai|data science/i.test(skill)
      );
      if (technicalSkills.length > 0) {
        const skillPoint = `Technical Skills: ${technicalSkills.slice(0, 4).join(', ')}`;
        if (!keyPoints.includes(skillPoint)) {
          keyPoints.push(skillPoint);
        }
      }
    }
    
    // Look for experience lines with years or significant achievements
    if (trimmedLine.match(/^\d{4}.*\d{4}/) || 
        (trimmedLine.includes('years') && trimmedLine.includes('experience')) ||
        (trimmedLine.includes('team') && trimmedLine.includes('people'))) {
      if (!keyPoints.some(kp => kp.includes('years') || kp.includes('experience') || kp.includes('team'))) {
        keyPoints.push(trimmedLine);
      }
    }
    
    // Look for project or achievement lines
    if (trimmedLine.toLowerCase().includes('project') || 
        trimmedLine.toLowerCase().includes('achievement') ||
        trimmedLine.toLowerCase().includes('result') ||
        trimmedLine.toLowerCase().includes('impact')) {
      if (trimmedLine.length > 20 && !keyPoints.includes(trimmedLine)) {
        keyPoints.push(trimmedLine);
      }
    }
    
    if (keyPoints.length >= 8) break; // Limit to 8 most important points
  }
  
  // If we don't have enough key points, add some meaningful ones
  if (keyPoints.length < 4) {
    // Try to extract any remaining meaningful content
    const remainingLines = lines.filter(line => 
      line.trim().length > 20 && 
      !keyPoints.some(kp => line.includes(kp)) &&
      !line.toLowerCase().includes('email') &&
      !line.toLowerCase().includes('phone') &&
      !line.toLowerCase().includes('address') &&
      !line.toLowerCase().includes('linkedin') &&
      !line.toLowerCase().includes('github')
    );
    
    if (remainingLines.length > 0) {
      const additionalPoints = remainingLines.slice(0, 4 - keyPoints.length);
      keyPoints.push(...additionalPoints);
    }
  }
  
  // Ensure we have at least 4 points
  if (keyPoints.length < 4) {
    const fallbackPoints = [
      'Resume content successfully extracted and analyzed',
      'Key professional information identified for optimization',
      'Content processed and ready for improvement',
      'Professional experience and skills documented'
    ];
    
    for (const point of fallbackPoints) {
      if (!keyPoints.includes(point)) {
        keyPoints.push(point);
      }
      if (keyPoints.length >= 4) break;
    }
  }
  
  // Clean and format the key points
  const cleanedKeyPoints = keyPoints.map(point => {
    // Remove extra whitespace and normalize
    let cleaned = point.replace(/\s+/g, ' ').trim();
    
    // Ensure proper sentence structure
    if (!cleaned.endsWith('.') && !cleaned.endsWith('!') && !cleaned.endsWith('?')) {
      cleaned += '.';
    }
    
    return cleaned;
  });
  
  console.log(`[FallbackKeyPoints] Extracted ${cleanedKeyPoints.length} focused points`);
  return cleanedKeyPoints.slice(0, 8); // Return max 8 points
}

function calculateFallbackATSScore(text: string) {
  console.log('[FallbackATS] Using fallback scoring for resume analysis');
  
  // Detect which sections actually exist in the resume
  const sections = detectResumeSections(text);
  
  let score = 50; // Start with neutral score
  const breakdown = { 
    keywords: 50, 
    formatting: 60, 
    experience: sections.hasExperience ? 50 : 0, 
    skills: sections.hasSkills ? 50 : 0, 
    achievements: sections.hasAchievements ? 40 : 0,
    contactInfo: sections.hasContactInfo ? 70 : 0,
    certifications: sections.hasCertifications ? 60 : 0,
    languages: sections.hasLanguages ? 50 : 0,
    projects: sections.hasProjects ? 60 : 0,
    volunteerWork: sections.hasVolunteerWork ? 50 : 0
  };
  const suggestions = [];

  const lowerText = text.toLowerCase();
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const wordCount = text.split(/\s+/).length;

  // Check for keywords (industry-specific terms)
  const technicalKeywords = [
    'python', 'react', 'javascript', 'typescript', 'node.js', 'java', 'c++', 'c#',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github',
    'sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch',
    'api', 'rest', 'graphql', 'microservices', 'agile', 'scrum', 'devops',
    'machine learning', 'ai', 'data science', 'analytics', 'etl', 'pipeline',
    'leadership', 'management', 'project management', 'team lead', 'mentoring'
  ];
  
  const keywordMatches = technicalKeywords.filter(keyword => lowerText.includes(keyword)).length;
  breakdown.keywords = Math.min(50 + keywordMatches * 3, 100);
  
  if (keywordMatches < 5) {
    suggestions.push({
      category: 'keywords',
      issue: 'Limited industry-specific keywords',
      suggestion: 'Add more relevant technical keywords from your target job descriptions',
      impact: 8
    });
  }

  // Check for quantified achievements and metrics (only if section exists)
  if (sections.hasAchievements) {
    const metricsPattern = /\d+%|\d+\+|\$\d+|\d+\s+(users|customers|projects|team|people|years|months|days)/i;
    const hasMetrics = metricsPattern.test(text);
    const metricCount = (text.match(/\d+%|\d+\+|\$\d+|\d+\s+(users|customers|projects|team|people|years|months|days)/gi) || []).length;
    
    if (hasMetrics && metricCount > 2) {
      breakdown.achievements = Math.min(40 + metricCount * 8, 100);
    } else {
      breakdown.achievements = 30;
      suggestions.push({
        category: 'achievements',
        issue: 'Limited quantified achievements',
        suggestion: 'Add specific metrics, percentages, and numbers to quantify your impact and results',
        impact: 9
      });
    }
  }

  // Check for strong action verbs and leadership language (only if section exists)
  if (sections.hasExperience) {
    const actionVerbs = [
      'led', 'managed', 'developed', 'implemented', 'created', 'designed', 'optimized',
      'improved', 'established', 'expanded', 'mentored', 'supervised', 'coordinated',
      'streamlined', 'enhanced', 'launched', 'built', 'delivered', 'achieved', 'drove'
    ];
    
    const verbMatches = actionVerbs.filter(verb => lowerText.includes(verb)).length;
    breakdown.experience = Math.min(50 + verbMatches * 4, 100);
    
    if (verbMatches < 4) {
      suggestions.push({
        category: 'experience',
        issue: 'Weak action verbs',
        suggestion: 'Start bullet points with strong action verbs like "Led", "Implemented", "Optimized"',
        impact: 7
      });
    }
  }

  // Check formatting and structure
  const bullets = (text.match(/[•\-\*]/g) || []).length;
  const hasSections = /(experience|education|skills|summary|achievements|projects)/i.test(text);
  const hasContactInfo = /(email|phone|linkedin|github|portfolio)/i.test(text);
  
  if (bullets > 8 && hasSections && hasContactInfo) {
    breakdown.formatting = 85;
  } else if (bullets > 5 && hasSections) {
    breakdown.formatting = 70;
  } else {
    breakdown.formatting = 50;
    suggestions.push({
      category: 'formatting',
      issue: 'Improve resume structure',
      suggestion: 'Organize content into clear sections with bullet points for better readability',
      impact: 6
    });
  }

  // Check for skills section and technical depth (only if section exists)
  if (sections.hasSkills) {
    const hasSkillsSection = /skills?[:\s]/i.test(text);
    const technicalTerms = ['algorithm', 'database', 'framework', 'library', 'tool', 'platform', 'system'];
    const technicalDepth = technicalTerms.filter(term => lowerText.includes(term)).length;
    
    if (hasSkillsSection && technicalDepth > 2) {
      breakdown.skills = Math.min(50 + technicalDepth * 8, 100);
    } else if (hasSkillsSection) {
      breakdown.skills = 60;
    } else {
      breakdown.skills = 40;
      suggestions.push({
        category: 'skills',
        issue: 'Skills section needs improvement',
        suggestion: 'Create a dedicated skills section with technical and soft skills clearly listed',
        impact: 7
      });
    }
  }

  // Calculate overall score with weighted components
  const weights = { 
    keywords: 0.20, 
    formatting: 0.15, 
    experience: 0.20, 
    skills: 0.15, 
    achievements: 0.10,
    contactInfo: 0.05,
    certifications: 0.05,
    languages: 0.03,
    projects: 0.05,
    volunteerWork: 0.02
  };
  
  score = Math.round(
    breakdown.keywords * weights.keywords +
    breakdown.formatting * weights.formatting +
    breakdown.experience * weights.experience +
    breakdown.skills * weights.skills +
    breakdown.achievements * weights.achievements +
    breakdown.contactInfo * weights.contactInfo +
    breakdown.certifications * weights.certifications +
    breakdown.languages * weights.languages +
    breakdown.projects * weights.projects +
    breakdown.volunteerWork * weights.volunteerWork
  );

  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score));

  // Add general suggestions if score is low
  if (score < 60) {
    suggestions.push({
      category: 'general',
      issue: 'Overall resume needs improvement',
      suggestion: 'Focus on adding quantified achievements, relevant keywords, and clear formatting',
      impact: 10
    });
  }

  console.log(`[FallbackATS] Calculated score: ${score}, Breakdown:`, breakdown);
  return { score, breakdown, suggestions };
}

// Function to detect which sections actually exist in the resume
function detectResumeSections(text: string): {
  hasSummary: boolean;
  hasExperience: boolean;
  hasEducation: boolean;
  hasSkills: boolean;
  hasAchievements: boolean;
  hasContactInfo: boolean;
  hasCertifications: boolean;
  hasLanguages: boolean;
  hasProjects: boolean;
  hasVolunteerWork: boolean;
} {
  const lowerText = text.toLowerCase();
  
  return {
    hasSummary: /(summary|objective|profile|overview)/i.test(text),
    hasExperience: /(experience|employment|work history|career|job)/i.test(text),
    hasEducation: /(education|degree|university|college|school|bachelor|master|phd)/i.test(text),
    hasSkills: /(skills?|competencies|expertise|technologies)/i.test(text),
    hasAchievements: /(achievements|accomplishments|awards|recognition|results)/i.test(text),
    hasContactInfo: /(email|phone|address|linkedin|github|portfolio|website)/i.test(text),
    hasCertifications: /(certification|certified|license|accreditation|course)/i.test(text),
    hasLanguages: /(languages?|fluent|proficient|bilingual|english|spanish|french|german|chinese|japanese)/i.test(text),
    hasProjects: /(projects?|portfolio|case studies|work samples|applications)/i.test(text),
    hasVolunteerWork: /(volunteer|community service|charity|non-profit|pro bono)/i.test(text)
  };
}

