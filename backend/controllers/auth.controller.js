export const signup = async(req, res) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;
    } catch (error) {
        
    }
}
export const login = (req, res) => {
    console.log("loginUsers")
}
export const logout = (req, res) => {
    console.log("logoutUsers")
}