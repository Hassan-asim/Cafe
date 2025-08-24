import Papa from 'papaparse';

export const loadCsvFromPublic = async (filename) => {
  try {
    // Try multiple possible paths for Vercel deployment
    const possiblePaths = [
      `/${filename}`,
      `/public/${filename}`,
      `/${filename}?v=${Date.now()}`, // Add cache buster
    ];

    let response = null;
    let csvText = '';

    for (const path of possiblePaths) {
      try {
        response = await fetch(path);
        if (response.ok) {
          csvText = await response.text();
          break;
        }
      } catch (error) {
        console.log(`Failed to fetch from ${path}:`, error);
        continue;
      }
    }

    if (!csvText) {
      console.error('Failed to fetch CSV from all possible paths');
      // Return empty array instead of throwing error to prevent app crash
      return [];
    }

    const parsed = Papa.parse(csvText, { header: true });
    const filteredData = parsed.data.filter(row => 
      Object.values(row).some(value => value !== null && value !== '')
    );
    
    console.log(`Successfully loaded ${filteredData.length} items from CSV`);
    return filteredData;
  } catch (error) {
    console.error('Error loading CSV:', error);
    // Return empty array instead of throwing error to prevent app crash
    return [];
  }
};
