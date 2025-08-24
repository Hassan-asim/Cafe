import Papa from 'papaparse';

export const loadCsvFromPublic = async (filename) => {
  const response = await fetch(`/${filename}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${filename}`);
  }
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder('utf-8');
  const csv = decoder.decode(result.value);
  const parsed = Papa.parse(csv, { header: true });
  return parsed.data;
};
