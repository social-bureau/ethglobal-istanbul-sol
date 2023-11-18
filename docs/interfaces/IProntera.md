# Contract IProntera

*Roongroj*

> IProntera: key keeper for chatting

version 1.0



<br />

---

<br />

[**Functions**](#functions)

[**Events**](#events)

[**Errors**](#errors)

<br />

---

<br />

## Functions

1. [getChatInitialization(address,address)](#function-getchatinitializationaddressaddress) <br />
1. [getUserInitialization(address)](#function-getuserinitializationaddress) <br />
1. [getVersion()](#function-getversion) <br />
1. [initializeChat(bytes,bytes,address)](#function-initializechatbytesbytesaddress) <br />
1. [initializeUser(bytes,bool,bytes32)](#function-initializeuserbytesboolbytes32) <br />
1. [isChatInitialized(address,address)](#function-ischatinitializedaddressaddress) <br />
1. [isUserInitialized(address)](#function-isuserinitializedaddress) <br />

<br />

---

<br />

### Function getChatInitialization(address,address)

```solidity
function getChatInitialization(address firstUser, address secondUser) external view returns (bytes)
```

get chat initialized information, shared secret between two users, encrypted by the public key of initializer user



#### Parameters

| Name | Type | Description |
|---|---|---|
| firstUser | address | address to query |
| secondUser | address | address to query |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes | get a symmetric key map by firstUser =&gt; secondUser |

<br />

---

<br />

### Function getUserInitialization(address)

```solidity
function getUserInitialization(address user) external view returns (struct IProntera.UserInitialization)
```

get user initialized information



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | address to query |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | IProntera.UserInitialization | data as UserInitialization struct |

<br />

---

<br />

### Function getVersion()

```solidity
function getVersion() external view returns (string)
```

get contract version




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | string of version |

<br />

---

<br />

### Function initializeChat(bytes,bytes,address)

```solidity
function initializeChat(bytes callerEncryptedChatSecret, bytes peerEncryptedChatSecret, address peer) external nonpayable
```

initializes a chatting session between two users: msg.sender and a given peer. A symmetric key is encrypted with both public keys once and stored for each

*Both users must be initialized*

#### Parameters

| Name | Type | Description |
|---|---|---|
| callerEncryptedChatSecret | bytes | Symmetric key, encrypted by the msg.sender&#39;s public key |
| peerEncryptedChatSecret | bytes | Symmetric key, encrypted by the peer&#39;s public key |
| peer | address | address of the peer |

<br />

---

<br />

### Function initializeUser(bytes,bool,bytes32)

```solidity
function initializeUser(bytes encryptedUserSecret, bool publicKeyPrefix, bytes32 publicKeyX) external nonpayable
```

initialize user, some kind of registering process, which allows two things: - user will be able to generate their own key on later logins, by retrieving the encrypted key-gen input and decrypt with their MetaMask - other users will be able to encrypt messages using this users public key



#### Parameters

| Name | Type | Description |
|---|---|---|
| encryptedUserSecret | bytes | user secret to generate key-pair for the chatting application. it is encrypted by the MetaMask public key |
| publicKeyPrefix | bool | prefix of the compressed key stored as a boolean (0x02: true, 0x03: false) |
| publicKeyX | bytes32 | 32-byte X-coordinate of the compressed key |

<br />

---

<br />

### Function isChatInitialized(address,address)

```solidity
function isChatInitialized(address initializer, address peer) external view returns (bool)
```

check if initializer and user is already initialized or not



#### Parameters

| Name | Type | Description |
|---|---|---|
| initializer | address | address to query |
| peer | address | address to query |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | initialized as a boolean |

<br />

---

<br />

### Function isUserInitialized(address)

```solidity
function isUserInitialized(address user) external view returns (bool)
```

check if user is already initialized or not



#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | address to query |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | initialized as a boolean |





<br />

---

<br />

## Events

1. [ChatInitialized](#event-chatinitialized) <br />
1. [UserInitialized](#event-userinitialized) <br />

<br />

---

<br />

### Event ChatInitialized

```solidity
event ChatInitialized(address indexed initializer, address indexed peer, bytes callerEncryptedChatSecret, bytes peerEncryptedChatSecret)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| initializer `indexed` | address | undefined |
| peer `indexed` | address | undefined |
| callerEncryptedChatSecret  | bytes | undefined |
| peerEncryptedChatSecret  | bytes | undefined |

<br />

---

<br />

### Event UserInitialized

```solidity
event UserInitialized(address indexed user, IProntera.UserInitialization init)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | undefined |
| init  | IProntera.UserInitialization | undefined |




<br />

---

<br />

## Errors

1. [ChatIsNotInitialized](#error-chatisnotinitialized) <br />
1. [PeerIsNotInitialized](#error-peerisnotinitialized) <br />
1. [UserAlreadyInitialized](#error-useralreadyinitialized) <br />
1. [UserIsNotInitialized](#error-userisnotinitialized) <br />

<br />

---

<br />

### Error ChatIsNotInitialized 


```solidity
error ChatIsNotInitialized(address user, address peer)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |
| peer | address | undefined |

<br />

---

<br />

### Error PeerIsNotInitialized 


```solidity
error PeerIsNotInitialized(address peer)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| peer | address | undefined |

<br />

---

<br />

### Error UserAlreadyInitialized 


```solidity
error UserAlreadyInitialized(address user)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |

<br />

---

<br />

### Error UserIsNotInitialized 


```solidity
error UserIsNotInitialized(address user)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |


