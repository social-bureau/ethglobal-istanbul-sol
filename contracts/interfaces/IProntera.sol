// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IProntera: key keeper for chatting
 * @author Roongroj
 * @notice version 1.0
 */
interface IProntera {

    struct UserInitialization {
        bytes userSecret;
        bool publicKeyPrefix;
        bytes32 publicKeyX;
    }

    function isUserInitialized(address user) external view returns (bool);

    function isChatInitialized(address initializer, address peer) external view returns (bool);

    function initializeUser(
        bytes calldata secret,
        bool publicKeyPrefix,
        bytes32 publicKeyX
    ) external;

    function initializeChat(
        bytes calldata callerSecret,
        bytes calldata peerSecret,
        address peer
    ) external;

    function getUserInitialization(address user) external view returns (UserInitialization memory);

    function getChatInitialization(address user, address reciever) external view returns (bytes memory);
}
