# Class: RolesFacade

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).RolesFacade

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.RolesFacade#constructor)

### Properties

- [error$](../wiki/index.%3Cinternal%3E.RolesFacade#error$)
- [isCreatingSiteRole$](../wiki/index.%3Cinternal%3E.RolesFacade#iscreatingsiterole$)
- [isDeletingSiteRole$](../wiki/index.%3Cinternal%3E.RolesFacade#isdeletingsiterole$)
- [isFetchingSiteRoles$](../wiki/index.%3Cinternal%3E.RolesFacade#isfetchingsiteroles$)
- [isFetchingTenantRoles$](../wiki/index.%3Cinternal%3E.RolesFacade#isfetchingtenantroles$)
- [isUpdatingSiteRole$](../wiki/index.%3Cinternal%3E.RolesFacade#isupdatingsiterole$)
- [siteMeta$](../wiki/index.%3Cinternal%3E.RolesFacade#sitemeta$)
- [siteRole$](../wiki/index.%3Cinternal%3E.RolesFacade#siterole$)
- [siteRoles$](../wiki/index.%3Cinternal%3E.RolesFacade#siteroles$)
- [tenantMeta$](../wiki/index.%3Cinternal%3E.RolesFacade#tenantmeta$)
- [tenantRoles$](../wiki/index.%3Cinternal%3E.RolesFacade#tenantroles$)

### Methods

- [clearSiteRole](../wiki/index.%3Cinternal%3E.RolesFacade#clearsiterole)
- [createSiteRole](../wiki/index.%3Cinternal%3E.RolesFacade#createsiterole)
- [deleteSiteRole](../wiki/index.%3Cinternal%3E.RolesFacade#deletesiterole)
- [getDefaultSiteRoles](../wiki/index.%3Cinternal%3E.RolesFacade#getdefaultsiteroles)
- [getSiteRole](../wiki/index.%3Cinternal%3E.RolesFacade#getsiterole)
- [getSiteRoles](../wiki/index.%3Cinternal%3E.RolesFacade#getsiteroles)
- [getTenantRoles](../wiki/index.%3Cinternal%3E.RolesFacade#gettenantroles)
- [updateSiteRole](../wiki/index.%3Cinternal%3E.RolesFacade#updatesiterole)

## Constructors

### constructor

• **new RolesFacade**(`store`, `service`, `query`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`RolesStore`](../wiki/index.%3Cinternal%3E.RolesStore) |
| `service` | [`RolesApiService`](../wiki/index.%3Cinternal%3E.RolesApiService) |
| `query` | [`RolesQuery`](../wiki/index.%3Cinternal%3E.RolesQuery) |

#### Defined in

public/lib/store/roles/roles.facade.ts:17

## Properties

### error$

• `Readonly` **error$**: `Observable`<`any`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:36

___

### isCreatingSiteRole$

• `Readonly` **isCreatingSiteRole$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:31

___

### isDeletingSiteRole$

• `Readonly` **isDeletingSiteRole$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:34

___

### isFetchingSiteRoles$

• `Readonly` **isFetchingSiteRoles$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:32

___

### isFetchingTenantRoles$

• `Readonly` **isFetchingTenantRoles$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:25

___

### isUpdatingSiteRole$

• `Readonly` **isUpdatingSiteRole$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:33

___

### siteMeta$

• `Readonly` **siteMeta$**: `Observable`<`undefined` \| `Page`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:30

___

### siteRole$

• `Readonly` **siteRole$**: `Observable`<`undefined` \| [`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)\>

#### Defined in

public/lib/store/roles/roles.facade.ts:29

___

### siteRoles$

• `Readonly` **siteRoles$**: `Observable`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)[]\>

#### Defined in

public/lib/store/roles/roles.facade.ts:28

___

### tenantMeta$

• `Readonly` **tenantMeta$**: `Observable`<`undefined` \| `Page`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:24

___

### tenantRoles$

• `Readonly` **tenantRoles$**: `Observable`<[`RoleResponse`](../wiki/index.%3Cinternal%3E.RoleResponse)[]\>

#### Defined in

public/lib/store/roles/roles.facade.ts:23

## Methods

### clearSiteRole

▸ **clearSiteRole**(): `void`

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.facade.ts:195

___

### createSiteRole

▸ **createSiteRole**(`payload`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`RolePayload`](../wiki/index.%3Cinternal%3E.RolePayload) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:111

___

### deleteSiteRole

▸ **deleteSiteRole**(`payload`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`RolePayload`](../wiki/index.%3Cinternal%3E.RolePayload) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:166

___

### getDefaultSiteRoles

▸ **getDefaultSiteRoles**(): `void`

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.facade.ts:79

___

### getSiteRole

▸ **getSiteRole**(`siteUuid`, `roleId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteUuid` | `string` |
| `roleId` | `string` |

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.facade.ts:98

___

### getSiteRoles

▸ **getSiteRoles**(`siteUuid`, `payload?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `siteUuid` | `string` | `undefined` |
| `payload` | `SearchParams` | `DEFAULT_ROLES_SEARCH_PARAMS` |

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.facade.ts:57

___

### getTenantRoles

▸ **getTenantRoles**(): `void`

#### Returns

`void`

#### Defined in

public/lib/store/roles/roles.facade.ts:38

___

### updateSiteRole

▸ **updateSiteRole**(`payload`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`RolePayload`](../wiki/index.%3Cinternal%3E.RolePayload) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

public/lib/store/roles/roles.facade.ts:138
