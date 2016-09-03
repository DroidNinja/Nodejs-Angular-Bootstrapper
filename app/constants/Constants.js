/**
 * Created by droidNinja on 19/06/16.
 */

module.exports = Object.freeze({
    PROVIDER: {
        EMAIL: 'EMAIL',
        FACEBOOK: 'FACEBOOK',
        GOOGLE: 'GOOGLE'
    },
    REQUEST_TYPE:{
      GET: 'GET',
        POST: 'POST'
    },
    ERROR_TYPE: {
        INVALID_PARAMETERS: {
            message: 'Invalid parameters!',
            code: 799
        },
        UNABLE_TO_ADD_USER: {
            message: 'Unable to add user.',
            code: 798
        },
        INVALID_TOKEN: {
            message: "Token is invalid!",
            code: 797
        },
        INVALID_REQUEST:{
            message: "Invalid request",
            code:796
        },
        EXPIRED_TOKEN: {
            message: "Token is expired!",
            code: 795
        },
        UNREGISTERED_USER:{
            message: "User do not exists.",
            code: 794
        },
        INVALID_LOGIN: {
            message: "Invalid Login",
            code: 793
        },
        INVALID_USER:{
            message: "Invalid user",
            code:792
        },
        USER_ALREADY_EXISTS:{
            message: "User already exists!",
            code:791
        },
        UPDATE_USER_TYPE_FAILURE: {
            message: "Unable to update user type.",
            code: 790
        },
        UPDATE_PROFILE_FAILURE: {
            message: "Unable to update profile.",
            code: 789
        },
        UNABLE_TO_FETCH_USER: {
            message: "Unable to fetch user.",
            code: 788
        },
        PHONE_NO_ALREADY_EXISTS: {
            message: "Phone no. already exists!",
            code: 786
        },
        INVALID_OTP:{
            message: "Invalid OTP!",
            code: 785
        },
        INVALID_FILE_TYPE:{
            message: "Invalid File type!",
            code: 784
        },
        UPDATE_PICTURE_FAILURE: {
            message: "Unable to update profile pic.",
            code: 783
        },
        CREATE_CLASS_FAILURE: {
            message: "Unable to create class.",
            code: 782
        },
        FETCH_CLASS_FAILURE: {
            message: "Couldn't able to fetch classes.",
            code: 781
        },
        JOIN_CLASS_FAILURE: {
            message: "Couldn't able to join class.",
            code: 780
        },
        GET_MEMBERS_FAILURE:{
            message: "Couldn't able to fetch memebers.",
            code: 779
        },
        CLASS_NOT_EXISTS:{
            message: "Class do not exists!",
            code: 778
        },
        UPLOAD_FAILED:{
            message: "Upload failed!",
            code: 778
        },
        GET_META_ERROR:{
            message: "Unable to get meta info!",
            code: 779
        },
        POST_CREATION_FAILED:{
            message: "Post creation failed!",
            code: 780
        },
        INVALID_MEDIA:{
            message: "Invalid media!",
            code: 778
        },
        UNAUTHORIZED_USER:{
            message: "Unauthorized user!",
            code: 999
        },
        UNKNOWN_ERROR:{
            message: "Unknown error!",
            code: 1001
        }
    },
    MESSAGES:{

        SUCCESSFUL_REGISTER: "User Registered successfully",
        VALID_TOKEN: "This is Valid token",
        EXPIRED_TOKEN_SUCCESS: "Token expired successfully",
        LOGOUT_SUCCESS: 'User logout successfully!',
        LOGIN_SUCCESS: "User login successfully",
        USER_TYPE_SUCCESS: 'UserType set successfully',
        USER_TYPE_ALREADY_SET: "User Type already set.",
        USER_PROFILE_SUCCESS: "User profile updated Successfully",
        USER_PROFILE_PIC_SUCCESS: "User profile pic updated Successfully",
        OTP_SUCCESS: "OTP SuccessFully Sent",
        OTP_VERIFICATION_SUCCESS: "OTP is valid!",
        CLASS_CREATE_SUCCESS: "Class created successfully",
        CLASS_LISTED_SUCESS: "Class listed successfully",
        JOIN_CLASS_SUCCESS: "Class joined successfully",
        MEMBER_LIST_SUCCESS: "Members listed successfully",
        MEDIA_UPLOADED_SUCCESS: "Media uploaded successfully",
        POST_UPLOADED_SUCCESS: "Post created successfully"
    },
    ACCESS_TOKEN_HEADER: 'x-access-token',
    FACEBOOK_ACCESS_TOKEN_URL: 'https://graph.facebook.com/me?access_token=',
    GOOGLE_ACCESS_TOKEN_URL: 'https://www.googleapis.com/oauth2/v1/tokeninfo?id_token='
});