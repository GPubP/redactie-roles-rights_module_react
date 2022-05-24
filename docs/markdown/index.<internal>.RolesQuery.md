# Class: RolesQuery

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).RolesQuery

## Hierarchy

- `Query`<[`RolesState`](../wiki/index.RolesState)\>

  ↳ **`RolesQuery`**

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.RolesQuery#constructor)

### Properties

- [error$](../wiki/index.%3Cinternal%3E.RolesQuery#error$)
- [store](../wiki/index.%3Cinternal%3E.RolesQuery#store)

### Methods

- [selectIsCreating](../wiki/index.%3Cinternal%3E.RolesQuery#selectiscreating)
- [selectIsDeleting](../wiki/index.%3Cinternal%3E.RolesQuery#selectisdeleting)
- [selectIsFetching](../wiki/index.%3Cinternal%3E.RolesQuery#selectisfetching)
- [selectIsUpdating](../wiki/index.%3Cinternal%3E.RolesQuery#selectisupdating)
- [selectMeta](../wiki/index.%3Cinternal%3E.RolesQuery#selectmeta)
- [selectRoleDetail](../wiki/index.%3Cinternal%3E.RolesQuery#selectroledetail)
- [selectRoles](../wiki/index.%3Cinternal%3E.RolesQuery#selectroles)

## Constructors

### constructor

• **new RolesQuery**(`store`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`RolesStore`](../wiki/index.%3Cinternal%3E.RolesStore) |

#### Overrides

Query&lt;RolesState\&gt;.constructor

#### Defined in

public/lib/store/roles/roles.query.ts:10

## Properties

### error$

• **error$**: `Observable`<`any`\>

#### Defined in

public/lib/store/roles/roles.query.ts:60

___

### store

• `Protected` **store**: [`RolesStore`](../wiki/index.%3Cinternal%3E.RolesStore)

#### Inherited from

Query.store

## Methods

### selectIsCreating

▸ **selectIsCreating**(`type`): `Observable`<`LoadingState`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) |

#### Returns

`Observable`<`LoadingState`\>

#### Defined in

public/lib/store/roles/roles.query.ts:36

___

### selectIsDeleting

▸ **selectIsDeleting**(`type`): `Observable`<`LoadingState`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) |

#### Returns

`Observable`<`LoadingState`\>

#### Defined in

public/lib/store/roles/roles.query.ts:54

___

### selectIsFetching

▸ **selectIsFetching**(`type`): `Observable`<`LoadingState`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) |

#### Returns

`Observable`<`LoadingState`\>

#### Defined in

public/lib/store/roles/roles.query.ts:42

___

### selectIsUpdating

▸ **selectIsUpdating**(`type`): `Observable`<`LoadingState`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) |

#### Returns

`Observable`<`LoadingState`\>

#### Defined in

public/lib/store/roles/roles.query.ts:48

___

### selectMeta

▸ **selectMeta**(`type`): `Observable`<`undefined` \| `Page`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) |

#### Returns

`Observable`<`undefined` \| `Page`\>

#### Defined in

public/lib/store/roles/roles.query.ts:23

___

### selectRoleDetail

▸ **selectRoleDetail**(`type`): `Observable`<`undefined` \| [`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) |

#### Returns

`Observable`<`undefined` \| [`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Defined in

public/lib/store/roles/roles.query.ts:31

___

### selectRoles

▸ **selectRoles**(`type`): `Observable`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`RoleEntityTypes`](../wiki/index.%3Cinternal%3E.RoleEntityTypes) |

#### Returns

`Observable`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)[]\>

#### Defined in

public/lib/store/roles/roles.query.ts:27
