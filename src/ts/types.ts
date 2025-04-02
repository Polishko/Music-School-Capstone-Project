export interface Topic {
  title: string;
  content: string;
}

export interface Course {
  id: number;
  title: string;
  instrument: string;
  level: string;
  instructor: string;
  image: string;
  description: string;
  videoUrl?: string;
  topics: Topic[];
}

export type FilterKey = "instrument" | "level" | "general" | "sort";

export type Filters = Partial<Record<FilterKey, string>>;

export type SortCriteria = "title-asc" | "instructor-asc" | "level-asc";
