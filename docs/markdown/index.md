# Module: index

## Table of contents

### Interfaces

- [MySecurityRightsState](../wiki/index.MySecurityRightsState)
- [RolesRightsModuleAPI](../wiki/index.RolesRightsModuleAPI)
- [RolesState](../wiki/index.RolesState)
- [SecurityRightsMatrixState](../wiki/index.SecurityRightsMatrixState)
- [UsersState](../wiki/index.UsersState)

### Type aliases

- [MySecurityRightModel](../wiki/index#mysecurityrightmodel)
- [RoleModel](../wiki/index#rolemodel)
- [RolesMetaModel](../wiki/index#rolesmetamodel)
- [SecurityRightMatrixModel](../wiki/index#securityrightmatrixmodel)
- [SecurityRightsSiteGuardFunction](../wiki/index#securityrightssiteguardfunction)
- [SecurityRightsTenantCanShownFunction](../wiki/index#securityrightstenantcanshownfunction)
- [SecurityRightsTenantGuardFunction](../wiki/index#securityrightstenantguardfunction)
- [UserModel](../wiki/index#usermodel)
- [UsersMetaModel](../wiki/index#usersmetamodel)

## Type aliases

### MySecurityRightModel

Ƭ **MySecurityRightModel**: `SecurityRightResponse`

#### Defined in

public/lib/store/mySecurityRights/mySecurityRights.model.ts:3

___

### RoleModel

Ƭ **RoleModel**: `RoleResponse`

#### Defined in

public/lib/store/roles/roles.model.ts:10

___

### RolesMetaModel

Ƭ **RolesMetaModel**: `Page`

#### Defined in

public/lib/store/roles/roles.model.ts:11

___

### SecurityRightMatrixModel

Ƭ **SecurityRightMatrixModel**: `SecurityRightMatrixResponse`

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.model.ts:8

___

### SecurityRightsSiteGuardFunction

Ƭ **SecurityRightsSiteGuardFunction**: (`urlSiteParam`: `string`, `requiredSecurityRights`: `string`[], `oneSecurityRight?`: `boolean`) => `GuardFunction`

#### Type declaration

▸ (`urlSiteParam`, `requiredSecurityRights`, `oneSecurityRight?`): `GuardFunction`

##### Parameters

| Name | Type |
| :------ | :------ |
| `urlSiteParam` | `string` |
| `requiredSecurityRights` | `string`[] |
| `oneSecurityRight?` | `boolean` |

##### Returns

`GuardFunction`

#### Defined in

public/lib/guards/securityRightsSite/securityRightsSite.guard.types.ts:3

___

### SecurityRightsTenantCanShownFunction

Ƭ **SecurityRightsTenantCanShownFunction**: (`requiredSecurityRights`: `string`[], `oneSecurityRight?`: `boolean`) => `CanShownFunction`

#### Type declaration

▸ (`requiredSecurityRights`, `oneSecurityRight?`): `CanShownFunction`

##### Parameters

| Name | Type |
| :------ | :------ |
| `requiredSecurityRights` | `string`[] |
| `oneSecurityRight?` | `boolean` |

##### Returns

`CanShownFunction`

#### Defined in

public/lib/canShowns/securityRightsTenant/securityRightsTenant.canShown.types.ts:3

___

### SecurityRightsTenantGuardFunction

Ƭ **SecurityRightsTenantGuardFunction**: (`requiredSecurityRights`: `string`[], `oneSecurityRight?`: `boolean`) => `GuardFunction`

#### Type declaration

▸ (`requiredSecurityRights`, `oneSecurityRight?`): `GuardFunction`

##### Parameters

| Name | Type |
| :------ | :------ |
| `requiredSecurityRights` | `string`[] |
| `oneSecurityRight?` | `boolean` |

##### Returns

`GuardFunction`

#### Defined in

public/lib/guards/securityRightsTenant/securityRightsTenant.guard.types.ts:3

___

### UserModel

Ƭ **UserModel**: `UserResponse`

#### Defined in

public/lib/store/users/users.model.ts:6

___

### UsersMetaModel

Ƭ **UsersMetaModel**: `Page`

#### Defined in

public/lib/store/users/users.model.ts:11
