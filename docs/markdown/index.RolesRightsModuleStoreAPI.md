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
| `query` | `MySecurityRightsQuery` |
| `service` | `Pick`<`MySecurityRightsFacade`, ``"getMyTenantSecurityRights"`` \| ``"getMySiteSecurityRights"`` \| ``"getMySecurityRights"``\> |

#### Defined in

public/lib/api/api.types.ts:50

___

### roles

• **roles**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `query` | `RolesQuery` |
| `service` | `Pick`<`RolesFacade`, ``"getSiteRoles"`` \| ``"getTenantRoles"`` \| ``"getDefaultSiteRoles"``\> |

#### Defined in

public/lib/api/api.types.ts:42

___

### securityRights

• **securityRights**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `query` | `SecurityRightsMatrixQuery` |
| `service` | `Pick`<`SecurityRightsMatrixFacade`, ``"getSecurityRightsBySite"``\> |

#### Defined in

public/lib/api/api.types.ts:46

___

### users

• **users**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `query` | `UsersQuery` |
| `service` | `Pick`<`UsersFacade`, ``"getUsersBySite"`` \| ``"getUsers"`` \| ``"getUser"`` \| ``"getUserRolesForSite"``\> |

#### Defined in

public/lib/api/api.types.ts:35
