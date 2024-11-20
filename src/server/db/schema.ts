import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  pgTable,
  text,
  timestamp,
  varchar,
  pgEnum,
  decimal,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const roleEnum = pgEnum("role", ["admin", "cashier"]);

export const organisations = pgTable("organisation", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const organisationRelations = relations(organisations, ({ many }) => ({
  users: many(users),
  products: many(products),
}));

export const users = pgTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  organisationId: varchar("organisation_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  role: roleEnum("role"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  organisations: one(organisations, {
    fields: [users.organisationId],
    references: [organisations.id],
  }),
}));

export const accounts = pgTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const products = pgTable("product", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  organsationId: varchar("organisation_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  sku: varchar("sku", { length: 255 }).unique(),
  price: decimal("price", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productsRelations = relations(products, ({ one }) => ({
  organisations: one(organisations, {
    fields: [products.organsationId],
    references: [organisations.id],
  }),
}));

export const inventories = pgTable("inventory", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  organsationId: varchar("organisation_id", { length: 255 }).notNull(),
  productId: varchar("product_id", { length: 255 }).notNull(),
  stockQuantity: integer("stock_quantity").default(0),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const inventoriesRelations = relations(inventories, ({ one, many }) => ({
  organisations: one(organisations, {
    fields: [inventories.organsationId],
    references: [organisations.id],
  }),
  products: many(products),
}));
