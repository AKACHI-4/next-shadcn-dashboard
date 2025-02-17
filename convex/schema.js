'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var server_1 = require('convex/server');
var values_1 = require('convex/values');
exports.default = (0, server_1.defineSchema)({
  documents: (0, server_1.defineTable)({
    title: values_1.v.string(),
    userId: values_1.v.string(),
    isArchived: values_1.v.boolean(),
    parentDocument: values_1.v.optional(values_1.v.id('documents')),
    content: values_1.v.optional(values_1.v.string()),
    coverImage: values_1.v.optional(values_1.v.string()),
    icon: values_1.v.optional(values_1.v.string()),
    isPublished: values_1.v.boolean()
  })
    .index('by_user', ['userId'])
    .index('by_user_parent', ['userId', 'parentDocument'])
});
