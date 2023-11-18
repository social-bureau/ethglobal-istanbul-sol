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

    function isUserInitialized(address user) external view returns (bool);

    function isChatInitialized(address initializer, address peer) external view returns (bool);

    function initializeUser(
        bytes calldata encryptedUserSecret,
        bool publicKeyPrefix,
        bytes32 publicKeyX
    ) external;

    function initializeChat(
        bytes calldata callerEncryptedChatSecret,
        bytes calldata peerEncryptedChatSecret,
        address peer
    ) external

    function getUserInitialization(address user) external view returns (UserInitialization memory);

    function getChatInitialization(address firstUser, address secondUser) external view returns (bytes memory);
}
