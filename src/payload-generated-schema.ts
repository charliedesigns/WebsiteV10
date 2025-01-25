/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:db-schema` to regenerate this file.
 */

import {
  pgTable,
  index,
  uniqueIndex,
  foreignKey,
  serial,
  timestamp,
  varchar,
  numeric,
  jsonb,
  integer,
  pgEnum,
} from '@payloadcms/db-postgres/drizzle/pg-core'
import { sql, relations } from '@payloadcms/db-postgres/drizzle'
export const enum_projects_tech_stack_technologies = pgEnum(
  'enum_projects_tech_stack_technologies',
  [
    'react',
    'next',
    'tailwind',
    'typescript',
    'houdini',
    'blender',
    'fusion',
    'substance',
    'unreal',
    'unity',
    'embergen',
    'figma',
    'photoshop',
    'illustrator',
    'aftereffects',
    'premierepro',
    'davinciresolve',
  ],
)
export const enum_projects_tags_tags = pgEnum('enum_projects_tags_tags', ['fx', 'dev', 'design'])

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    email: varchar('email').notNull(),
    resetPasswordToken: varchar('reset_password_token'),
    resetPasswordExpiration: timestamp('reset_password_expiration', {
      mode: 'string',
      withTimezone: true,
      precision: 3,
    }),
    salt: varchar('salt'),
    hash: varchar('hash'),
    loginAttempts: numeric('login_attempts').default('0'),
    lockUntil: timestamp('lock_until', { mode: 'string', withTimezone: true, precision: 3 }),
  },
  (columns) => ({
    users_updated_at_idx: index('users_updated_at_idx').on(columns.updatedAt),
    users_created_at_idx: index('users_created_at_idx').on(columns.createdAt),
    users_email_idx: uniqueIndex('users_email_idx').on(columns.email),
  }),
)

export const media = pgTable(
  'media',
  {
    id: serial('id').primaryKey(),
    alt: varchar('alt').notNull(),
    caption: jsonb('caption'),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    url: varchar('url'),
    thumbnailURL: varchar('thumbnail_u_r_l'),
    filename: varchar('filename'),
    mimeType: varchar('mime_type'),
    filesize: numeric('filesize'),
    width: numeric('width'),
    height: numeric('height'),
    focalX: numeric('focal_x'),
    focalY: numeric('focal_y'),
  },
  (columns) => ({
    media_updated_at_idx: index('media_updated_at_idx').on(columns.updatedAt),
    media_created_at_idx: index('media_created_at_idx').on(columns.createdAt),
    media_filename_idx: uniqueIndex('media_filename_idx').on(columns.filename),
  }),
)

export const blog = pgTable(
  'blog',
  {
    id: serial('id').primaryKey(),
    title: varchar('title').notNull(),
    slug: varchar('slug').notNull(),
    description: varchar('description').notNull(),
    heroImage: integer('hero_image_id').references(() => media.id, {
      onDelete: 'set null',
    }),
    content: jsonb('content').notNull(),
    content_html: varchar('content_html'),
    publishedAt: timestamp('published_at', { mode: 'string', withTimezone: true, precision: 3 }),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    blog_slug_idx: uniqueIndex('blog_slug_idx').on(columns.slug),
    blog_hero_image_idx: index('blog_hero_image_idx').on(columns.heroImage),
    blog_updated_at_idx: index('blog_updated_at_idx').on(columns.updatedAt),
    blog_created_at_idx: index('blog_created_at_idx').on(columns.createdAt),
  }),
)

export const projects_tech_stack_technologies = pgTable(
  'projects_tech_stack_technologies',
  {
    order: integer('order').notNull(),
    parent: integer('parent_id').notNull(),
    value: enum_projects_tech_stack_technologies('value'),
    id: serial('id').primaryKey(),
  },
  (columns) => ({
    orderIdx: index('projects_tech_stack_technologies_order_idx').on(columns.order),
    parentIdx: index('projects_tech_stack_technologies_parent_idx').on(columns.parent),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [projects.id],
      name: 'projects_tech_stack_technologies_parent_fk',
    }).onDelete('cascade'),
  }),
)

export const projects_tags_tags = pgTable(
  'projects_tags_tags',
  {
    order: integer('order').notNull(),
    parent: integer('parent_id').notNull(),
    value: enum_projects_tags_tags('value'),
    id: serial('id').primaryKey(),
  },
  (columns) => ({
    orderIdx: index('projects_tags_tags_order_idx').on(columns.order),
    parentIdx: index('projects_tags_tags_parent_idx').on(columns.parent),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [projects.id],
      name: 'projects_tags_tags_parent_fk',
    }).onDelete('cascade'),
  }),
)

export const projects = pgTable(
  'projects',
  {
    id: serial('id').primaryKey(),
    'Header Image': integer('header_image_id').references(() => media.id, {
      onDelete: 'set null',
    }),
    'Project Name': varchar('project_name').notNull(),
    slug: varchar('slug').notNull(),
    Content_description: varchar('content_description').notNull(),
    Content_Content: jsonb('content_content').notNull(),
    Links_YouTube: varchar('links_you_tube'),
    Links_GitHub: varchar('links_git_hub'),
    Links_Artstation: varchar('links_artstation'),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    projects_header_image_idx: index('projects_header_image_idx').on(columns['Header Image']),
    projects_slug_idx: uniqueIndex('projects_slug_idx').on(columns.slug),
    projects_updated_at_idx: index('projects_updated_at_idx').on(columns.updatedAt),
    projects_created_at_idx: index('projects_created_at_idx').on(columns.createdAt),
  }),
)

export const payload_locked_documents = pgTable(
  'payload_locked_documents',
  {
    id: serial('id').primaryKey(),
    globalSlug: varchar('global_slug'),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    payload_locked_documents_global_slug_idx: index('payload_locked_documents_global_slug_idx').on(
      columns.globalSlug,
    ),
    payload_locked_documents_updated_at_idx: index('payload_locked_documents_updated_at_idx').on(
      columns.updatedAt,
    ),
    payload_locked_documents_created_at_idx: index('payload_locked_documents_created_at_idx').on(
      columns.createdAt,
    ),
  }),
)

export const payload_locked_documents_rels = pgTable(
  'payload_locked_documents_rels',
  {
    id: serial('id').primaryKey(),
    order: integer('order'),
    parent: integer('parent_id').notNull(),
    path: varchar('path').notNull(),
    usersID: integer('users_id'),
    mediaID: integer('media_id'),
    blogID: integer('blog_id'),
    projectsID: integer('projects_id'),
  },
  (columns) => ({
    order: index('payload_locked_documents_rels_order_idx').on(columns.order),
    parentIdx: index('payload_locked_documents_rels_parent_idx').on(columns.parent),
    pathIdx: index('payload_locked_documents_rels_path_idx').on(columns.path),
    payload_locked_documents_rels_users_id_idx: index(
      'payload_locked_documents_rels_users_id_idx',
    ).on(columns.usersID),
    payload_locked_documents_rels_media_id_idx: index(
      'payload_locked_documents_rels_media_id_idx',
    ).on(columns.mediaID),
    payload_locked_documents_rels_blog_id_idx: index(
      'payload_locked_documents_rels_blog_id_idx',
    ).on(columns.blogID),
    payload_locked_documents_rels_projects_id_idx: index(
      'payload_locked_documents_rels_projects_id_idx',
    ).on(columns.projectsID),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [payload_locked_documents.id],
      name: 'payload_locked_documents_rels_parent_fk',
    }).onDelete('cascade'),
    usersIdFk: foreignKey({
      columns: [columns['usersID']],
      foreignColumns: [users.id],
      name: 'payload_locked_documents_rels_users_fk',
    }).onDelete('cascade'),
    mediaIdFk: foreignKey({
      columns: [columns['mediaID']],
      foreignColumns: [media.id],
      name: 'payload_locked_documents_rels_media_fk',
    }).onDelete('cascade'),
    blogIdFk: foreignKey({
      columns: [columns['blogID']],
      foreignColumns: [blog.id],
      name: 'payload_locked_documents_rels_blog_fk',
    }).onDelete('cascade'),
    projectsIdFk: foreignKey({
      columns: [columns['projectsID']],
      foreignColumns: [projects.id],
      name: 'payload_locked_documents_rels_projects_fk',
    }).onDelete('cascade'),
  }),
)

export const payload_preferences = pgTable(
  'payload_preferences',
  {
    id: serial('id').primaryKey(),
    key: varchar('key'),
    value: jsonb('value'),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    payload_preferences_key_idx: index('payload_preferences_key_idx').on(columns.key),
    payload_preferences_updated_at_idx: index('payload_preferences_updated_at_idx').on(
      columns.updatedAt,
    ),
    payload_preferences_created_at_idx: index('payload_preferences_created_at_idx').on(
      columns.createdAt,
    ),
  }),
)

export const payload_preferences_rels = pgTable(
  'payload_preferences_rels',
  {
    id: serial('id').primaryKey(),
    order: integer('order'),
    parent: integer('parent_id').notNull(),
    path: varchar('path').notNull(),
    usersID: integer('users_id'),
  },
  (columns) => ({
    order: index('payload_preferences_rels_order_idx').on(columns.order),
    parentIdx: index('payload_preferences_rels_parent_idx').on(columns.parent),
    pathIdx: index('payload_preferences_rels_path_idx').on(columns.path),
    payload_preferences_rels_users_id_idx: index('payload_preferences_rels_users_id_idx').on(
      columns.usersID,
    ),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [payload_preferences.id],
      name: 'payload_preferences_rels_parent_fk',
    }).onDelete('cascade'),
    usersIdFk: foreignKey({
      columns: [columns['usersID']],
      foreignColumns: [users.id],
      name: 'payload_preferences_rels_users_fk',
    }).onDelete('cascade'),
  }),
)

export const payload_migrations = pgTable(
  'payload_migrations',
  {
    id: serial('id').primaryKey(),
    name: varchar('name'),
    batch: numeric('batch'),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    payload_migrations_updated_at_idx: index('payload_migrations_updated_at_idx').on(
      columns.updatedAt,
    ),
    payload_migrations_created_at_idx: index('payload_migrations_created_at_idx').on(
      columns.createdAt,
    ),
  }),
)

export const relations_users = relations(users, () => ({}))
export const relations_media = relations(media, () => ({}))
export const relations_blog = relations(blog, ({ one }) => ({
  heroImage: one(media, {
    fields: [blog.heroImage],
    references: [media.id],
    relationName: 'heroImage',
  }),
}))
export const relations_projects_tech_stack_technologies = relations(
  projects_tech_stack_technologies,
  ({ one }) => ({
    parent: one(projects, {
      fields: [projects_tech_stack_technologies.parent],
      references: [projects.id],
      relationName: 'Tech stack_technologies',
    }),
  }),
)
export const relations_projects_tags_tags = relations(projects_tags_tags, ({ one }) => ({
  parent: one(projects, {
    fields: [projects_tags_tags.parent],
    references: [projects.id],
    relationName: 'tags_tags',
  }),
}))
export const relations_projects = relations(projects, ({ one, many }) => ({
  'Header Image': one(media, {
    fields: [projects['Header Image']],
    references: [media.id],
    relationName: 'Header Image',
  }),
  'Tech stack_technologies': many(projects_tech_stack_technologies, {
    relationName: 'Tech stack_technologies',
  }),
  tags_tags: many(projects_tags_tags, {
    relationName: 'tags_tags',
  }),
}))
export const relations_payload_locked_documents_rels = relations(
  payload_locked_documents_rels,
  ({ one }) => ({
    parent: one(payload_locked_documents, {
      fields: [payload_locked_documents_rels.parent],
      references: [payload_locked_documents.id],
      relationName: '_rels',
    }),
    usersID: one(users, {
      fields: [payload_locked_documents_rels.usersID],
      references: [users.id],
      relationName: 'users',
    }),
    mediaID: one(media, {
      fields: [payload_locked_documents_rels.mediaID],
      references: [media.id],
      relationName: 'media',
    }),
    blogID: one(blog, {
      fields: [payload_locked_documents_rels.blogID],
      references: [blog.id],
      relationName: 'blog',
    }),
    projectsID: one(projects, {
      fields: [payload_locked_documents_rels.projectsID],
      references: [projects.id],
      relationName: 'projects',
    }),
  }),
)
export const relations_payload_locked_documents = relations(
  payload_locked_documents,
  ({ many }) => ({
    _rels: many(payload_locked_documents_rels, {
      relationName: '_rels',
    }),
  }),
)
export const relations_payload_preferences_rels = relations(
  payload_preferences_rels,
  ({ one }) => ({
    parent: one(payload_preferences, {
      fields: [payload_preferences_rels.parent],
      references: [payload_preferences.id],
      relationName: '_rels',
    }),
    usersID: one(users, {
      fields: [payload_preferences_rels.usersID],
      references: [users.id],
      relationName: 'users',
    }),
  }),
)
export const relations_payload_preferences = relations(payload_preferences, ({ many }) => ({
  _rels: many(payload_preferences_rels, {
    relationName: '_rels',
  }),
}))
export const relations_payload_migrations = relations(payload_migrations, () => ({}))

type DatabaseSchema = {
  enum_projects_tech_stack_technologies: typeof enum_projects_tech_stack_technologies
  enum_projects_tags_tags: typeof enum_projects_tags_tags
  users: typeof users
  media: typeof media
  blog: typeof blog
  projects_tech_stack_technologies: typeof projects_tech_stack_technologies
  projects_tags_tags: typeof projects_tags_tags
  projects: typeof projects
  payload_locked_documents: typeof payload_locked_documents
  payload_locked_documents_rels: typeof payload_locked_documents_rels
  payload_preferences: typeof payload_preferences
  payload_preferences_rels: typeof payload_preferences_rels
  payload_migrations: typeof payload_migrations
  relations_users: typeof relations_users
  relations_media: typeof relations_media
  relations_blog: typeof relations_blog
  relations_projects_tech_stack_technologies: typeof relations_projects_tech_stack_technologies
  relations_projects_tags_tags: typeof relations_projects_tags_tags
  relations_projects: typeof relations_projects
  relations_payload_locked_documents_rels: typeof relations_payload_locked_documents_rels
  relations_payload_locked_documents: typeof relations_payload_locked_documents
  relations_payload_preferences_rels: typeof relations_payload_preferences_rels
  relations_payload_preferences: typeof relations_payload_preferences
  relations_payload_migrations: typeof relations_payload_migrations
}

declare module '@payloadcms/db-postgres/types' {
  export interface GeneratedDatabaseSchema {
    schema: DatabaseSchema
  }
}
