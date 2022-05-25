# Interface: RolesRightsModuleStoreAPI

[index](../wiki/index).RolesRightsModuleStoreAPI

## Table of contents

### Properties

- [mySecurityRights](../wiki/index.RolesRightsModuleStoreAPI#mysecurityrights)
- [roles](../wiki/index.RolesRightsModuleStoreAPI#roles)
- [securityRights](../wiki/index.RolesRightsModuleStoreAPI#securityrights)
- [users](../wiki/index.RolesRightsModuleStoreAPI#users)

## Properties

### mySecurityRights

• **mySecurityRights**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `query` | [`MySecurityRightsQuery`](../wiki/index.%3Cinternal%3E.MySecurityRightsQuery) |
| `service` | `Pick`<[`MySecurityRightsFacade`](../wiki/index.%3Cinternal%3E.MySecurityRightsFacade), ``"getMyTenantSecurityRights"`` \| ``"getMySiteSecurityRights"`` \| ``"getMySecurityRights"``\> |

#### Defined in

public/lib/api/api.types.ts:50

___

### roles

• **roles**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `query` | [`RolesQuery`](../wiki/index.%3Cinternal%3E.RolesQuery) |
| `service` | `Pick`<[`RolesFacade`](../wiki/index.%3Cinternal%3E.RolesFacade), ``"getSiteRoles"`` \| ``"getTenantRoles"`` \| ``"getDefaultSiteRoles"``\> |

#### Defined in

public/lib/api/api.types.ts:42

___

### securityRights

• **securityRights**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `query` | [`SecurityRightsMatrixQuery`](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixQuery) |
| `service` | `Pick`<[`SecurityRightsMatrixFacade`](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixFacade), ``"getSecurityRightsBySite"``\> |

#### Defined in

public/lib/api/api.types.ts:46

___

### users

• **users**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `query` | [`UsersQuery`](../wiki/index.%3Cinternal%3E.UsersQuery) |
| `service` | `Pick`<[`UsersFacade`](../wiki/index.%3Cinternal%3E.UsersFacade), ``"getUsersBySite"`` \| ``"getUsers"`` \| ``"getUser"`` \| ``"getUserRolesForSite"``\> |

#### Defined in

public/lib/api/api.types.ts:35
