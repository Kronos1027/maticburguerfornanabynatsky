export interface StudyItem {
  id: string;
  question: string;
  answer: string;
  timestamp: number;
}

const STORAGE_KEY = 'burguerMaticStudyItems';

export const saveItem = (question: string, answer: string): void => {
  const items = getItems();
  const newItem: StudyItem = {
    id: new Date().toISOString(),
    question,
    answer,
    timestamp: Date.now(),
  };
  items.push(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const getItems = (): StudyItem[] => {
  try {
    const itemsJson = localStorage.getItem(STORAGE_KEY);
    return itemsJson ? JSON.parse(itemsJson) : [];
  } catch (error) {
    console.error("Could not parse study items from localStorage", error);
    return [];
  }
};

export const getTodaysItems = (): StudyItem[] => {
  const items = getItems();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the beginning of the day

  return items.filter(item => item.timestamp >= today.getTime());
};
