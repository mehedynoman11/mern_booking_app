import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://th.bing.com/th/id/R.9cb60b931d6ed2a84d56513a754a8a2e?rik=QB%2fdgtVEsy2Bww&riu=http%3a%2f%2fwww.southbridgecounseling.com%2fwp-content%2fuploads%2f2014%2f08%2fimage7.jpg&ehk=3uF7ldK9b4LtCN3HPMTpYBZCtM%2bX%2fSxCl3ykbq%2byZCI%3d&risl=&pid=ImgRaw&r=0"
    }
}, {timestamps: true});

const User  = mongoose.model("User", userSchema);

export default User;