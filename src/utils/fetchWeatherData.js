export const streamWeatherData = async (userMessage, onChunk) => {
  // Replace with your actual college roll number
  const YOUR_COLLEGE_ROLL_NUMBER = "22-COMPC52-26"; // Update this!
  
  const endpoint = "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream";
  
  const headers = {
    'Accept': '*/*',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'x-mastra-dev-playground': 'true'
  };

  const body = {
    messages: [
      {
        role: "user",
        content: userMessage
      }
    ],
    runId: "weatherAgent",
    maxRetries: 2,
    maxSteps: 5,
    temperature: 0.5,
    topP: 1,
    runtimeContext: {},
    threadId: YOUR_COLLEGE_ROLL_NUMBER, // Use your college roll number here
    resourceId: "weatherAgent"
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response is a stream
    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.trim() === '') continue;
            
            // Handle Mastra streaming format: prefix:data
            if (line.includes(':')) {
              const colonIndex = line.indexOf(':');
              const prefix = line.substring(0, colonIndex);
              const data = line.substring(colonIndex + 1);
              
              try {
                // Handle text chunks (prefix "0")
                if (prefix === '0') {
                  const textContent = JSON.parse(data);
                  onChunk(textContent);
                }
                // Handle completion markers
                else if (prefix === 'e' || prefix === 'd') {
                  const parsed = JSON.parse(data);
                  if (parsed.finishReason === 'stop') {
                    return; // Stop streaming
                  }
                }
                // Handle other data types (f, 9, a) - mostly metadata
                else {
                  // These are metadata chunks, we can ignore them or log for debugging
                  console.log(`Metadata chunk [${prefix}]:`, data);
                }
              } catch (e) {
                // If JSON parsing fails, try as plain text for "0" prefix
                if (prefix === '0') {
                  onChunk(data);
                }
              }
            }
            // Fallback for other formats
            else if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') return;
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.content || parsed.text) {
                  onChunk(parsed.content || parsed.text);
                }
              } catch (e) {
                if (data !== '[DONE]') {
                  onChunk(data);
                }
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } else {
      // Fallback for non-streaming response
      const data = await response.json();
      onChunk(data.content || data.message || JSON.stringify(data));
    }
  } catch (error) {
    console.error('Streaming error:', error);
    throw new Error(`Failed to get weather data: ${error.message}`);
  }
};

// Legacy function for backward compatibility
export const fetchWeatherData = async (city) => {
  return new Promise((resolve, reject) => {
    let fullResponse = '';
    
    streamWeatherData(`What's the weather in ${city}?`, (chunk) => {
      fullResponse += chunk;
    }).then(() => {
      resolve({ content: fullResponse });
    }).catch(reject);
  });
};