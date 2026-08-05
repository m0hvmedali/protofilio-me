import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  bio: text('bio').notNull(),
  location: text('location').notNull(),
  avatarUrl: text('avatar_url').notNull(),
  resumeUrl: text('resume_url').notNull(),
  email: text('email').notNull(),
  linkedinUrl: text('linkedin_url').notNull(),
  githubUrl: text('github_url').notNull(),
  whatsapp: text('whatsapp'),
  updatedAt: timestamp('updated_at').defaultNow(),
});


export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  posterUrl: text('poster_url').notNull(),
  techStack: jsonb('tech_stack').notNull(), // Array of strings
  liveLink: text('live_link'),
  repoLink: text('repo_link'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Since services, courses, skills are also mentioned in the DB Schema structure from the user request
export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageUrl: text('image_url').notNull(),
  hoverDescription: text('hover_description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  provider: text('provider').notNull(),
  date: text('date').notNull(),
  keyTakeaway: text('key_takeaway').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  icon: text('icon').notNull(),
  shortDesc: text('short_desc').notNull(),
  detailedDeliverables: jsonb('detailed_deliverables').notNull(), // JSON
  createdAt: timestamp('created_at').defaultNow(),
});
