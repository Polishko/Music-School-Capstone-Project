/**
 * The custom types and interfaces used throughout the functions.
 */

/**
 * Represents a topic in a course (used inside the course.topics array).
 */
export interface Topic {
  title: string;
  content: string;
}

/**
 * Represents a course with all its properties and optional preview video URL.
 */

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

/**
 * Represents the valid keys used for filtering course data.
 */

export type FilterKey = "instrument" | "level" | "general" | "sort";

/**
 * Maps each filter key to a string value. All keys are optional.
 */
export type Filters = Partial<Record<FilterKey, string>>;

/**
 * Represents the allowed sorting criteria.
 */

export type SortCriteria = "title-asc" | "instructor-asc" | "level-asc";

/**
 * Represents a list of enrolled course IDs stored in localStorage.
 */

export type EnrolledCourses = number[];
