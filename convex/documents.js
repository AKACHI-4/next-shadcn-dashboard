'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === 'function' ? Iterator : Object).prototype
      );
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.removeCoverImage =
  exports.removeIcon =
  exports.update =
  exports.getById =
  exports.getSearch =
  exports.remove =
  exports.restore =
  exports.getTrash =
  exports.create =
  exports.getSidebar =
  exports.archive =
    void 0;
var values_1 = require('convex/values');
var server_1 = require('./_generated/server');
exports.archive = (0, server_1.mutation)({
  args: { id: values_1.v.id('documents') },
  handler: function (ctx, args) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity, userId, existingDocument, recursiveArchive, document;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            if (!identity) {
              throw new Error('Not authenticated !!');
            }
            userId = identity.subject;
            return [4 /*yield*/, ctx.db.get(args.id)];
          case 2:
            existingDocument = _a.sent();
            if (!existingDocument) {
              throw new Error('Not Found !!');
            }
            if (existingDocument.userId !== userId) {
              throw new Error('Unauthorized');
            }
            recursiveArchive = function (documentId) {
              return __awaiter(void 0, void 0, void 0, function () {
                var children, _i, children_1, child;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return [
                        4 /*yield*/,
                        ctx.db
                          .query('documents')
                          .withIndex('by_user_parent', function (q) {
                            return q
                              .eq('userId', userId)
                              .eq('parentDocument', documentId);
                          })
                          .collect()
                      ];
                    case 1:
                      children = _a.sent();
                      (_i = 0), (children_1 = children);
                      _a.label = 2;
                    case 2:
                      if (!(_i < children_1.length)) return [3 /*break*/, 6];
                      child = children_1[_i];
                      return [
                        4 /*yield*/,
                        ctx.db.patch(child._id, {
                          isArchived: true
                        })
                      ];
                    case 3:
                      _a.sent();
                      return [4 /*yield*/, recursiveArchive(child._id)];
                    case 4:
                      _a.sent();
                      _a.label = 5;
                    case 5:
                      _i++;
                      return [3 /*break*/, 2];
                    case 6:
                      return [2 /*return*/];
                  }
                });
              });
            };
            return [
              4 /*yield*/,
              ctx.db.patch(args.id, {
                isArchived: true
              })
            ];
          case 3:
            document = _a.sent();
            recursiveArchive(args.id);
            return [2 /*return*/, document];
        }
      });
    });
  }
});
exports.getSidebar = (0, server_1.query)({
  args: {
    parentDocument: values_1.v.optional(values_1.v.id('documents'))
  },
  handler: function (ctx, args) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity, userId, documents;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            if (!identity) {
              throw new Error('Not authenticated !!');
            }
            userId = identity.subject;
            return [
              4 /*yield*/,
              ctx.db
                .query('documents')
                .withIndex('by_user_parent', function (q) {
                  return q
                    .eq('userId', userId)
                    .eq('parentDocument', args.parentDocument);
                })
                .filter(function (q) {
                  return q.eq(q.field('isArchived'), false);
                })
                .order('desc')
                .collect()
            ];
          case 2:
            documents = _a.sent();
            return [2 /*return*/, documents];
        }
      });
    });
  }
});
exports.create = (0, server_1.mutation)({
  args: {
    title: values_1.v.string(),
    parentDocument: values_1.v.optional(values_1.v.id('documents'))
  },
  handler: function (ctx, args) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity, userId, document;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            if (!identity) {
              throw new Error('Not authenticated');
            }
            userId = identity.subject;
            return [
              4 /*yield*/,
              ctx.db.insert('documents', {
                title: args.title,
                parentDocument: args.parentDocument,
                userId: userId,
                isArchived: false,
                isPublished: false
              })
            ];
          case 2:
            document = _a.sent();
            return [2 /*return*/, document];
        }
      });
    });
  }
});
exports.getTrash = (0, server_1.query)({
  handler: function (ctx) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity, userId, documents;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            if (!identity) {
              throw new Error('Not authenticated !!');
            }
            userId = identity.subject;
            return [
              4 /*yield*/,
              ctx.db
                .query('documents')
                .withIndex('by_user', function (q) {
                  return q.eq('userId', userId);
                })
                .filter(function (q) {
                  return q.eq(q.field('isArchived'), true);
                })
                .order('desc')
                .collect()
            ];
          case 2:
            documents = _a.sent();
            return [2 /*return*/, documents];
        }
      });
    });
  }
});
exports.restore = (0, server_1.mutation)({
  args: { id: values_1.v.id('documents') },
  handler: function (ctx, args) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity,
        userId,
        existingDocument,
        recursiveRestore,
        options,
        parent_1,
        document;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            if (!identity) {
              throw new Error('Not authenticated !!');
            }
            userId = identity.subject;
            return [4 /*yield*/, ctx.db.get(args.id)];
          case 2:
            existingDocument = _a.sent();
            if (!existingDocument) {
              throw new Error('Not Found');
            }
            if (existingDocument.userId !== userId) {
              throw new Error('Unauthorized');
            }
            recursiveRestore = function (documentId) {
              return __awaiter(void 0, void 0, void 0, function () {
                var children, _i, children_2, child;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return [
                        4 /*yield*/,
                        ctx.db
                          .query('documents')
                          .withIndex('by_user_parent', function (q) {
                            return q
                              .eq('userId', userId)
                              .eq('parentDocument', documentId);
                          })
                          .collect()
                      ];
                    case 1:
                      children = _a.sent();
                      (_i = 0), (children_2 = children);
                      _a.label = 2;
                    case 2:
                      if (!(_i < children_2.length)) return [3 /*break*/, 6];
                      child = children_2[_i];
                      return [
                        4 /*yield*/,
                        ctx.db.patch(child._id, {
                          isArchived: false
                        })
                      ];
                    case 3:
                      _a.sent();
                      return [4 /*yield*/, recursiveRestore(child._id)];
                    case 4:
                      _a.sent();
                      _a.label = 5;
                    case 5:
                      _i++;
                      return [3 /*break*/, 2];
                    case 6:
                      return [2 /*return*/];
                  }
                });
              });
            };
            options = {
              isArchived: false
            };
            if (!existingDocument.parentDocument) return [3 /*break*/, 4];
            return [4 /*yield*/, ctx.db.get(existingDocument.parentDocument)];
          case 3:
            parent_1 = _a.sent();
            if (
              parent_1 === null || parent_1 === void 0
                ? void 0
                : parent_1.isArchived
            ) {
              options.parentDocument = undefined;
            }
            _a.label = 4;
          case 4:
            return [4 /*yield*/, ctx.db.patch(args.id, options)];
          case 5:
            document = _a.sent();
            recursiveRestore(args.id);
            return [2 /*return*/, document];
        }
      });
    });
  }
});
exports.remove = (0, server_1.mutation)({
  args: { id: values_1.v.id('documents') },
  handler: function (ctx, args) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity, userId, existingDocument, document;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            if (!identity) {
              throw new Error('Not authenticated !!');
            }
            userId = identity.subject;
            return [4 /*yield*/, ctx.db.get(args.id)];
          case 2:
            existingDocument = _a.sent();
            if (!existingDocument) {
              throw new Error('Not Found');
            }
            if (existingDocument.userId !== userId) {
              throw new Error('Unauthorized');
            }
            return [4 /*yield*/, ctx.db.delete(args.id)];
          case 3:
            document = _a.sent();
            return [2 /*return*/, document];
        }
      });
    });
  }
});
exports.getSearch = (0, server_1.query)({
  handler: function (ctx) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity, userId, documents;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            if (!identity) {
              throw new Error('Not authenticated');
            }
            userId = identity.subject;
            return [
              4 /*yield*/,
              ctx.db
                .query('documents')
                .withIndex('by_user', function (q) {
                  return q.eq('userId', userId);
                })
                .filter(function (q) {
                  return q.eq(q.field('isArchived'), false);
                })
                .order('desc')
                .collect()
            ];
          case 2:
            documents = _a.sent();
            return [2 /*return*/, documents];
        }
      });
    });
  }
});
exports.getById = (0, server_1.query)({
  args: { documentId: values_1.v.id('documents') },
  handler: function (ctx, args) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity, document, userId;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            return [4 /*yield*/, ctx.db.get(args.documentId)];
          case 2:
            document = _a.sent();
            if (!document) {
              throw new Error('Not found');
            }
            if (document.isPublished && !document.isArchived) {
              return [2 /*return*/, document];
            }
            if (!identity) {
              throw new Error('Not authenticated');
            }
            userId = identity.subject;
            if (document.userId !== userId) {
              throw new Error('Unauthorized');
            }
            return [2 /*return*/, document];
        }
      });
    });
  }
});
exports.update = (0, server_1.mutation)({
  args: {
    id: values_1.v.id('documents'),
    title: values_1.v.optional(values_1.v.string()),
    content: values_1.v.optional(values_1.v.string()),
    coverImage: values_1.v.optional(values_1.v.string()),
    icon: values_1.v.optional(values_1.v.string()),
    isPublished: values_1.v.optional(values_1.v.boolean())
  },
  handler: function (ctx, args) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity, userId, id, rest, existingDocument, document;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            if (!identity) {
              throw new Error('Unauthenticated !!');
            }
            userId = identity.subject;
            (id = args.id), (rest = __rest(args, ['id']));
            return [4 /*yield*/, ctx.db.get(args.id)];
          case 2:
            existingDocument = _a.sent();
            if (!existingDocument) {
              throw new Error('Not Found');
            }
            if (existingDocument.userId !== userId) {
              throw new Error('Unauthorized');
            }
            return [4 /*yield*/, ctx.db.patch(args.id, __assign({}, rest))];
          case 3:
            document = _a.sent();
            return [2 /*return*/, document];
        }
      });
    });
  }
});
exports.removeIcon = (0, server_1.mutation)({
  args: { id: values_1.v.id('documents') },
  handler: function (ctx, args) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity, userId, existingDocument, document;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            if (!identity) {
              throw new Error('Unauthenticated');
            }
            userId = identity.subject;
            return [4 /*yield*/, ctx.db.get(args.id)];
          case 2:
            existingDocument = _a.sent();
            if (!existingDocument) {
              throw new Error('Not found');
            }
            if (existingDocument.userId !== userId) {
              throw new Error('Unauthorized');
            }
            return [
              4 /*yield*/,
              ctx.db.patch(args.id, {
                icon: undefined
              })
            ];
          case 3:
            document = _a.sent();
            return [2 /*return*/, document];
        }
      });
    });
  }
});
exports.removeCoverImage = (0, server_1.mutation)({
  args: { id: values_1.v.id('documents') },
  handler: function (ctx, args) {
    return __awaiter(void 0, void 0, void 0, function () {
      var identity, userId, existingDocument, document;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, ctx.auth.getUserIdentity()];
          case 1:
            identity = _a.sent();
            if (!identity) {
              throw new Error('Unauthenticated');
            }
            userId = identity.subject;
            return [4 /*yield*/, ctx.db.get(args.id)];
          case 2:
            existingDocument = _a.sent();
            if (!existingDocument) {
              throw new Error('Not found');
            }
            if (existingDocument.userId !== userId) {
              throw new Error('Unauthorized');
            }
            return [
              4 /*yield*/,
              ctx.db.patch(args.id, {
                coverImage: undefined
              })
            ];
          case 3:
            document = _a.sent();
            return [2 /*return*/, document];
        }
      });
    });
  }
});
