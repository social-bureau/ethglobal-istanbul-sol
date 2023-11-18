// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IProntera.sol";

/**
 * @title IProntera: key keeper for chatting
 * @author Roongroj
 * @notice version 1.0
 */
contract Prontera is IProntera {

    /// @notice Mapping of user to their initialization object
    mapping(address => UserInitialization) public userInitializations;

    /// @notice A shared secret between two users, encrypted by the public key of first user
    mapping(address => mapping(address => bytes)) public chatInitializations;

    constructor(){}

    /**
     * @notice check if user is already initialized or not
     * @param user address to query
     * @return initialized as a boolean
     */
    function isUserInitialized(address user) public view returns (bool){
        return !(userInitializations[user].encryptedUserSecret.length == 0 &&
            userInitializations[user].publicKeyX == bytes32(0));
    }

    /**
     * @notice check if initializer and user is already initialized or not
     * @param initializer address to query
     * @param peer address to query
     * @return initialized as a boolean
     */
    function isChatInitialized(address initializer, address peer) public view returns (bool){
        return !(chatInitializations[initializer][peer].length == 0 && chatInitializations[peer][initializer].length == 0);
    }

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
    ) external {
        if (isUserInitialized(msg.sender)) {
            revert UserAlreadyInitialized(msg.sender);
        }
        userInitializations[msg.sender] = UserInitialization(encryptedUserSecret, publicKeyPrefix, publicKeyX);
        emit UserInitialized(msg.sender, userInitializations[msg.sender]);
    }

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
    ) external {
        if (!isUserInitialized(msg.sender)) {
            revert UserIsNotInitialized(msg.sender);
        }
        if (!isUserInitialized(peer)) {
            revert PeerIsNotInitialized(peer);
        }
        chatInitializations[msg.sender][peer] = callerEncryptedChatSecret;
        chatInitializations[peer][msg.sender] = peerEncryptedChatSecret;
        emit ChatInitialized(msg.sender, peer, callerEncryptedChatSecret, peerEncryptedChatSecret);
    }

    /**
     * @notice get user initialized information
     * @param user address to query
     * @return data as UserInitialization struct
     */
    function getUserInitialization(address user) external view returns (UserInitialization memory){
        return userInitializations[user];
    }

    /**
     * @notice get chat initialized information, shared secret between two users, encrypted by the public key of initializer user
     * @param firstUser address to query
     * @param secondUser address to query
     * @return get a symmetric key map by firstUser => secondUser
     */
    function getChatInitialization(address firstUser, address secondUser) external view returns (bytes memory){
        return chatInitializations[firstUser][secondUser];
    }
}
