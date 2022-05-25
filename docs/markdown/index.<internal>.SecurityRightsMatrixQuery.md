# Class: SecurityRightsMatrixQuery

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).SecurityRightsMatrixQuery

## Hierarchy

- `Query`<[`SecurityRightsMatrixState`](../wiki/index.SecurityRightsMatrixState)\>

  ↳ **`SecurityRightsMatrixQuery`**

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixQuery#constructor)

### Properties

- [data$](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixQuery#data$)
- [error$](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixQuery#error$)
- [isFetching$](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixQuery#isfetching$)
- [isUpdating$](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixQuery#isupdating$)
- [store](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixQuery#store)

## Constructors

### constructor

• **new SecurityRightsMatrixQuery**(`store`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`SecurityRightsMatrixStore`](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixStore) |

#### Overrides

Query&lt;SecurityRightsMatrixState\&gt;.constructor

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.query.ts:9

## Properties

### data$

• **data$**: `Observable`<[`SecurityRightMatrixResponse`](../wiki/index.%3Cinternal%3E.SecurityRightMatrixResponse)\>

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.query.ts:22

___

### error$

• **error$**: `Observable`<`any`\>

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.query.ts:25

___

### isFetching$

• **isFetching$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.query.ts:26

___

### isUpdating$

• **isUpdating$**: `Observable`<`LoadingState`\>

#### Defined in

public/lib/store/securityRightsMatrix/securityRightsMatrix.query.ts:29

___

### store

• `Protected` **store**: [`SecurityRightsMatrixStore`](../wiki/index.%3Cinternal%3E.SecurityRightsMatrixStore)

#### Inherited from

Query.store
