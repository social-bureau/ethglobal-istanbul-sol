// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IProntera: key keeper for chatting
 * @author Roongroj
 * @notice version 1.0
 */
interface IProntera {

    error UserAlreadyInitialized(address user);
    error UserIsNotInitialized(address user);
    error PeerIsNotInitialized(address peer);
    error ChatIsNotInitialized(address user, address peer);

    event UserInitialized(address indexed user, UserInitialization init);
    event ChatInitialized(address indexed initializer, address indexed peer, bytes callerEncryptedChatSecret, bytes peerEncryptedChatSecret);

    struct UserInitialization {
        bytes encryptedUserSecret;
        bool publicKeyPrefix;
        bytes32 publicKeyX;
    }

    /**
     * @notice check if user is already initialized or not
     * @param user address to query
     * @return initialized as a boolean
     */
    function isUserInitialized(address user) external view returns (bool);

    /**
     * @notice check if initializer and user is already initialized or not
     * @param initializer address to query
     * @param peer address to query
     * @return initialized as a boolean
     */
    function isChatInitialized(address initializer, address peer) external view returns (bool);

    /**
     * @notice initialize user, some kind of registering process, which allows two things:
     * - user will be able to generate their own key on later logins, by retrieving the encrypted key-gen input and decrypt with their MetaMask
     * - other users will be able to encrypt messages using this users public key
     * @param encryptedUserSecret user secret to generate key-pair for the chatting application. it is encrypted by the MetaMask public key
     * @param publicKeyPrefix prefix of the compressed key stored as a boolean (0x02: true, 0x03: false)
     * @param publicKeyX 32-byte X-coordinate of the compressed key
     */
    function initializeUser(
        bytes calldata encryptedUserSecret,
        bool publicKeyPrefix,
        bytes32 publicKeyX
    ) external;

    /**
     * @notice initializes a chatting session between two users: msg.sender and a given peer.
     * A symmetric key is encrypted with both public keys once and stored for each
     * @dev Both users must be initialized
     * @param callerEncryptedChatSecret Symmetric key, encrypted by the msg.sender's public key
     * @param peerEncryptedChatSecret Symmetric key, encrypted by the peer's public key
     * @param peer address of the peer
     */
    function initializeChat(
        bytes calldata callerEncryptedChatSecret,
        bytes calldata peerEncryptedChatSecret,
        address peer
    ) external;

    /**
     * @notice get user initialized information
     * @param user address to query
     * @return data as UserInitialization struct
     */
    function getUserInitialization(address user) external view returns (UserInitialization memory);

    /**
     * @notice get chat initialized information, shared secret between two users, encrypted by the public key of initializer user
     * @param firstUser address to query
     * @param secondUser address to query
     * @return get a symmetric key map by firstUser => secondUser
     */
    function getChatInitialization(address firstUser, address secondUser) external view returns (bytes memory);

    /**
     * @notice get contract version
     * @return string of version
     */
    function getVersion() external view returns (string memory);
}
