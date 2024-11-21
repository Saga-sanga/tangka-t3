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
export const paymentEnum = pgEnum("paymentType", [
  "card",
  "cash",
  "digital wallet",
]);

export const organisations = pgTable(
  "organisation",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      nameIdx: index("organisation_name_idx").on(table.name),
    };
  },
);

export const organisationRelations = relations(organisations, ({ many }) => ({
  users: many(users),
  inventories: many(inventories),
  items: many(items),
  sales: many(sales),
  salesItems: many(salesItems),
  payments: many(payments),
}));

export const users = pgTable(
  "user",
  {
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
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
    };
  },
);

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  organisations: one(organisations, {
    fields: [users.organisationId],
    references: [organisations.id],
  }),
  sales: many(sales),
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

export const items = pgTable(
  "item",
  {
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
  },
  (table) => {
    return {
      nameCompositeIdx: index("idx_name_organisation_id").on(
        table.organsationId,
        table.name,
      ),
    };
  },
);

export const itemsRelations = relations(items, ({ one, many }) => ({
  organisations: one(organisations, {
    fields: [items.organsationId],
    references: [organisations.id],
  }),
  salesItems: many(salesItems),
}));

export const inventories = pgTable(
  "inventory",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    organsationId: varchar("organisation_id", { length: 255 }).notNull(),
    itemId: varchar("item_id", { length: 255 }).notNull(),
    stockQuantity: integer("stock_quantity").default(0),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      itemIdIdx: index("inventory_item_id_idx").on(table.itemId),
      organisationIdIdx: index("items_organisation_id_idx").on(
        table.organsationId,
      ),
    };
  },
);

export const inventoriesRelations = relations(inventories, ({ one, many }) => ({
  organisations: one(organisations, {
    fields: [inventories.organsationId],
    references: [organisations.id],
  }),
  items: many(items),
}));

export const sales = pgTable(
  "sales",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id", { length: 255 }).notNull(),
    organsationId: varchar("organisation_id", { length: 255 }).notNull(),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      idxSalesOrgDate: index("idx_sales_org_date").on(
        table.organsationId,
        table.createdAt,
      ),
      salesUserId: index("sales_user_id").on(table.userId),
    };
  },
);

export const salesRelations = relations(sales, ({ one, many }) => ({
  users: one(users, {
    fields: [sales.userId],
    references: [users.id],
  }),
  organisations: one(organisations, {
    fields: [sales.organsationId],
    references: [organisations.id],
  }),
  salesItems: many(salesItems),
  payments: many(payments),
}));

export const salesItems = pgTable(
  "sales_items",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    salesId: varchar("sales_id", { length: 255 }).notNull(),
    organisationId: varchar("organisation_id", { length: 255 }).notNull(),
    itemId: varchar("item_id", { length: 255 }).notNull(),
    quantity: integer("quantity").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      idxSalesItemsComposite: index("idx_sales_items_composite").on(
        table.organisationId,
        table.salesId,
        table.itemId,
      ),
    };
  },
);

export const salesItemsRelations = relations(salesItems, ({ one }) => ({
  sales: one(sales, {
    fields: [salesItems.salesId],
    references: [sales.id],
  }),
  organisations: one(organisations, {
    fields: [salesItems.organisationId],
    references: [organisations.id],
  }),
  items: one(items, {
    fields: [salesItems.itemId],
    references: [items.id],
  }),
}));

export const payments = pgTable(
  "payment",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    saleId: varchar("sale_id", { length: 255 }).notNull(),
    organisationId: varchar("organisation_id", { length: 255 }).notNull(),
    paymentMethod: paymentEnum("payment_method"),
    amount: decimal("amount", { precision: 10, scale: 2 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      idxPaymentComposite: index("idx_payment_composite").on(
        table.organisationId,
        table.saleId,
        table.createdAt,
      ),
    };
  },
);

export const paymentsRelations = relations(payments, ({ one }) => ({
  sale: one(sales, {
    fields: [payments.saleId],
    references: [sales.id],
  }),
  organisations: one(organisations, {
    fields: [payments.organisationId],
    references: [organisations.id],
  }),
}));
