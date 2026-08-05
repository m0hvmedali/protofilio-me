/**
 * Database Schema Representation
 * This file contains the TypeScript definitions for the application's data schema.
 * It is designed to be easily mapped to a Prisma schema for relational databases (MySQL/PostgreSQL)
 * or to be used directly with services like Supabase.
 */

// 1. User_Profile
export interface UserProfile {
  id: string;
  name: string;
  headline: string;
  bio: string;
  resume_url: string;
  email: string;
  linkedin_url?: string;
  github_url?: string;
  whatsapp?: string;
  avatar_url?: string;
}

// 2. Skills_Posters
export interface Skill {
  id: string;
  title: string;
  image_url: string;
  hover_description: string;
}

// 3. Courses
export interface Course {
  id: string;
  title: string;
  provider: string;
  date: string; // ISO Date String or Year
  key_takeaway: string;
}

// 4. Services
export interface Service {
  id: string;
  title: string;
  icon: string; // Icon identifier (e.g., Lucide icon name)
  short_desc: string;
  detailed_deliverables: {
    overview: string;
    features: string[];
    process: string[];
  };
}

// 5. Projects
export interface Project {
  id: string;
  title: string;
  description: string;
  poster_url: string;
  tech_stack: string[];
  live_link?: string;
  repo_link?: string;
}
