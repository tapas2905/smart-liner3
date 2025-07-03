 const endpoints =  {
    auth: {
        sendOtp: "auth/send-otp",
        verifyOtp: "auth/verify-otp",
        googleLogin: "auth/google-login"
    },
    profile: {
        getProfileInfo: "user/profile",
        updateProfile: "user/update-profile"
    },
    product: {
        getProducts: "product/list"
    }
}
export default endpoints;